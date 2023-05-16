import "./actions";
import { FTPSession } from "../FTPSession";
import { CommandInput } from "./CommandInput";
import { registration } from "./commandRegistration";
import { CommandRegistry } from "./CommandRegistry";

const registry = registration.build() as CommandRegistry;

export class CommandExecution {

  constructor(
    private session: FTPSession
  ) { }

  async execute(input: CommandInput) {
    return registry[input[0]](this.session, input[1]);
  }

}