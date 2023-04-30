const net = require('net');
const { CommandBuffer } = require('./commands/CommandBuffer');
const { FTPClientSession } = require('./FTPClientSession');
const { LineBuffer } = require('./commands/LineBuffer');
const { parseCommand } = require('./commands/parseCommand');
const { PassiveModeConfig } = require('./PassiveModeConfig');

class FTPServer {

  constructor() {
    this.server = net.createServer((socket) => this._connect(socket))
    this.passiveModeConfig = PassiveModeConfig.range(49152, 65534);
  }

  /**
   * @param {net.Socket} socket 
   */
  async _connect(socket) {
    console.log('DEBUG connecting socket: ' + socket.remoteAddress);

    const session = new FTPClientSession(socket, this.passiveModeConfig);
    await session.greet();

    const lines = new LineBuffer();
    const commands = new CommandBuffer();

    lines.on('data', (line) => commands.enqueue(parseCommand(session, line))); // TODO: unknown command?
    socket.pipe(lines);
    // socket.destroy();
  }

}

module.exports = { FTPServer };