const path = require('path')
const fs = require('fs-extra')

let config = {
  basePath: '/home/Test/',
  season: '', // 季节
  renameTemplate: 'custom1', // 重命名模板
  dryRun: false, // 试运行
  customOptions: {}
  // undoHistoryFileName: 'rename_log_1625413579243.json'
}
const configPath = path.join(__dirname, 'config.json')

if (fs.existsSync(configPath)) {
  try {
    const userConfig = require(configPath)
    config = {
      ...config,
      ...userConfig
    }
  } catch (e) {
    console.warn('config.json SyntaxError', e)
  }
}

module.exports = config
