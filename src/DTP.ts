import { ActiveConnector, Connector } from "./Connectors";
import { DTPState } from "./DTPState";
import { PortAllocator } from "./PortAllocator";
import { asyncSocketEnd, asyncSocketWrite } from "./sockUtils";
import { MockStorageClient } from "./storage/MockStorageClient";
import { StorageClient } from "./storage/StorageClient";
import { serializeFileList } from "./storage/serializeFileList";

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
    // const info = await this.storage.info(path);
    // if (info === FileNotFound) return FileNotFound;
    // if (info.isDirectory) return InvalidPath;
    // this.state.setWorkDir(path);
    // return Success;
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