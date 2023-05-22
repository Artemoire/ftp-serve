export enum ServerReplyCode {
  Success = 200,
  Greeting = 220,
  SystemType = 215,
  PassiveModeOk = 227,
  Proceed = 230,
  DirectoryOk = 257,
  RequirePassword = 331,
  NonImplemented = 502,
  SyntaxError = 501,
  AccountError = 530,
}