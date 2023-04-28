/**
 * @param {import("net").Socket} socket 
 * @param {Buffer} buffer 
 */
const asyncSocketWrite = (socket, buffer) => {
  return new Promise((resolve, reject) => {
    socket.write(buffer, (err) => {
      if (err) reject(err);
      else resolve();
    })
  })
}

class FTPClientSession {

  /**
   * @param {import("net").Socket} socket 
   */
  constructor(socket) {
    this.socket = socket; // TODO: ControlConnection ?
    this.user = '';
    this.authenticated = false;
  }

  async status(code, message) {
    await asyncSocketWrite(this.socket, Buffer.from(`${code} ${message}\r\n`));
  }

  async greet() {
    await this.status("220", "Welcome to the server");
  }

}

module.exports = { FTPClientSession };