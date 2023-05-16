export enum ServerReplyCode {
  Success = 200,
  Greeting = 220,
  SystemType = 215,
  Proceed = 230,
  RequirePassword = 331,
  NonImplemented = 502,
  SyntaxError = 501,
  AccountError = 530,
}