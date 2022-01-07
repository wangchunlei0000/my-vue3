const fs = require('fs')
const path = require('path')

const configFilePath = path.resolve(__dirname, '.env')
// 判断文件是不是存在
const exists = fs.existsSync(configFilePath)
// 存在则结束
if (exists) return
fs.writeFileSync(
  configFilePath,
  `proxyTarget=https://console.box.lenovo.com/
    `,
)
