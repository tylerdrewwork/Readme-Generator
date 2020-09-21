const clic = require('cli-color');
const canvas = require('canvas');

exports.textH1 = clic.bold.underline;
exports.textH2 = clic.bold;
exports.consoleClear = () => process.stdout.write(clic.reset);
