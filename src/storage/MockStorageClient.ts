import { FileDescriptor } from "./FileDescriptor";
import { StorageClient } from "./StorageClient";

export class MockStorageClient extends StorageClient {

  list(path: string): FileDescriptor[] | Promise<FileDescriptor[]> {
    const now = Number(new Date());
    return [
      { name: 'folder', path, isDirectory: true, modified: now, size: 0 },
      { name: 'file', path, isDirectory: false, modified: now, size: 123 },
    ]
  }

}