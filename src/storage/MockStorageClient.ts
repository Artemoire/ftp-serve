import { Success } from "../Result";
import { InvalidPath, PathAlreadyExists } from "../StorageResults";
import { FileDescriptor } from "./FileDescriptor";
import { StorageClient } from "./StorageClient";

type VFile = {
  name: string;
  modified: number;
  size: number;
  directory?: Record<string, VFile>;
  data?: Buffer;
}

const timeOfCreation = Number(new Date());
const randomNumber = () => '0'.charCodeAt(0) + Math.round(Math.random() * 9);
const randomBuffer = (size: number) => Buffer.from(Buffer.alloc(size).map(randomNumber))

const cDir = (name: string, ...files: VFile[]): VFile => ({
  name,
  modified: timeOfCreation,
  size: 0,
  directory: files.reduce((fileMap, file) => ({ ...fileMap, [file.name]: file }), {})
})
const cDirM = (name: string, modified: number, ...files: VFile[]): VFile => ({
  name,
  modified,
  size: 0,
  directory: files.reduce((fileMap, file) => ({ ...fileMap, [file.name]: file }), {})

});
const cFile = (name: string, size: number, modified: number = timeOfCreation, data: Buffer = randomBuffer(size)): VFile => ({
  name,
  modified: timeOfCreation,
  size,
  data
});
const cVFS = (...files: VFile[]): VFile => cDir("vroot", cDir("", ...files))

const selectVFS = (vfs: VFile, path: string): VFile | undefined => {
  path = path.trim();
  if (path === "/" && vfs.directory) return vfs.directory[""];
  const subpaths = path.split("/");
  let dir: VFile | undefined = vfs;
  for (const subpath of subpaths) {
    if (!dir) return undefined;
    if (!dir.directory) return undefined;
    dir = dir.directory[subpath];
  }
  return dir;
}

const MOCK_VFS = cVFS(
  cDir("folder"),
  cFile("file", 256)
)

export class MockStorageClient extends StorageClient {

  async info(path: string): Promise<FileDescriptor | undefined> {
    const selected = selectVFS(MOCK_VFS, path);
    if (!selected) return undefined;

    return {
      isDirectory: !!selected.directory,
      modified: selected.modified,
      name: selected.name,
      path,
      size: selected.size
    }
  }

  async mkdir(path: string): Promise<Success | InvalidPath | PathAlreadyExists> {
    path = path.trim();
    if (path === "/") return false;
    const subpaths = path.split("/");
    let dir: VFile | undefined = MOCK_VFS;
    const modified = +new Date();
    let created = 0;
    for (const subpath of subpaths) {
      if (!dir.directory) return InvalidPath.Result;
      if (!dir.directory[subpath]) {
        dir.directory[subpath] = cDirM(subpath, modified);
        created++;
      }
      dir = dir.directory[subpath];
    }

    if (created === 0) return PathAlreadyExists.Result;
    return Success.Result;
  }

  list(path: string): FileDescriptor[] | Promise<FileDescriptor[]> {
    const selected = selectVFS(MOCK_VFS, path);

    if (!selected) return [];
    if (!selected.directory) return [];

    return Object.values(selected.directory).map(vfile => ({
      isDirectory: !!vfile.directory,
      modified: vfile.modified,
      name: vfile.name,
      path,
      size: vfile.size
    }))

  }
}