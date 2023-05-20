import { Socket, Server, createServer } from "net";
import { PortAllocator } from "./PortAllocator";
import { Timer } from "./Timer";

export interface Connector {
  connect(): Promise<Socket>
}

export class PassiveConnector implements Connector {

  private server: Server;
  private readonly closeServerOnIdle: Timer;

  constructor(
    private port: number,
    private host: string
  ) {
    console.log(`[DEBUG] Initializing passive mode on ${host}:${port}`);
    this.server = createServer();
    this.server.listen(port, host);
    this.closeServerOnIdle = new Timer(() => this.server.close(), 5000); // TODO: idle timeout config
    this.closeServerOnIdle.start();
  }

  connect() {
    this.closeServerOnIdle.cancel();
    return new Promise<Socket>((resolve, reject) => {
      const idleTimer = new Timer(() => this.server.close())
      this.server.once('connection', (socket) => {
        // socket.once('close', () => this.server.close()); // TODO: error handling
        resolve(socket);
      });
    });
  }
}

export class ActiveConnector implements Connector {

  connect(): Promise<Socket> {
    throw new Error("Method not implemented.");
  }

}