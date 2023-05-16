import { DefaultReplies } from "../../replies/DefaultReplies";
import { CommandMnemonic } from "../CommandMnemonic";
import { registration } from "../commandRegistration";

registration.register(CommandMnemonic.SYST, async (session, parameter) => {
  return session.reply(DefaultReplies.SystemType);
});