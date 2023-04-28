/**@typedef {{(session:import("../FTPClientSession").FTPClientSession, parameter: any):Promise<void>}} CommandAction */

class FTPCommand {

  constructor(id, action, session, parameter) {
    this.id = id;
    this.action = action;
    this.session = session;
    this.parameter = parameter;
  }

  async execute() {
    await this.action(this.session, this.parameter);
  }
}

/**
 * @param {CommandAction} action 
 * @returns {CommandAction}
 */
const executeIfAuthenticated = (action) => async (session, parameter) => {
  if (session.authenticated) await action(session, parameter);
}

module.exports = { FTPCommand, executeIfAuthenticated };