const net = require('net');
const { CommandBuffer } = require('./commands/CommandBuffer');
const { FTPClientSession } = require('./FTPClientSession');
const { LineBuffer } = require('./LineBuffer');
const { parseCommand } = require('./commands/parseCommand');

class FTPServer {

  constructor() {
    this.server = net.createServer((socket) => this._connect(socket))
  }

  /**
   * @param {net.Socket} socket 
   */
  async _connect(socket) {
    const session = new FTPClientSession(socket);
    await session.greet();

    const lines = new LineBuffer();
    const commands = new CommandBuffer();

    lines.on('data', (line) => commands.enqueue(parseCommand(session, line))); // TODO: unknown command?
    socket.pipe(lines);
    // socket.destroy();
  }

}

module.exports = { FTPServer };