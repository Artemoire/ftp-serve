const { executeIfAuthenticated } = require("../FTPCommand");

/**
 * @param {import("../../FTPClientSession").FTPClientSession} session 
 * @param {string} parameter 
 */
const noOpAction = async (session, parameter) => {
  await session.status('200', `I am still here`);
}

module.exports = executeIfAuthenticated(noOpAction);