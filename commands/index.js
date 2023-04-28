const { instantiateCommand, defineCommand } = require("./CommandTable")

defineCommand('USER', require('./actions/user'));
defineCommand('SYST', require('./actions/syst'));
defineCommand('PWD', require('./actions/pwd'));

module.exports = {
  instantiateCommand
}