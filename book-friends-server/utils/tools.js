const moment = require('moment')
const crypto = require('crypto')
const uuid = require('uuid')
const validator = require('validator')

function getUUID () {
  return uuid.v1().toString().replace(/[-]/g, '')
}

/**
 * Validates the phone number is valid.
 * @param {*String} phoneNumber
 */
function isPhoneNumber (phoneNumber) {
  let isValid = false
  const regex = /^1[3|4|5|8][0-9]\d{4,8}$/

  if (phoneNumber && validator.trim(phoneNumber)) {
    isValid = regex.test(phoneNumber)
  }

  return isValid
}

/**
 * Validates the email is valid.
 * @param {*String} email
 */
function isEmail (email) {
  let isValid = false
  const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/

  if (email && validator.trim(email)) {
    isValid = regex.test(email)
  }

  return isValid
}

/**
 * Validates the dateString is pattern 'yyyy-mm-dd'
 * @param {*String} dateString
 */
function isValidDate (dateString) {
  let isValid = false
  const regex = /^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/

  if (dateString && validator.trim(dateString)) {
    isValid = regex.test(dateString)
  }
  return isValid
}

/**
 * Gets current time. yyyy-MM-dd HH:mm:ss
 */
function getCurrentTime () {
  return moment().format('YYYY-MM-DD HH:mm:ss').toString()
}

/**
 * Gets current date. yyyy-MM-dd
 */
function getCurrentDate () {
  return moment().format('YYYY-MM-DD').toString()
}
/**
 * Encrypts the parameter.
 * @param {*String} param
 */
function hMd5Encrypt (param) {
  let secretSign = param

  if (param) {
    const md5 = crypto.createHash('md5')
    md5.update(param)
    secretSign = md5.digest('hex')
  }

  return secretSign
}

/**
 * Decrypt secret parameter.
 * @param {*String} param
 */
function hMd5Decrypt (param) {
  let verifysign = crypto.createHash('md5').update(param, 'utf8').digest('hex')
  return verifysign
}

exports.isEmail = isEmail
exports.isPhoneNumber = isPhoneNumber
exports.isValidDate = isValidDate
exports.getCurrentDate = getCurrentDate
exports.getCurrentTime = getCurrentTime
exports.encrypt = hMd5Encrypt
exports.decrypt = hMd5Decrypt
exports.getUUID = getUUID
