
const NodeRSA = require('node-rsa')
const fs = require('fs')

function decrypt() {
  fs.readFile('./rsa/pem/private.pem', function(err, data) {
    const encrypted = `Aj7TPWKvw0MTgWtH/I5jUzHSmwvB7vAIvl7UYFS7uMk8uVVUKauwhWVxPC0Dw86XTToZolN7jJXPmjynMoEY3WMdV4nvyXyvtmMw5jDYwha5p6QjujuVh6Ej/K2nf/xaB24rT0WkAllPB7abGIzbWLCCoBjtP5oJfnJfRyKPVmCov/71fcLA22U7hIGhcaCsJjW5UZ2c5eHbngP/P01P2dsQLTAYInGbVZZSlNR8mPbVFFfPhensPZmTiTerccO+iz8f2Plh1E6Ml/pSapZdW2KiKxxg6/t2LAqsJR9EBdz74trQQsidrg/4OGnxIjD5lG1cT6DxLzuM4Ea96RIx1A==`
    const key = new NodeRSA(data)
    const cipherText = key.decrypt(encrypted, 'utf8')
    const json = JSON.parse(cipherText)
    console.log(json)
  })
}

// generator();
decrypt()
