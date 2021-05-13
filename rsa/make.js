const NodeRSA = require('node-rsa')
const fs = require('fs')

function generator() {
  const key = new NodeRSA({ b: 2048 })
  key.setOptions({ encryptionScheme: 'pkcs1' })

  const privatePem = key.exportKey('pkcs1-private-pem')
  const publicPem = key.exportKey('pkcs1-public-pem')

  fs.writeFile('./rsa/pem/public.pem', publicPem, (err) => {
    if (err) throw err
    console.log('公鑰已儲存！')
  })
  fs.writeFile('./rsa/pem/private.pem', privatePem, (err) => {
    if (err) throw err
    console.log('私鑰已儲存！')
  })
}

generator()
