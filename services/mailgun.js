const mailgun = require('mailgun-js')
const { domain, apiKey } = require('../config/mailgun')
const mg = mailgun({ apiKey, domain })

module.exports = {
  sendRegisterMessage: async ({
    to,
    name,
    dashboardLink,
    printLink,
  }) => {
    const data = {
      'from': 'twlink-service <service@twlink.app>',
      'to': to,
      'subject': '【台灣加密型實聯制】感謝您註冊成為合作店家',
      'template': 'register_message',
      'h:X-Mailgun-Variables': JSON.stringify({
        name,
        dashboardLink,
        printLink,
      }),
    }
    const res = await mg.messages().send(data)
    return res
  },
}
