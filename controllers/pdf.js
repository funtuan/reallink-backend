
import uploadIbon from '../services/uploadIbon'

export default {
  async upload(ctx) {
    const file = ctx.request.files.file
    const code = await uploadIbon(file.path)
    ctx.body = {
      code,
    }
  },
}
