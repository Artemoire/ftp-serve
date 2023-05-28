import { FileDescriptor } from "./FileDescriptor";
import { StorageClient } from "./StorageClient";

export class MockStorageClient extends StorageClient {

  private timeOfCreation = Number(new Date());
  private mockFile = { name: 'file', path: '/', isDirectory: false, modified: this.timeOfCreation, size: 123 };
  private mockFolder = { name: 'folder', path: '/', isDirectory: true, modified: this.timeOfCreation, size: 0 };
  private mockRoot = { name: 'root', path: '/', isDirectory: true, modified: this.timeOfCreation, size: 0 };

  async info(path: string): Promise<FileDescriptor | undefined> {
    if (path === '/') return this.mockRoot;
    if (path.endsWith("/folder")) return this.mockFolder;
    if (path.endsWith("/file")) return this.mockFile;
  }

  list(path: string): FileDescriptor[] | Promise<FileDescriptor[]> {
    return [
      this.mockFolder,
      this.mockFile,
    ]
  }

}