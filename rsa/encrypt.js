
const NodeRSA = require('node-rsa')

const publicPem = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAkEASmDvxlAmupW3LGhO6dMZjufic1zpDTeFK9q/+5aquydtcbRgn
rQg7Zfr+Sv+L+zb4uEzlK1YRlTUvxNqlHZ9Sp1Hp4CgBw4qeJr0HRrrXaamMA0nR
XV5N/0DYlu/TBjrt2EHP2rBK1sVc+PeyAadePeA7S9R9T/U9t704c+fXG9atWfR6
BjznpO/647mqEcPKhRYGAtJmIu40EYMbMLX1ECkfGwLHyGI6FymHMi1znXLxvk7q
U5Pq2Xuckeev18ioT3ls649oCNc6ufreh6X9f5fTF8L819PsH4CehVc6Eaf0FKv2
tlizb5jQCpHecesO1jcWPC7fNfEd0ffqwQIDAQAB
-----END RSA PUBLIC KEY-----`

function encrypt() {
  const key = new NodeRSA(publicPem)
  const json = {
    userId: '123123123',
    name: 'hank',
    phone: '09213123',
  }
  const encrypted = key.encrypt(JSON.stringify(json), 'base64')

  return encrypted
}

// generator();
console.log(encrypt())
