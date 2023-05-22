import { DefaultReplies } from "../../replies/DefaultReplies";
import { MessageReply } from "../../replies/ServerReply";
import { ServerReplyCode } from "../../replies/ServerReplyCode";
import { CommandMnemonic } from "../CommandMnemonic";
import { registration } from "../commandRegistration";

registration.register(CommandMnemonic.PASV, async (session) => {
  const connector = session.dtp.state.enterPassiveMode();
  const connectionOctets = [...connector.host.split("."), (connector.port >>> 8) & 0xFF, connector.port & 0xFF].join(",");
  return session.reply(new MessageReply(ServerReplyCode.PassiveModeOk, `Entering Passive Mode (${connectionOctets}).`));
});