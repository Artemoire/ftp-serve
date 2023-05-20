import { FileDescriptor } from "./FileDescriptor";
import { StorageClient } from "./StorageClient";

export class MockStorageClient extends StorageClient {

  list(path: string): FileDescriptor[] | Promise<FileDescriptor[]> {
    return [
      { name: 'folder', path },
      { name: 'file', path },
    ]
  }

}