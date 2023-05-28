import { FTPSession } from "../../FTPSession";
import { DefaultReplies } from "../../replies/DefaultReplies";

export const systHandler = async (session: FTPSession, parameter: string | undefined) => session.reply(DefaultReplies.SystemType)