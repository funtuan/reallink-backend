
import { infoPublicKey } from '../config/pem'

export default {
  async find(ctx) {
    ctx.body = {
      infoPublicKey: infoPublicKey,
    }
  },
}
