const request = require('request').defaults({ jar: true })
const cheerio = require('cheerio')
const fs = require('fs')

module.exports = (path) => {
  return new Promise((resolve, reject) => {
    request('https://www.ibon.com.tw/mobile/printscan/D0111_fileupload_innerifrm.aspx', (err, res, body)=>{
      if (err) {
        reject(err)
        return
      }
      const $ = cheerio.load(body)
      const __VIEWSTATE = $('#__VIEWSTATE').val()
      const __EVENTVALIDATION = $('#__EVENTVALIDATION').val()

      const options = {
        url: 'https://www.ibon.com.tw/mobile/printscan/D0111_fileupload_innerifrm.aspx',
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        formData: {
          'fuFile': fs.createReadStream(path),
          '__VIEWSTATE': __VIEWSTATE,
          '__EVENTVALIDATION': __EVENTVALIDATION,
          'txtUserName': 'reallink',
          'chkboxAgree': 'on',
          'lnkbtnUpload': '確認上傳',
          'txtEmail': 'reallink@ohbottech.com',
        },
      }
      request(options, (err, res, body)=>{
        fs.unlinkSync(path)
        if (err) {
          reject(err)
          return
        }
        request('https://www.ibon.com.tw/mobile/printscan/D0111_fileupload_info.aspx', (err, res, body)=>{
          if (err) {
            reject(err)
            return
          }
          const $ = cheerio.load(body)
          const code = $('td span.valignmiddle').text().trim()
          console.log(code)
          resolve(code)
        })
      })
    })
  })
}

