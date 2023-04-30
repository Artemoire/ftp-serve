const { executeIfAuthenticated } = require("../FTPCommand");

/**
 * @param {import("../../FTPClientSession").FTPClientSession} session 
 * @param {string} parameter 
 */
const cwdAction = async (session, parameter) => {
  session.fsClient.cwd(parameter);
  await session.status('250', `Changed work directory to "${session.fsClient.workDir}"`);
}

module.exports = executeIfAuthenticated(cwdAction);