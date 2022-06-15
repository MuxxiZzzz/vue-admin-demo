/**
 * Created by PanJiaChen on 16/11/18.
 */
export function validateUsername(rule, value, callback) {
  if (!validUsername(value)) {
    callback(new Error('请输入正确的用户名'))
  } else {
    callback()
  }
}
export function validateUserid(rule, value, callback) {
  if (!valiUserid(value)) {
    callback(new Error('请输入3-12位由数字与字母组成的ID'))
  } else {
    callback()
  }
}
export function validateUseremail(rule, value, callback) {
  if (!valiUseremail(value)) {
    callback(new Error('请输入正确的邮箱'))
  } else {
    callback()
  }
}
export function validatePassword(rule, value, callback) {
  if (!valiPassword(value)) {
    callback(new Error('请输入6-16位由数字与字母组成的密码'))
  } else {
    callback()
  }
}
export function validateComplex(rule, value, callback) {
  if (!valiComplex(value)) {
    callback(new Error('请输入正确的ID或邮箱'))
  } else {
    callback()
  }
}
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
function validUsername(str) {
  return /^.{3,10}$/.test(str)
}
function valiUserid(str) {
  return /^[A-Za-z0-9]{3,12}$/.test(str)
}
function valiUseremail(str) {
  return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(str)
}
function valiPassword(str) {
  return /^[A-Za-z0-9]{6,16}$/.test(str)
}
function valiComplex(str) {
  if (/^[A-Za-z0-9]{3,12}$/.test(str) || /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(str)) {
    return true
  } else return false
}
