import { FTPSession } from "../../FTPSession";
import { DefaultReplies } from "../../replies/DefaultReplies";

export const commandNotImplementedHandler = async (session: FTPSession, parameter: string | undefined) => session.reply(DefaultReplies.CommandNotImplemented);