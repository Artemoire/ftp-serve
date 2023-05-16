import { DefaultReplies } from "../../replies/DefaultReplies";
import { CommandMnemonic } from "../CommandMnemonic";
import { registration } from "../commandRegistration";

registration.register(CommandMnemonic.NONIMPLEMENTED, async (session, parameter) => session.reply(DefaultReplies.CommandNotImplemented));