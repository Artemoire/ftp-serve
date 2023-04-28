/**
 * @param {import("../../FTPClientSession").FTPClientSession} session 
 * @param {string} parameter 
 */
const userAction = async (session, parameter) => {
  if (session.user !== "") return await session.status('530', 'User already set');
  if (parameter === "") return await session.status('501', 'Must provide username');

  session.user = parameter;

  if (parameter === "anonymous") {
    session.authenticated = true;
    await session.status('230', 'Welcome back, anon');
  }


}

module.exports = userAction;