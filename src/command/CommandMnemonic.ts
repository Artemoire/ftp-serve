export enum CommandMnemonic {
  NONIMPLEMENTED = "????",
  // LIST = "LIST",
  // RETR = "RETR",
  SYST = "SYST",
  TYPE = "TYPE",
  USER = "USER",
}

const supportedMnemonics = Object.values(CommandMnemonic) as string[];

export const isCommandSupported = (key: string): boolean => supportedMnemonics.includes(key);