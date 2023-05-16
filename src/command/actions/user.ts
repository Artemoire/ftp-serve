import { DefaultReplies } from "../../replies/DefaultReplies";
import { CommandMnemonic } from "../CommandMnemonic";
import { registration } from "../commandRegistration";

registration.register(CommandMnemonic.USER, async (session, parameter) => {
  if (session.user.hasSetName()) return session.reply(DefaultReplies.UsernameAlreadySet);
  if (!parameter) return session.reply(DefaultReplies.SyntaxMissingUsername);
  session.user.name = parameter;

  if (session.user.isAnonymous()) {
    // TODO: check anonymous allowed
    // TODO: login process
    return session.reply(DefaultReplies.Proceed);
  }

  return session.reply(DefaultReplies.RequirePassword);

});