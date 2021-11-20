const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const {HistoryUtil} = require('./utils/history')
const renameTemplates = require('./templates')
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

  const padLength = (files.length).toString().length
  for (let key in files) {
    const file = files[key]
    const filename = path.relative(config.basePath, file)

    const newName = await renameTemplates[config.renameTemplate](filename, {
      padLength,
      season: config.season,
      basePath: config.basePath,
      absPath: file,
      ...config.customOptions
    })

    historyUtil.rename(filename, newName)
  }
  await historyUtil.saveFileSync()
}

// undoAll()
run()
