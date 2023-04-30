const { executeIfAuthenticated } = require("../FTPCommand");

/**
 * @param {import("../../FTPClientSession").FTPClientSession} session 
 * @param {string} parameter 
 */
const pwdAction = async (session, parameter) => {
  await session.status('257', `"${session.fsClient.workDir}" is the current directory`);
}

module.exports = executeIfAuthenticated(pwdAction);