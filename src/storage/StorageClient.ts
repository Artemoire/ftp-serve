import { FTPSession } from "../FTPSession";
import { User } from "../state/User";
import { FileDescriptor } from "./FileDescriptor";

export abstract class StorageClient {

  abstract info(path: string): Promise<FileDescriptor | undefined>;
  abstract mkdir(path: string): Promise<boolean>;
  abstract list(path: string): Promise<FileDescriptor[]> | FileDescriptor[];

}

export type StorageClientProvider = { (session: FTPSession): StorageClient };