import './models'
import app from './app'
import { port } from './config/server'


async function main() {
  app.listen(port)
  console.log(`starting at port ${port}`)
}

main()
