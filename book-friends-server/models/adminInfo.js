const mongoose = require('mongoose')
const tools = require('../utils/tools')

const AdminSchema = new mongoose.Schema({
  id: { type: String, default: tools.getUUID },
  realName: { type: String },
  adminName: { type: String },
  password: { type: String },
  phoneNumber: { type: String },
  email: { type: String },
  createAt: { type: String, default: tools.getCurrentTime },
  updateAt: { type: String, default: tools.getCurrentTime },
  loginAt: { type: String }
})

mongoose.model('admin', AdminSchema)
