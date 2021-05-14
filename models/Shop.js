import mongoose, { Schema } from 'mongoose'
const schema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactName: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  secret: {
    type: String,
    required: true,
  },
  record: [{
    type: Schema.Types.ObjectId,
    ref: 'Record',
  }],
}, { timestamps: true })

const model = mongoose.model('Shop', schema)

export default model
