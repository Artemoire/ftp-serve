import { CommandAction } from "./CommandAction";
import { CommandMnemonic } from "./CommandMnemonic";
import { CommandRegistry } from "./CommandRegistry";

class CommandRegistration {
  private registry: any = {};

  register(mnemonic: CommandMnemonic, action: CommandAction) {
    this.registry[mnemonic] = action;
  }

  build(): CommandRegistry {
    return this.registry as CommandRegistry;
  }
}

export const registration = new CommandRegistration();