import { FTPSession } from "../FTPSession";

export type CommandHandler = { (session: FTPSession, parameter: string | undefined): Promise<void> | void };
