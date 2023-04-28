const { instantiateCommand } = require(".");

/**@param {string} line */
const parseCommand = (session, line) => {
  console.log('>' + line);
  let space = 0;
  space = line.indexOf(" ");
  if (space === -1) return instantiateCommand(line.toUpperCase(), session, "");

  const id = line.substring(0, space).toUpperCase();
  const parameter = line.substring(space + 1);
  return instantiateCommand(id, session, parameter);
}

module.exports = { parseCommand };