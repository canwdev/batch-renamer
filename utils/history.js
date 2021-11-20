const fs = require('fs-extra')
const path = require('path')
const {
  getDateTimeString,
  getIncrementFilename
} = require('./index')

class HistoryUtil {
  constructor(config = {}) {
    this.history = []
    this.basePath = config.basePath
    this.dryRun = config.dryRun
  }

  rename(from, to) {
    if (from === to) {
      console.log('Skipped: ' + from)
      return
    }
    console.log(from, '->', to)
    if (!this.dryRun) {
      const newPath = path.join(this.basePath, to)
      const newBasePath = path.dirname(newPath)
      fs.ensureDirSync(newBasePath)

      // start rename
      fs.moveSync(path.join(this.basePath, from), newPath)
    } else {
      console.log('Dry run.')
    }
    this.history.push({from, to})
  }

  toString(...params) {
    return JSON.stringify({
      basePath: this.basePath,
      history: this.history
    }, ...params)
  }

  // save rename json
  async saveFileSync() {
    let saveFilename = path.join(this.basePath, `rename_log_${getDateTimeString()}.json`)
    saveFilename = await getIncrementFilename(saveFilename)

    console.log(`History log save to ${saveFilename}`)
    if (this.dryRun) {
      console.log('Dry run.')
      return
    }
    fs.writeFileSync(saveFilename, this.toString(null, 2), {
      encode: 'utf-8'
    })
  }
}


module.exports = {
  HistoryUtil,
}
