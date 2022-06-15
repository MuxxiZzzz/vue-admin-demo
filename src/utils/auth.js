import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const IdkenKey = 'vue_admin_template_id'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getId() {
  return Cookies.get(IdkenKey)
}

export function setId(id) {
  return Cookies.set(IdkenKey, id)
}

export function removeId() {
  return Cookies.remove(IdkenKey)
}
