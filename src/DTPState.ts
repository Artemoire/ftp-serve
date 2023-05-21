import { Socket } from "net";
import { ActiveConnector, Connector, PassiveConnector } from "./Connectors";

export class DTPState {

  private binaryFlag: boolean;
  private readonly hostAddress: string;
  private connector: Connector;
  private workingDirectory: string;

  constructor(
    hostAddress: string,
    clientAddress: string,
  ) {
    this.hostAddress = hostAddress;
    this.connector = new ActiveConnector(clientAddress);
    this.binaryFlag = false;
    this.workingDirectory = "/";
  }

  getWorkDir() {
    return this.workingDirectory;
  }

  setWorkDir(path: string) {
    this.workingDirectory = path;
  }

  isBinaryFlagOn() {
    return this.binaryFlag;
  }

  setBinaryFlag(flagValue: boolean) {
    this.binaryFlag = flagValue;
  }

  enterPassiveMode() {
    this.connector = new PassiveConnector(this.hostAddress);
    return this.connector; // TODO: return this.connector.socketAddress ?
  }

  enterActiveMode(host: string, port: number) {
    this.connector = new ActiveConnector(host, port);
    return this.connector;
  }

  connect(): Promise<Socket | undefined> {
    return this.connector.connect();
  }

}