export enum CommandMnemonic {
  NONIMPLEMENTED = "????",
  CWD = "CWD",
  LIST = "LIST",
  MKD = "MKD",
  NOOP = "NOOP",
  PASV = "PASV",
  PORT = "PORT",
  PWD = "PWD",
  QUIT = "QUIT",
  SYST = "SYST",
  TYPE = "TYPE",
  USER = "USER",
}

const supportedMnemonics = Object.values(CommandMnemonic) as string[];

export const isCommandSupported = (key: string): boolean => supportedMnemonics.includes(key);