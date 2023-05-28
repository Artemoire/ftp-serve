import { FTPSession } from "../../FTPSession";
import { DefaultReplies } from "../../replies/DefaultReplies";

export const quitHandler = async (session: FTPSession, parameter: string | undefined) => {
  await session.reply(DefaultReplies.UserQuit)
  return session.end();
}