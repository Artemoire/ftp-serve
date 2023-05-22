import { DefaultReplies } from "../../replies/DefaultReplies";
import { MessageReply } from "../../replies/ServerReply";
import { ServerReplyCode } from "../../replies/ServerReplyCode";
import { CommandMnemonic } from "../CommandMnemonic";
import { registration } from "../commandRegistration";

registration.register(CommandMnemonic.LIST, async (session) => {
  // TODO: list <pathname>
  const res = await session.dtp.list();

  if (res) return session.reply(DefaultReplies.DirectorySent)
  return session.reply(DefaultReplies.CantOpenDataConnection);
});