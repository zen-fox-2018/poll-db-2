const Operations = require('./operations.js');
const argv = process.argv.slice(2);

switch (argv[0]) {
  case 'numberOne':
  Operations.numberOne();
    break;
  case 'numberTwo':
  Operations.numberTwo();
  break;
  case 'numberThree':
  Operations.numberThree();
  break;
  default:
  console.log('Salah');
}
