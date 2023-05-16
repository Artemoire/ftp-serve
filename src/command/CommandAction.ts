import { FTPSession } from "../FTPSession";

export type CommandAction = { (session: FTPSession, parameter: string | undefined): Promise<void> | void };
