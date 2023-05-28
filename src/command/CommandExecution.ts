import { FTPSession } from "../FTPSession";
import { CommandInput } from "./CommandInput";
import { commandHandlerRegistry } from "./commandHandlerRegistry";

export class CommandExecution {

  constructor(
    private session: FTPSession
  ) { }

  async execute(input: CommandInput) {
    if (this.session.ended) return console.log("[WARNING] Session ended, flushing command:", input[0]); // TODO: log session id
    return commandHandlerRegistry[input[0]](this.session, input[1]);
  }

}