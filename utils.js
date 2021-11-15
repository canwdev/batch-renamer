const fs = require('fs-extra')
const path = require('path')

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
  saveFileSync() {
    if (this.dryRun) {
      return
    }
    fs.writeFileSync(path.join(this.basePath, `rename_log_${Date.now()}.json`), this.toString(null, 2), {
      encode: 'utf-8'
    })
  }
}

function padZero(num, len = 2) {
  return num.toString().padStart(len, '0')
}

module.exports = {
  HistoryUtil,
  padZero
}
