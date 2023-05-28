import { FTPSession } from "../../FTPSession";
import { MessageReply } from "../../replies/ServerReply";
import { ServerReplyCode } from "../../replies/ServerReplyCode";

export const pasvHandler = async (session: FTPSession, parameter: string | undefined) => {
  const connector = session.dtp.state.enterPassiveMode();
  const connectionOctets = [...connector.host.split("."), (connector.port >>> 8) & 0xFF, connector.port & 0xFF].join(",");
  return session.reply(new MessageReply(ServerReplyCode.PassiveModeOk, `Entering Passive Mode (${connectionOctets}).`));
};