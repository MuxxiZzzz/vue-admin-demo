// import { login, logout, getInfo, regist, getRoles, getNums, getPermissions, getTenants, deleteTenant, creatTenant, deleteRole, updateRole, createRole, deleteUser, updateUser } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'
// import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import Vue from 'vue'
import actions from './actions'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    id: '',
    users: [],
    permissions: [],
    roles: [],
    tenants: [],
    TenantID: '',
  }
}

const state = getDefaultState()

const mutations = {
  REMOVE_TENANTID: (state) => {
    state.TenantID = undefined
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_TENANTS: (state, data) => {
    Vue.set(state, 'tenants', data)
  },
  SET_PERMISSIONS: (state, data) => {
    Vue.set(state, 'permissions', data)
  },
  SET_ROLES: (state, data) => {
    Vue.set(state, 'roles', data)
  },
  SET_USERS: (state, data) => {
    Vue.set(state, 'users', data)
  },
  SET_TENANTID: (state, data) => {
    Vue.set(state, 'TenantID', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

