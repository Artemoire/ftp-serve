import { FTPSession } from "../../FTPSession";
import { DefaultReplies } from "../../replies/DefaultReplies";
import { MessageReply } from "../../replies/ServerReply";
import { ServerReplyCode } from "../../replies/ServerReplyCode";

export const mkdHandler = async (session: FTPSession, parameter: string | undefined) => {
  if (!parameter) return session.reply(DefaultReplies.SyntaxMissingParameter);
  // TODO: validate path
  const res = await session.dtp.mkdir(parameter);
  if (res) return session.reply(new MessageReply(ServerReplyCode.DirectoryOk,
    `"${[session.dtp.state.getWorkDir(), parameter].join("/")}" directory created`))

  return session.reply(new MessageReply(ServerReplyCode.FileUnavailable, "Invalid path"));
}