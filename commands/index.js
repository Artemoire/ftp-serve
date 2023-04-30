const { instantiateCommand, defineCommand } = require("./CommandTable")

defineCommand('CWD', require('./actions/cwd'));
defineCommand('LIST', require('./actions/list'));
defineCommand('NOOP', require('./actions/noop'));
defineCommand('PASV', require('./actions/pasv'));
defineCommand('PWD', require('./actions/pwd'));
defineCommand('SYST', require('./actions/syst'));
defineCommand('TYPE', require('./actions/type'));
defineCommand('USER', require('./actions/user'));

module.exports = {
  instantiateCommand
}