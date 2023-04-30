const { MockFSClient } = require("./MockFSClient");
const { ServerDTP } = require("./ServerDTP");
const { asyncSocketWrite } = require("./sock");

class FTPClientSession {

  /**
   * @param {import("net").Socket} socket 
   */
  constructor(socket, passiveModeConfig) {
    this.socket = socket; // TODO: ControlConnection ?
    this.user = '';
    this.authenticated = false;
    this.dtp = new ServerDTP(passiveModeConfig);
    this.fsClient = new MockFSClient();
  }

  async status(code, message) {
    console.log(`<${code} ${message}`);
    await asyncSocketWrite(this.socket, Buffer.from(`${code} ${message}\r\n`));
  }

  async greet() {
    await this.status("220", "Welcome to the server");
  }

}

module.exports = { FTPClientSession };