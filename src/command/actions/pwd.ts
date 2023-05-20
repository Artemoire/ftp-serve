import { DefaultReplies } from "../../replies/DefaultReplies";
import { MessageReply } from "../../replies/ServerReply";
import { CommandMnemonic } from "../CommandMnemonic";
import { registration } from "../commandRegistration";
import { ServerReplyCode } from "../../replies/ServerReplyCode";

registration.register(CommandMnemonic.PWD, async (session, parameter) => {
  return session.reply(new MessageReply(ServerReplyCode.DirectoryOk, session.workDir.toString()));
});