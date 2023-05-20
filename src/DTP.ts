import { ActiveConnector, Connector } from "./Connectors";
import { PortAllocator } from "./PortAllocator";

const isLocalHost = (addr: string) => addr === "::1";
const formatLocalHost = (addr: string) => isLocalHost(addr) ? '127.0.0.1' : addr;
const isIpV4Prefixed = (addr: string) => addr.startsWith("::ffff:");
const removeIpV4Prefix = (addr: string) => isIpV4Prefixed(addr) ? addr.substring("::ffff:".length) : addr;

export class DTP {

  public binary = false;
  public readonly defaultRemoteAddress: string; // TODO: is equal to value of ControlConnection.remoteAddress, but does not express dependency
  public readonly localAddress: string;
  private bindAddress: string;
  private bindPort: number;
  private mode: 'passive' | 'active' = 'active';
  private passiveModePortAllocator: PortAllocator = PortAllocator.range(49152, 65534);
  private connector: Connector = new ActiveConnector();

  constructor(
    localAddress: string,
    remoteAddress: string | undefined,
  ) {
    if (!remoteAddress) throw new Error("undefined remote address");
    this.localAddress = removeIpV4Prefix(formatLocalHost(localAddress));
    this.defaultRemoteAddress = removeIpV4Prefix(formatLocalHost(localAddress));
    this.bindAddress = this.defaultRemoteAddress;
    this.bindPort = 21;
  }

  setPassiveMode() {
    this.mode = 'passive';
    this.bindAddress = this.localAddress;
    this.bindPort = this.passiveModePortAllocator.allocate();
  }

  setActiveMode() {
    throw new Error("Method not implemented.");
  }

}