const repl = require('repl');
const utils = require('./index')

const local = repl.start();
local.context.getRandomNumber = utils.getRandomNumber;
