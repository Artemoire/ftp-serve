import { FTPSession } from "../../FTPSession";
import { DefaultReplies } from "../../replies/DefaultReplies";

export const noOpHandler = async (session: FTPSession, parameter: string | undefined) => session.reply(DefaultReplies.NoOpReply)