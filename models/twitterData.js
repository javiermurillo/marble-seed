const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { v4 } = require('uuid')
const dataTables = require('mongoose-datatables')

const twitterDataSchema = new Schema({
  query: { type: String },
  host: { type: String },
  path: { type: String },
  type: { type: String },
  body: { type: Object },
  method: { type: String },
  status: { type: Number },
  uuid: { type: String, default: v4 },
  error: {
    message: { type: String },
    stack: { type: String }
  }
}, {
  timestamps: true
})

twitterDataSchema.index({createdAt: 1, uuid: 1, status: 1})

twitterDataSchema.plugin(dataTables)

module.exports = mongoose.model('TwitterData', twitterDataSchema)
