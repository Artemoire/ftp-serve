import { FTPSession } from "../../FTPSession";
import { DefaultReplies } from "../../replies/DefaultReplies";

export const userHandler = async (session: FTPSession, parameter: string | undefined) => {
  if (session.user.hasSetName()) return session.reply(DefaultReplies.UsernameAlreadySet);
  if (!parameter) return session.reply(DefaultReplies.SyntaxMissingUsername);
  session.user.name = parameter;

  if (session.user.isAnonymous()) {
    // TODO: check anonymous allowed
    // TODO: login process
    return session.reply(DefaultReplies.Proceed);
  }

  return session.reply(DefaultReplies.RequirePassword);
};