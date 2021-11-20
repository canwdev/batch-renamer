const fs = require('fs-extra')
const Path = require('path')


function padZero(num, len = 2) {
  return num.toString().padStart(len, '0')
}

// 检查文件名是否存在，如果存在则加_1
const getIncrementFilename = async (filename, increment = 0) => {
  const incrementText = increment ? `_${increment}` : ''
  const prefix = Path.join(Path.dirname(filename), Path.basename(filename, Path.extname(filename)))
  const name = `${prefix}${incrementText}${Path.extname(filename)}`
  if (await fs.exists(name)) {
    return getIncrementFilename(filename, increment += 1)
  }
  return name
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomStr() {
  return Math.random().toString(36).substr(2)
}

const guid = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }

  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

//  parseFileName('aaa_aa_xx.mp3')
const parseFileName = (n) => {
  let dotIndex = n.lastIndexOf('.')
  if (dotIndex < 0) {
    dotIndex = n.length
  }
  const prefix = n.substr(0, dotIndex)
  const suffix = n.substr(dotIndex, n.length)
  return {
    // dotIndex,
    prefix,
    suffix
  }
}

/**
 * 获取日期和时间戳（如：202009271518）
 */
function getDateTimeString(d = new Date()) {
  return `${d.getFullYear()}${padZero(d.getMonth() + 1)}${padZero(d.getDate())}${padZero(d.getHours())}${padZero(d.getMinutes())}`
}

module.exports = {
  padZero,
  getIncrementFilename,
  getRandomArbitrary,
  getRandomInt,
  getRandomStr,
  guid,
  parseFileName,
  getDateTimeString,

}
