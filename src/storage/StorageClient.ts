import { FTPSession } from "../FTPSession";
import { User } from "../state/User";
import { FileDescriptor } from "./FileDescriptor";

export abstract class StorageClient {

  constructor(
    protected user: User
  ) {
  }

  abstract list(path: string): Promise<FileDescriptor[]> | FileDescriptor[];

}

export type StorageClientProvider = { (session: FTPSession): StorageClient };