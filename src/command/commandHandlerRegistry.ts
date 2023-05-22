import { CommandHandler } from "./CommandHandler";
import { CommandMnemonic } from "./CommandMnemonic";

import { commandNotImplementedHandler } from "./handlers/commandNotImplementedHandler";
import { listHandler } from "./handlers/listHandler";
import { pasvHandler } from "./handlers/pasvHandler";
import { pwdHandler } from "./handlers/pwdHandler";
import { systHandler } from "./handlers/systHandler";
import { typeHandler } from "./handlers/typeHandler";
import { userHandler } from "./handlers/userHandler";

export type CommandHandlerRegistry = {
  [key: string]: CommandHandler;
};

export const commandHandlerRegistry: CommandHandlerRegistry = {
  [CommandMnemonic.NONIMPLEMENTED]: commandNotImplementedHandler,
  [CommandMnemonic.LIST]: listHandler,
  [CommandMnemonic.PASV]: pasvHandler,
  [CommandMnemonic.PWD]: pwdHandler,
  [CommandMnemonic.SYST]: systHandler,
  [CommandMnemonic.TYPE]: typeHandler,
  [CommandMnemonic.USER]: userHandler,
}