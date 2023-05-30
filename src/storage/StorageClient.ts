import { FTPSession } from "../FTPSession";
import { Success } from "../Result";
import { InvalidPath, PathAlreadyExists } from "../StorageResults";
import { User } from "../state/User";
import { FileDescriptor } from "./FileDescriptor";

export abstract class StorageClient {

  abstract info(path: string): Promise<FileDescriptor | undefined>;
  abstract mkdir(path: string): Promise<Success | InvalidPath | PathAlreadyExists>;
  abstract list(path: string): Promise<FileDescriptor[]> | FileDescriptor[];

}

export type StorageClientProvider = { (session: FTPSession): StorageClient };