export enum ServerReplyCode {
  Success = 200,
  Greeting = 220,
  SystemType = 215,
  ClosingDataConnection = 226,
  PassiveModeOk = 227,
  Proceed = 230,
  DirectoryOk = 257,
  RequirePassword = 331,
  DataConnectionFail = 425,
  NonImplemented = 502,
  SyntaxError = 501,
  AccountError = 530,
}