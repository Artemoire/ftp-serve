import { MessageReply } from "./ServerReply";
import { ServerReplyCode } from "./ServerReplyCode";

export class DefaultReplies {
  static Greeting = new MessageReply(ServerReplyCode.Greeting, "Service ready for new user.");
  static Okay = new MessageReply(ServerReplyCode.Success, "Okay.");
  static CommandNotImplemented = new MessageReply(ServerReplyCode.NonImplemented, "Command not implemented.");
  static SyntaxMissingParameter = new MessageReply(ServerReplyCode.SyntaxError, "Must provide parameter");
  static SyntaxInvalidParameter = new MessageReply(ServerReplyCode.SyntaxError, "Invalid parameter"); // TODO: value ?
  // cwd
  static DirectoryChanged = new MessageReply(ServerReplyCode.FileOk, "Directory successfully changed.");
  static DirectoryUnchanged = new MessageReply(ServerReplyCode.FileError, "Directory unchanged.");
  // list
  static DirectorySent = new MessageReply(ServerReplyCode.ClosingDataConnection, "Directory send OK.");
  static CantOpenDataConnection = new MessageReply(ServerReplyCode.DataConnectionFail, "Can't open data connection.");
  // noop
  static NoOpReply = new MessageReply(ServerReplyCode.Success, "Doing nothing...");
  // quit
  static UserQuit = new MessageReply(ServerReplyCode.ClosingControlConnection, "Service closing control connection.");
  // syst
  static SystemType = new MessageReply(ServerReplyCode.SystemType, "UNIX Type: L8")
  // type
  static SwitchToBinary = new MessageReply(ServerReplyCode.Success, "Switching to Binary mode.")
  static SwitchToAscii = new MessageReply(ServerReplyCode.Success, "Switching to ASCII mode.")
  // user
  static Proceed = new MessageReply(ServerReplyCode.Proceed, "User logged in, proceed");
  static UsernameAlreadySet = new MessageReply(ServerReplyCode.AccountError, "Username is already set");
  static RequirePassword = new MessageReply(ServerReplyCode.RequirePassword, "User name okay, need password.");
  static SyntaxMissingUsername = new MessageReply(ServerReplyCode.SyntaxError, "Must provide username");
}