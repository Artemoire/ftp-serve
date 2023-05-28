import { CommandHandler } from "./CommandHandler";
import { CommandMnemonic } from "./CommandMnemonic";

import { commandNotImplementedHandler } from "./handlers/commandNotImplementedHandler";
import { cwdHandler } from "./handlers/cwdHandler";
import { listHandler } from "./handlers/listHandler";
import { noOpHandler } from "./handlers/noopHandler";
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
  [CommandMnemonic.CWD]: cwdHandler,
  [CommandMnemonic.LIST]: listHandler,
  [CommandMnemonic.NOOP]: noOpHandler,
  [CommandMnemonic.PASV]: pasvHandler,
  [CommandMnemonic.PWD]: pwdHandler,
  [CommandMnemonic.SYST]: systHandler,
  [CommandMnemonic.TYPE]: typeHandler,
  [CommandMnemonic.USER]: userHandler,
}