import { Socket } from "net";
import { asyncSocketWrite } from "../sockUtils";
import { ServerReplyCode } from "./ServerReplyCode";

export abstract class ServerReply {

  constructor(
    protected code: ServerReplyCode
  ) { }

  async emit(socket: Socket) {
    console.log('[DEBUG] <' + this.toString());
    // TODO: single responsibility - should depend on socket write ?
    return asyncSocketWrite(socket, this.toString());
  }

  abstract toString(): string;
}

export class MessageReply extends ServerReply {

  constructor(code: ServerReplyCode, protected message: string) {
    super(code);
  }

  toString(): string {
    return `${this.code} ${this.message}\r\n`;
  }

}