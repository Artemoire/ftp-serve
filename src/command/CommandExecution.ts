import { FTPSession } from "../FTPSession";
import { CommandInput } from "./CommandInput";
import { commandHandlerRegistry } from "./commandHandlerRegistry";

export class CommandExecution {

  constructor(
    private session: FTPSession
  ) { }

  async execute(input: CommandInput) {
    return commandHandlerRegistry[input[0]](this.session, input[1]);
  }

}