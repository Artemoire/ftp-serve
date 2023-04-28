const { Transform } = require('stream');

class LineBuffer extends Transform {

  constructor() {
    super({ readableObjectMode: true })
    this.buffer = '';
  }

  _pushLines() {
    while (true) {
      const index = this.buffer.indexOf('\n');
      if (index === -1) {
        // no complete line found, wait for more data
        break;
      }

      const crlf = this.buffer[index - 1] === '\r' ? 1 : 0;

      const line = this.buffer.slice(0, index - crlf);
      this.buffer = this.buffer.slice(index + 1);
      this.push(line);
    }
  }

  _transform(chunk, encoding, callback) {
    this.buffer += chunk.toString('ascii');
    this._pushLines();
    callback();
  }

  _flush(callback) {
    this._pushLines();
    callback();
  }
}

module.exports = { LineBuffer };