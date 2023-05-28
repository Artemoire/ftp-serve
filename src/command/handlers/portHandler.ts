import { FTPSession } from "../../FTPSession";
import { DefaultReplies } from "../../replies/DefaultReplies";
import { MessageReply } from "../../replies/ServerReply";
import { ServerReplyCode } from "../../replies/ServerReplyCode";

export const portHandler = async (session: FTPSession, parameter: string | undefined) => {
  if (!parameter) return session.reply(DefaultReplies.SyntaxMissingParameter);
  const octets = parameter.split(",");

  // TODO: IpV6 support, NetworkEndpoint abstraction for validation
  if (octets.length !== 6) return session.reply(DefaultReplies.SyntaxInvalidParameter);
  if (octets.find(x => x !== '0' && !Number(x)) !== undefined) return session.reply(DefaultReplies.SyntaxInvalidParameter);

  session.dtp.state.enterActiveMode(octets.slice(0, 4).join("."), Number(octets[4]) << 8 | Number(octets[5]));
  return session.reply(DefaultReplies.Okay);
};