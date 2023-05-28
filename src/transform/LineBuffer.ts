import { Transform, TransformCallback } from "stream";

export class LineBuffer extends Transform {

  private buffer: string = '';

  constructor() {
    super({ readableObjectMode: true })
  }

  _pushLines() {
    while (true) {
      const index = this.buffer.indexOf('\n');
      if (index === -1) {
        break;
      }

      const crlf = this.buffer[index - 1] === '\r' ? 1 : 0;

      const line = this.buffer.slice(0, index - crlf);
      this.buffer = this.buffer.slice(index + 1);
      this.push(line);
    }
  }

  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
    this.buffer += chunk.toString('ascii');
    this._pushLines();
    callback();
  }

  _flush(callback: TransformCallback) {
    this._pushLines();
    callback();
  }
}