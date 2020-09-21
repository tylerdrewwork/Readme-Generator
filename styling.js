const clic = require('cli-color');
const canvas = require('canvas');

exports.textH1 = clic.green.bold.underline;
exports.textH2 = clic.green.bold;
exports.textQuestion = clic.yellowBright.italic;
exports.consoleClear = () => process.stdout.write(clic.reset);
