import { FTPSession } from "../../FTPSession";
import { mapByConstructor } from "../../Func";
import { Success } from "../../Result";
import { InvalidPath, PathAlreadyExists } from "../../StorageResults";
import { DefaultReplies } from "../../replies/DefaultReplies";
import { MessageReply } from "../../replies/ServerReply";
import { ServerReplyCode } from "../../replies/ServerReplyCode";

export const mkdHandler = async (session: FTPSession, parameter: string | undefined) => {
  if (!parameter) return session.reply(DefaultReplies.SyntaxMissingParameter);

  // TODO: validate path
  const result = await session.dtp.mkdir(parameter);

  const reply = mapByConstructor(result,
    [Success, InvalidPath, PathAlreadyExists],
    [
      () => new MessageReply(ServerReplyCode.DirectoryOk, `"${[session.dtp.state.getWorkDir(), parameter].join("/")}" directory created`),
      () => new MessageReply(ServerReplyCode.FileError, "Invalid path"),
      () => new MessageReply(ServerReplyCode.FileError, "Path already exists"),
    ]
  ) || new MessageReply(ServerReplyCode.FileError, "Execution failed");

  return session.reply(reply);
}