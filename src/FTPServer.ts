import { createServer, Socket } from "net";
import { FTPSession } from "./FTPSession";

export class FTPServer {
  public readonly server = createServer((socket) => this._connect(socket));

  constructor(
  ) { }

  private async _connect(socket: Socket) {
    const session = new FTPSession(socket);
    await session.greet();
    session.listen();
  }
}