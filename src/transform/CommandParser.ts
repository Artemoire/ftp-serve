import { TransformCallback } from "node:stream";
import { Transform } from "stream";
import { CommandMnemonic, isCommandSupported } from "../command/CommandMnemonic";
import { FTPSession } from "../FTPSession";

export class CommandParser extends Transform {

  constructor() {
    super({ readableObjectMode: true });
  }

  _transform(data: any, encoding: BufferEncoding, callback: TransformCallback): void {
    const line = String(data);
    console.log(`[DEBUG] >${line}`);
    let space = 0;
    space = line.indexOf(" ");



    const mnemonic = (space === -1 ? line.toUpperCase() : line.substring(0, space).toUpperCase()) as CommandMnemonic;
    const parameter = space === -1 ? "" : line.substring(space + 1);
    const input = isCommandSupported(mnemonic) ? [mnemonic, parameter] : [CommandMnemonic.NONIMPLEMENTED, ""];
    this.push(input);
    callback();
  }

}