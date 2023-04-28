/**
 * @param {import("../../FTPClientSession").FTPClientSession} session 
 * @param {string} parameter 
 */
const systAction = async (session, parameter) => {
  await session.status('215', 'UNIX Type: L8');
}

module.exports = systAction;