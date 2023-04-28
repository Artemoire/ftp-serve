const { FTPCommand } = require("./FTPCommand");

/**@typedef {{(session:import("./FTPClientSession").FTPClientSession, parameter: any):Promise<void>}} CommandAction */

const CommandActionTable = {};
/**
 * @param {string} id 
 * @param {CommandAction} action 
 */
const defineCommand = (id, action) => {
  CommandActionTable[id] = action;
}

const instantiateCommand = (id, session, parameter) => {
  if (!(id in CommandActionTable)) throw `Unknown command ${id}`;
  return new FTPCommand(id, CommandActionTable[id], session, parameter);
}

// TODO: isCommandDefined


module.exports = { defineCommand, instantiateCommand }