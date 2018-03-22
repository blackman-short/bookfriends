const bookManager = require('../managers/bookInfo')

async function saveBook (req, res, next) {
  await bookManager.saveBook()
  // const loadData = await bookManager.queryCertainFields()
  // const loadData = await bookManager.pageQuery()
  return res.status(200).send({Code: 0, result: 'ok'})
}
exports.saveBook = saveBook
