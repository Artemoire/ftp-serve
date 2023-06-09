import { Socket } from "net";
import { CommandExecution } from "./command/CommandExecution";
import { CommandPipeline } from "./command/CommandPipeline";
import { DTP } from "./DTP";
import { DefaultReplies } from "./replies/DefaultReplies";
import { ServerReply } from "./replies/ServerReply";
import { User } from "./state/User";
import { StorageClient } from "./storage/StorageClient";
import { CommandParser } from "./transform/CommandParser";
import { LineBuffer } from "./transform/LineBuffer";
import { asyncSocketEnd } from "./sockUtils";

export class FTPSession {

  public ended = false;
  public readonly user: User = new User();
  public readonly dtp = new DTP(this.socket.localAddress, this.socket.remoteAddress);
  public readonly storageClient: StorageClient | undefined;

  constructor(
    private socket: Socket
  ) { }

  async reply(replyMessage: ServerReply): Promise<void> {
    return replyMessage.emit(this.socket);
  }

  async greet(): Promise<void> {
    return this.reply(DefaultReplies.Greeting);
  }

  async end() {
    this.ended = true;
    return asyncSocketEnd(this.socket);
  }

  listen(): void { // TODO: execution engine should take care of its configuration ?
    const lineBuffer = new LineBuffer();
    const commandParser = new CommandParser();
    const execution = new CommandExecution(this);
    const pipeline = new CommandPipeline(execution);


    this.socket.pipe(lineBuffer).pipe(commandParser);
    commandParser.on('data', (command) => pipeline.pipe(command));
  }
}