import { DefaultReplies } from "../../replies/DefaultReplies";
import { CommandMnemonic } from "../CommandMnemonic";
import { registration } from "../commandRegistration";

registration.register(CommandMnemonic.TYPE, async (session, parameter) => {
  if (!parameter) return session.reply(DefaultReplies.SyntaxMissingParameter);

  const upperCaseType = parameter.toUpperCase();
  if (upperCaseType === 'A' || upperCaseType === 'A N') {
    session.dtp.binary = false;
    return session.reply(DefaultReplies.SwitchToAscii);
  }
  if (upperCaseType === 'I' || upperCaseType === 'L 8') {
    session.dtp.binary = true;
    return session.reply(DefaultReplies.SwitchToBinary);
  }

  return session.reply(DefaultReplies.SyntaxInvalidParameter);
});