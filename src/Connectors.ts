import { Socket, Server, createServer } from "net";
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
      this.server.once('connection', resolve);
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

  async connect(): Promise<Socket | undefined> {
    return undefined;
    // throw new Error("Method not implemented.");
  }

}