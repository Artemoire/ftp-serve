const { executeIfAuthenticated } = require("../FTPCommand");

const listAction = executeIfAuthenticated(async (session, parameter) => {
});

module.exports = listAction