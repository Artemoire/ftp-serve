/**
 * @param {import("../../FTPClientSession").FTPClientSession} session 
 * @param {string} parameter 
 */
const typeAction = async (session, parameter) => {
    // TODO: implement
    await session.status(200, "Switching to ASCII mode.")
}

module.exports = typeAction;