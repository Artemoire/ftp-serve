import { ActiveConnector, Connector } from "./Connectors";
import { DTPState } from "./DTPState";
import { PortAllocator } from "./PortAllocator";

export class DTP {

  public readonly state: DTPState;

  constructor(
    localAddress: string,
    remoteAddress: string | undefined,
  ) {
    if (!remoteAddress) throw new Error("undefined remote address"); // this is because net.Socket.remoteAddress is not always defined. TODO: consider where to handle this decision
    this.state = new DTPState(localAddress, remoteAddress);
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
    // const files = await this.storage.list();
    // const list = this.listResultFormatter.format(files);
    // sock.write(list)
    // sock(end)
    return true;
  }
}