class CommandBuffer {

  /**
   * @param {import("../FTPClientSession").FTPClientSession} session 
   */
  constructor(session) {
    this.queue = [];
    this.processing = false;
  }

  enqueue(command) {
    this.queue.push(command);
    if (!this.processing) this._processNextCommand();
  }

  async _processNextCommand() {
    this.processing = true;
    const command = this.queue.shift();
    await command.execute();
    if (this.queue.length > 0) this._processNextCommand();
    else this.processing = false;
  }

}

module.exports = { CommandBuffer };