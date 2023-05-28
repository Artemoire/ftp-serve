import { FTPSession } from "../../FTPSession";
import { DefaultReplies } from "../../replies/DefaultReplies";

export const typeHandler = async (session: FTPSession, parameter: string | undefined) => {
  if (!parameter) return session.reply(DefaultReplies.SyntaxMissingParameter);

  const upperCaseType = parameter.toUpperCase();
  if (upperCaseType === 'A' || upperCaseType === 'A N') {
    session.dtp.state.setBinaryFlag(false);
    return session.reply(DefaultReplies.SwitchToAscii);
  }
  if (upperCaseType === 'I' || upperCaseType === 'L 8') {
    session.dtp.state.setBinaryFlag(true);
    return session.reply(DefaultReplies.SwitchToBinary);
  }

  return session.reply(DefaultReplies.SyntaxInvalidParameter);
};