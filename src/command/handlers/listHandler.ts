import { FTPSession } from "../../FTPSession";
import { DefaultReplies } from "../../replies/DefaultReplies";

export const listHandler = async (session: FTPSession, parameter: string | undefined) => {
  // TODO: list <pathname>
  const res = await session.dtp.list();

  if (res) return session.reply(DefaultReplies.DirectorySent)
  return session.reply(DefaultReplies.CantOpenDataConnection);
};