import { FTPSession } from "../../FTPSession";
import { MessageReply } from "../../replies/ServerReply";
import { ServerReplyCode } from "../../replies/ServerReplyCode";

export const pwdHandler = async (session: FTPSession, parameter: string | undefined) => {
  return session.reply(new MessageReply(ServerReplyCode.DirectoryOk, `"${session.dtp.state.getWorkDir()}" is the current directory`));
};