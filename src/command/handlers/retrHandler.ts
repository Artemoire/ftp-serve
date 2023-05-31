import { FTPSession } from "../../FTPSession";
import { mapByConstructor } from "../../Func";
import { ConnectionFailed } from "../../NetworkResults";
import { Success } from "../../Result";
import { InvalidPath } from "../../StorageResults";
import { DefaultReplies } from "../../replies/DefaultReplies";
import { MessageReply } from "../../replies/ServerReply";
import { ServerReplyCode } from "../../replies/ServerReplyCode";

export const retrHandler = async (session: FTPSession, parameter: string | undefined) => {
  if (!parameter) return session.reply(DefaultReplies.SyntaxMissingParameter);
  await session.reply(new MessageReply(ServerReplyCode.FileMark, "Transfer starting..."));

  const result = await session.dtp.read(parameter);

  const reply = mapByConstructor(result,
    [Success, ConnectionFailed, InvalidPath],
    [
      () => new MessageReply(ServerReplyCode.ClosingDataConnection, "Transfer complete."),
      () => new MessageReply(ServerReplyCode.DataConnectionFail, "Couldn't establish connection"),
      () => new MessageReply(ServerReplyCode.FileError, "File does not exist")
    ]
  );

  if (!reply) throw new Error("Implementation error (retrHandler)")

  return session.reply(reply);

};