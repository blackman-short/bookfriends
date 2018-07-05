const mongoose = require('mongoose')
const tools = require('../utils/tools')

const userInfoSchema = mongoose.Schema({
  id: { type: String, default: tools.getUUID },
  phoneNumber: { type: String, index: true }, // 手机号
  password: { type: String }, // 密码
  nickName: { type: String }, // 昵称
  sex: { type: Number }, // 性别: 0: '女'; 1: 男'
  birthday: { type: String }, // 生日
  provinceName: { type: String }, // 所在省
  cityName: { type: String }, // 所在城市
  univercity: { type: String }, // 所在大学
  educationBackground: { type: String }, // 学历
  headIcon: { type: String, default: 'm_01' }, // 头像
  description: { type: String }, // 自我描述
  QRCode: { type: String }, // 二维码
  hobbies: [String], // 喜好,
  isActive: { type: Boolean, default: true },
  createTime: { type: String, default: tools.getCurrentTime }, // 创建时间
  updateTime: { type: String, default: tools.getCurrentTime }, // 更新时间
  lastLoginTime: { type: String, default: tools.getCurrentTime }, // 最近一次登录时间
  isOnline: { type: Boolean, default: false } // 是否在线
})

mongoose.model('user', userInfoSchema)
