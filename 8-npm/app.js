const validator = require('validator')
const chalk = require('chalk')

// console.log(validator.isEmail('yanasurya1989@gmail.com'))
// console.log(validator.isMobilePhone('12345656', 'id-ID'))
// console.log(validator.isNumeric('12345656', 'id-ID'))
// console.log(chalk.bgWhite.blue('hallo werod'))
// console.log(chalk.italic.bgred.red('hallo werod'))

const nama = 'Yana'
const pesan = chalk`Lorem ipsum, {bgRed.black.bold dolor sit amet} consectetur {bgGreen.italic adipisicing elit.} Voluptate, quisquam?. Nama saya : ${nama}`
// console.log(chalk.bgWhite.red(pesan))
console.log((pesan))