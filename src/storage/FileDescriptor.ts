export interface FileDescriptor {
  name: string;
  path: string; // TODO: is this required ?
  isDirectory: boolean;
  size: number;
  modified: number;
}