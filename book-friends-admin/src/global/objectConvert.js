function userConvertor(users) {
  let newUsers = []

  if (users && users.length > 0) {
    users.forEach(u => {
      let object = {}
      object.phoneNumber = u.phoneNumber
      object.nickName = u.nickName
      object.age = 20
      object.location = ''
      if (!u.provinceName && !u.univercity) {
        object.location = '暂无数据'
      } else {
        if (u.provinceName) {
          object.location += u.provinceName + ' '
        }
  
        if (u.univercity) {
          object.location += u.univercity
        }
      }

      if(u.birthday) {
        object.age = new Date().getFullYear() - new Date(u.birthday).getFullYear() + 1
      }
      object.sex = u.sex === 1? '男' : '女'
      object.isActive = u.isActive === true? '可用' : '不可用'

      newUsers.push(object)
    })
  }

  return newUsers
}

function convertUser (user) {
  let newUser = {}

  if (user) {
    newUser.phoneNumber = user.phoneNumber
    if (user.isActive === '可用') {
      newUser.isActive = true
    } else {
      newUser.isActive = false
    }
  }
  return newUser
}

function bookConvertor(books) {
  let newBooks = []

  if (books && books.length > 0) {
    
  }

  return newBooks
}

exports.userConvertor = userConvertor