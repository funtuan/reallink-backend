import mongoose, { Schema } from 'mongoose'
const schema = new Schema({
  info: {
    type: String,
    required: true,
  },
  goAt: {
    type: Date,
    required: true,
  },
  uuid: {
    type: String,
  },
  shop: {
    type: Schema.Types.ObjectId,
    ref: 'Shop',
  },
}, { timestamps: true })

const model = mongoose.model('Record', schema)

export default model
