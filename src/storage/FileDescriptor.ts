export interface FileDescriptor {
  name: string;
  path: string;
  isDirectory: boolean;
  size: number;
  modified: number;
}