import { login, getInfo, regist, resetPassword, getRoles, getNums, getPermissions, getTenants, deleteTenant, creatTenant, deleteRole, updateRole, createRole, deleteUser, updateUser } from '@/api/user'
import { setToken, removeToken, setId, getId, removeId } from '@/utils/auth'
import { resetRouter } from '@/router'
import { Message } from 'element-ui'

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { complex, password } = userInfo
    // console.log({ complex, password })
    return new Promise((resolve, reject) => {
      login({ userNameOrEmailAddress: complex.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.result.accessToken)
        setId(data.result.userId)
        setToken(data.result.accessToken)
        resolve()
      }).catch(error => {
        const mesgNull = {
          message: error.response.data.error.message,
          type: 'error',
          dangerouslyUseHTMLString: true,
        }
        const mesg = {
          message: error.response.data.error.message + '<br/><br/>' + error.response.data.error.details,
          type: 'error',
          dangerouslyUseHTMLString: true,
        }
        if (error.response.data.error.details == null) {
          // console.log(mesgNull)
          Message(mesgNull)
        } else {
          // console.log(mesg)
          Message(mesg)
        }
        reject(error)
      })
    })
  },
  regist({ commit }, info) {
    return new Promise((resolve, reject) => {
      regist(info).then(response => {
        const { data } = response
        if (data.success) {
          Message({
            message: '注册成功',
            type: 'success'
          })
        }
        resolve()
      }).catch(error => {
        const mesgNull = {
          message: error.response.data.error.message,
          type: 'error',
          dangerouslyUseHTMLString: true,
        }
        const mesg = {
          message: error.response.data.error.message + '<br/><br/>' + error.response.data.error.details,
          type: 'error',
          dangerouslyUseHTMLString: true,
        }
        if (error.response.data.error.details == null) {
          Message(mesgNull)
        } else {
          Message(mesg)
        }
        reject(error)
      })
    })
  },
  updateRole({ commit }, info) {
    return new Promise((resolve, reject) => {
      updateRole(info).then(response => {
        resolve(response)
      }).catch(error => {
        const mesgNull = {
          message: error.response.data.error.message,
          type: 'error',
          dangerouslyUseHTMLString: true,
        }
        const mesg = {
          message: error.response.data.error.message + '<br/><br/>' + error.response.data.error.details,
          type: 'error',
          dangerouslyUseHTMLString: true,
        }
        if (error.response.data.error.details == null) {
          Message(mesgNull)
        } else {
          Message(mesg)
        }
        reject(error)
      })
    })
  },

  updateUser({ commit }, info) {
    return new Promise((resolve, reject) => {
      updateUser(info).then(response => {
        resolve(response)
      }).catch(error => {
        const mesgNull = {
          message: error.response.data.error.message,
          type: 'error',
          dangerouslyUseHTMLString: true,
        }
        const mesg = {
          message: error.response.data.error.message + '<br/><br/>' + error.response.data.error.details,
          type: 'error',
          dangerouslyUseHTMLString: true,
        }
        if (error.response.data.error.details == null) {
          Message(mesgNull)
        } else {
          Message(mesg)
        }
        reject(error)
      })
    })
  },

  resetPassword({ commit }, info) {
    return new Promise((resolve, reject) => {
      resetPassword(info).then(response => {
        resolve(response)
      }).catch(error => {
        const mesgNull = {
          message: error.response.data.error.message,
          type: 'error',
          dangerouslyUseHTMLString: true,
        }
        const mesg = {
          message: error.response.data.error.message + '<br/><br/>' + error.response.data.error.details,
          type: 'error',
          dangerouslyUseHTMLString: true,
        }
        if (error.response.data.error.details == null) {
          Message(mesgNull)
        } else {
          Message(mesg)
        }
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(getId()).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const name = data.result.name
        const avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        // const { name, avatar } = data.result

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        Message({
          message: '出错，请联系管理员',
          type: 'error'
        })
        reject(error)
      })
    })
  },
  // get roles
  getRoles({ commit, state }) {
    // console.log(state.token)  有token
    return new Promise((resolve, reject) => {
      getRoles(state.id).then(response => {
        const data = response.data.result.items
        commit('SET_ROLES', data)
        resolve(data)
      }).catch(error => {
        Message({
          message: '获取权限信息失败',
          type: 'error',
        })
        commit('SET_ROLES', [{ displayName: '获取错误', name: '' }])
        reject(error)
      })
    })
  },

  getNums({ commit, state }) {
    // console.log(state.token)  有token
    return new Promise((resolve, reject) => {
      getNums(state.id).then(response => {
        const data = response.data.result.items
        commit('SET_USERS', data)
        resolve(data)
      }).catch(error => {
        Message({
          message: '获取权限信息失败',
          type: 'error',
        })
        commit('SET_USERS', [{ userName: '获取错误', id: '' }])
        reject(error)
      })
    })
  },

  getPermissions({ commit, state }) {
    // console.log(state.token)  有token
    return new Promise((resolve, reject) => {
      getPermissions(state.id).then(response => {
        const data = response.data.result.items
        commit('SET_PERMISSIONS', data)
        resolve(data)
      }).catch(error => {
        Message({
          message: '获取权限信息失败',
          type: 'error',
        })
        commit('SET_PERMISSIONS', [{ displayName: '获取错误', name: '' }])
        reject(error)
      })
    })
  },

  getTenants({ commit, state }) {
    // console.log(state.token)  有token
    return new Promise((resolve, reject) => {
      getTenants(state.id).then(response => {
        const data = response.data.result.items
        commit('SET_TENANTS', data)
        resolve(data)
      }).catch((error) => {
        Message({
          message: '获取租户信息失败',
          type: 'error',
        })
        commit('SET_TENANTS', [{ tenancyName: '获取错误', name: '' }])
        reject(error)
      })
    })
  },

  creatTenant({ commit }, info) {
    return new Promise((resolve, reject) => {
      creatTenant(info).then(response => {
        const { data } = response
        if (data.success) {
          Message({
            message: '创建成功',
            type: 'success'
          })
        }
        resolve()
      }).catch(error => {
        const mesgNull = {
          message: error.response.data.error.message,
          type: 'error',
          dangerouslyUseHTMLString: true,
        }
        const mesg = {
          message: error.response.data.error.message + '<br/><br/>' + error.response.data.error.details,
          type: 'error',
          dangerouslyUseHTMLString: true,
        }
        if (error.response.data.error.details == null) {
          Message(mesgNull)
        } else {
          Message(mesg)
        }
        reject(error)
      })
    })
  },
  createRole({ commit }, info) {
    return new Promise((resolve, reject) => {
      createRole(info).then(response => {
        resolve(response)
      }).catch(error => {
        const mesgNull = {
          message: error.response.data.error.message,
          type: 'error',
          dangerouslyUseHTMLString: true,
        }
        const mesg = {
          message: error.response.data.error.message + '<br/><br/>' + error.response.data.error.details,
          type: 'error',
          dangerouslyUseHTMLString: true,
        }
        if (error.response.data.error.details == null) {
          Message(mesgNull)
        } else {
          Message(mesg)
        }
        reject(error)
      })
    })
  },

  deleteTenant({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      deleteTenant(id).then(response => {
        resolve(response)
      }).catch(error => {
        const mesgNull = {
          message: error.response.data.error.message,
          type: 'error',
          dangerouslyUseHTMLString: true,
        }
        const mesg = {
          message: error.response.data.error.message + '<br/><br/>' + error.response.data.error.details,
          type: 'error',
          dangerouslyUseHTMLString: true,
        }
        if (error.response.data.error.details == null) {
          Message(mesgNull)
        } else {
          Message(mesg)
        }
        reject(error)
      })
    })
  },

  deleteUser({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      deleteUser(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  deleteRole({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      deleteRole(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      removeId()
      commit('REMOVE_TENANTID')
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token axios拦截器
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default actions
