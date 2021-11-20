const {
  padZero,
  parseFileName,
  getDateTimeString,
  getRandomStr
} = require('./utils')
const chinesenum = require("chinesenum")
const fs = require('fs-extra')

const nmDown = (filename, options = {}) => {
  let newName = filename.replace(/-P(\d+)\s/ig, (match, p1) => {
    const season = options.season || ''
    return `.${season}E${padZero(p1, options.padLength)}.`
  })
  newName = newName.replace(/\(cid=\d+\)/, '')
  if (/.(ass|xml)$/ig.test(newName)) {
    newName = 'danmaku/' + newName
  }
  return newName
}

const custom1 = (filename, options = {}) => {
  let newName = ''
  newName = filename.replace(/^\d+./ig, '红楼梦')
  newName = newName.replace(/\(Av\d+,P\d+\)/ig, '')
  /*
  \((.+)\)
  第(.+)集
  chinesenum.chinanumeralsToNum(p1, { format: 'cn' })
   */
  newName = newName.replace(/第(.+)集\s/ig, (match, p1) => {
    const season = options.season || ''
    return `.${season}E${padZero(chinesenum.chinanumeralsToNum(p1, { format: 'cn' }), options.padLength)}.`
  })
  // newName = newName.replace('', '')

  if (/.(ass|xml)$/ig.test(newName)) {
    newName = 'subtitle/' + newName
  }

  return newName
}

const obfuscation = (filename, options = {}) => {
  const {absPath} = options
  const stat = fs.statSync(absPath)
  const {
    prefix,
    suffix,
  } = parseFileName(filename)
  return `${getDateTimeString(stat.ctime)}_${getRandomStr()}${suffix}`
}

module.exports = {
  nmDown,
  custom1,
  obfuscation
}
