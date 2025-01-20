const chalk = require('chalk')

const palette = {
  error: '#e74c3c',
  warning: '#f39c12',
  success: '#27ae60',
  info: '#bdc3c7',
  debug: '#8e44ad',
}

const timestamp = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const date = now.getDate().toString().padStart(2, '0')
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const seconds = now.getSeconds().toString().padStart(2, '0')
  const milliseconds = now.getMilliseconds().toString().padStart(3, '0')
  return `${year}/${month}/${date} ${hours}:${minutes}:${seconds}.${milliseconds}`
}

const log = (text, colour, type) => {
  return console.log(`${timestamp()} ${chalk.bold.hex(colour)(`[${type.toUpperCase()}]`)} ${text}`)
}

module.exports = {
  error: (text) => log(text, palette.error, 'error'),
  warning: (text) => log(text, palette.warning, 'warning'),
  success: (text) => log(text, palette.success, 'success'),
  info: (text) => log(text, palette.info, 'info'),
  debug: (text) => log(text, palette.debug, 'debug'),
}
