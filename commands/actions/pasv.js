/**
 * @param {import("../../FTPClientSession").FTPClientSession} session 
 * @param {string} parameter 
 */
const pasvAction = async (session, parameter) => {
  // TODO: implement
  session.dtp.passive();
  // TODO: ipv6 ipv4 abstraction
  const passiveParams = session.dtp.listen.split(".").concat((session.dtp.port >>> 8) & 0xFF, session.dtp.port & 0xFF).join(",");
  await session.status(227, `Entering Passive Mode (${passiveParams}).`);
}

module.exports = pasvAction;