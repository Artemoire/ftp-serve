import { posix } from "node:path";
import { ActiveConnector, Connector } from "./Connectors";
import { DTPState } from "./DTPState";
import { PortAllocator } from "./PortAllocator";
import { Success } from "./Result";
import { InvalidPath, PathAlreadyExists } from "./StorageResults";
import { asyncSocketEnd, asyncSocketWrite, awaitEnd } from "./sockUtils";
import { MockStorageClient } from "./storage/MockStorageClient";
import { StorageClient } from "./storage/StorageClient";
import { serializeFileList } from "./storage/serializeFileList";
import { ConnectionFailed } from "./NetworkResults";
import { Readable } from "node:stream";

// TODO: try-catch storage client operations
export class DTP {

  public readonly state: DTPState;
  public readonly storage: StorageClient;

  constructor(
    localAddress: string,
    remoteAddress: string | undefined,
  ) {
    if (!remoteAddress) throw new Error("undefined remote address"); // this is because net.Socket.remoteAddress is not always defined. TODO: consider where to handle this decision
    this.state = new DTPState(localAddress, remoteAddress);
    this.storage = new MockStorageClient();
  }

  // async init() {
  //   this.storage = await storageProvider();
  // }

  async cwd(path: string) {
    const info = await this.storage.info(path);

    if (!info) return false;
    if (!info.isDirectory) return false;
    // if (info === FileNotFound) return FileNotFound;
    // if (info.isDirectory) return InvalidPath;

    this.state.setWorkDir(path);
    return true;
    // this.state.setWorkDir(path);
    // return Success;
  }

  async read(path: string): Promise<Success | ConnectionFailed | InvalidPath> {
    const sock = await this.state.connect();
    if (!sock) return ConnectionFailed.Result;

    const readResult = await this.storage.read(posix.join(this.state.getWorkDir(), path));
    if (readResult.constructor === InvalidPath) {
      await asyncSocketEnd(sock);
      return readResult;
    }

    // TODO: handle read errors, progress saving ?
    (readResult as Readable).pipe(sock);
    await awaitEnd(sock);

    return Success.Result;
  }

  async mkdir(path: string): Promise<Success | InvalidPath | PathAlreadyExists> { // TODO: try-catch -> Failure
    return this.storage.mkdir(this.state.getWorkDir() + "/" + path);
  }

  async list(): Promise<boolean> {
    const sock = await this.state.connect();
    if (!sock) return false; // return ConnectionFailed
    const files = await this.storage.list(this.state.getWorkDir());
    const list = serializeFileList(files);
    await asyncSocketWrite(sock, list);
    await asyncSocketEnd(sock);
    return true;
  }
}