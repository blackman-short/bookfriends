module.exports = {
  isNumber (data) {
    return Object.prototype.toString.call(data).toLowerCase() === '[object string]'
  },
  isArray (data) {
    return Object.prototype.toString.call(data).toLowerCase() === '[object array]'
  },
  isJSON (data) {
    return Object.prototype.toString.call(data).toLowerCase() === '[object json]'
  },
  /**
 * Converts douBook to local book.
 * @param {*Object} douBook
 */
  bookConvertor (data) {
    let mapBook = null
    if (data) {
      mapBook = {
        isbn: data.isbn13,
        author: data.author, // 作者
        authorIntro: data.author_intro, // 作者介绍
        translator: data.translator, // 译者
        title: data.title, // 书名
        originTitle: data.origin_title, // 书的原名
        publisher: data.publisher, // 出版社
        pubdate: data.pubdate, // 出版时间
        images: data.images, // 图片路径集合： small, middle, large.
        price: data.price, // 价格： douban '89.00元'
        catalog: data.catalog, // 目录
        summary: data.summary, // 综述
        tags: data.tags,
        rating: data.rating.average == null ? 0 : Number(data.rating.average), // 评分
        ebookUrl: data.ebook_url == null ? '' : data.ebook_url // 电子书网址
      }
    }
    return mapBook
  }
}
