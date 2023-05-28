import { Socket, Server, createServer, createConnection } from "net";
import { PortAllocator } from "./PortAllocator";
import { Timer } from "./Timer";

export interface Connector {
  readonly host: string;
  readonly port: number;
  connect(): Promise<Socket | undefined>
}

export class PassiveConnector implements Connector {

  private server: Server;
  private dataConnectionPromise: Promise<Socket>;
  private readonly portAllocator: PortAllocator = PortAllocator.range(49152, 65534); // TODO: allocator should be per network interface
  public readonly host: string;
  public readonly port: number;

  constructor(
    host: string
  ) {
    this.host = host;
    this.port = this.portAllocator.allocate();

    this.server = createServer();
    this.server.listen(this.port, this.host);
    this.dataConnectionPromise = new Promise((resolve, reject) => {
      this.server.once('connection', (socket) => {
        console.log(`[DEBUG] Passive mode connection from ${socket.remoteAddress}:${socket.remotePort}`);
        resolve(socket);
      });
      setTimeout(reject, 5000); // TODO: timeout config
    });

    console.log(`[DEBUG] Server listening for a data connection on ${this.host}:${this.port}`);
  }

  async connect(): Promise<Socket | undefined> {
    // TODO: errors - Timeout, AddressInUse (in constructor ?)
    // TODO: how handle client terminating the connection ?
    try {
      const sock = await this.dataConnectionPromise;
      sock.once('end', () => this.cleanup());
      return sock;
    } catch (error) {
      console.log('[ERROR] connection timeout');
      this.cleanup();
      // TODO: how does a server respond to a timeout ? (compliance testing case)
    }
  }

  private cleanup() {
    this.portAllocator.free(this.port);
    this.server.close();
  }
}

export class ActiveConnector implements Connector {

  constructor(
    public readonly host: string,
    public readonly port: number = 20,
  ) { }

  private _connectOrTimeout(): Promise<Socket> {
    return new Promise((resolve, reject) => {
      const socket: Socket = createConnection(this.port, this.host, () => resolve(socket));
      setTimeout(reject, 5000); // TODO: config timeout
    })
  }

  async connect(): Promise<Socket | undefined> {
    try {
      return await this._connectOrTimeout();
    } catch (error) {

    }
  }

}