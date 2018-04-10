const mongoose = require('mongoose')

const userBookSchema = mongoose.Schema({
  userId: { type: String },
  isbn: { type: String },
  flags: { type: JSON } // 喜好的权重
})

userBookSchema.index({userId: 1, isbn: -1})

mongoose.model('userbook', userBookSchema)
