import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/TokenAuth/Authenticate',
    method: 'post',
    data
  })
}

export function regist(data, str) {
  if (str === 'inside') {
    return request({
      url: '/api/services/app/User/Create',
      method: 'post',
      data
    })
  } else {
    return request({
      url: '/api/services/app/Account/Register',
      method: 'post',
      data
    })
  }
}

export function updateRole(data) {
  return request({
    url: '/api/services/app/Role/Update',
    method: 'put',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/api/services/app/User/Update',
    method: 'put',
    data
  })
}

export function resetPassword(data) {
  return request({
    url: '/api/services/app/User/ChangePassword',
    method: 'post',
    data
  })
}

export function getInfo(id) {
  return request({
    url: '/api/services/app/User/Get',
    method: 'get',
    params: { id }
  })
}

export function getRoles() {
  return request({
    url: '/api/services/app/Role/GetRoles',
    method: 'get',
  })
}

export function getNums() {
  return request({
    url: '/api/services/app/User/GetAll',
    method: 'get',
  })
}

export function getPermissions() {
  return request({
    url: '/api/services/app/Role/GetAllPermissions',
    method: 'get',
  })
}

export function getTenants() {
  return request({
    url: '/api/services/app/Tenant/GetAll',
    method: 'get',
  })
}

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }

export function deleteTenant(id) {
  return request({
    url: '/api/services/app/Tenant/Delete',
    method: 'delete',
    params: { Id: id }
  })
}

export function deleteRole(id) {
  return request({
    url: '/api/services/app/Role/Delete',
    method: 'delete',
    params: { id }
  })
}

export function deleteUser(id) {
  return request({
    url: '/api/services/app/User/Delete',
    method: 'delete',
    params: { id }
  })
}

export function creatTenant(info) {
  return request({
    url: '/api/services/app/Tenant/Create',
    method: 'post',
    data: info,
  })
}

export function createRole(info) {
  return request({
    url: '/api/services/app/Role/Create',
    method: 'post',
    data: info,
  })
}
