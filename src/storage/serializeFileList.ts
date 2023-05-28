import { FileDescriptor } from "./FileDescriptor";

const BIN_LS_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const binLsFormat = (file: FileDescriptor) => { // TODO: allow formatter selection
  const flags = file.isDirectory ? 'drwxr-xr-x 1 owner group' : 'rw-r--r-- 1 owner group';
  const size = file.size.toString().padStart(13, ' ');
  const sixMonthsAgo = Number(new Date()) - (1000 * 60 * 60 * 24 * 30 * 6);
  const modifiedDate = new Date(file.modified);
  const month = BIN_LS_MONTHS[modifiedDate.getMonth()];
  const date = modifiedDate.getDate().toString().padStart(2, ' ');
  const timeOfDay = modifiedDate.getHours().toString().padStart(2, '0') + ":" + modifiedDate.getMinutes().toString().padStart(2, '0');
  const year = modifiedDate.getFullYear().toString().padStart(5, ' ');
  const recent = `${month} ${date} ${timeOfDay}`;
  const nonRecent = `${month} ${date} ${year}`;
  const modified = file.modified > sixMonthsAgo ? recent : nonRecent;

  return `${flags} ${size} ${modified} ${file.name}\r\n`;
}

export const serializeFileList = (files: FileDescriptor[]) => files.map(binLsFormat).join("");