import { FTPSession } from "../../FTPSession";
import { DefaultReplies } from "../../replies/DefaultReplies";

export const cwdHandler = async (session: FTPSession, parameter: string | undefined) => {
  if (!parameter) return session.reply(DefaultReplies.SyntaxMissingParameter); // TODO: missing path ?
  const result = await session.dtp.cwd(parameter);

  // TODO: better result model
  if (result === true) return session.reply(DefaultReplies.DirectoryChanged)
  else return session.reply(DefaultReplies.DirectoryUnchanged);
}