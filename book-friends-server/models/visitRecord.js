const mongoose = require('mongoose')
const tool = require('../utils/tools')

const visitRecordSchema = mongoose.Schema({
  id: { type: String, default: tool.getUUID() },
  userId: { type: String },
  isbn: { type: String },
  visitCount: { type: Number, default: 1000 },
  visitAt: { type: String, default: tool.getCurrentDate() }
})

mongoose.model('visitrecord', visitRecordSchema)
