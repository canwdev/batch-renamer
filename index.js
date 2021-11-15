const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const {HistoryUtil} = require('./utils')
const renamer = require('./renamer')
const config = require('./config')

const undoAll = () => {
  const historyUtil = new HistoryUtil({basePath: config.basePath})
  const {history} = require(path.join(config.basePath, config.undoHistoryFileName))
  console.log(history)
  history.forEach(item => {
    const {from, to} = item
    historyUtil.rename(to, from)
  })
  historyUtil.saveFileSync()
}

const run = async () => {
  const historyUtil = new HistoryUtil({
    basePath: config.basePath,
    dryRun: config.dryRun
  })
  let files = glob.sync('*.*', {
    ignore: [
      '*.json'
    ],
    cwd: config.basePath,
    nodir: true,
    absolute: true
  })
  files = files.map(item => {
    return path.relative(config.basePath, item)
  })

  const padLength = (files.length).toString().length
  for (let key in files) {
    const filename = files[key]

    const newName = renamer[config.renameType](filename, {
      padLength,
      season: config.season
    })

    historyUtil.rename(filename, newName)
  }
  historyUtil.saveFileSync()
}

// undoAll()
run()
