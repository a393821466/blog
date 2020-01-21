import axios from 'axios'
import address from '../utils/address.config'
import { setSession } from '@/utils/storage'
// Store state
export const state = () => ({
  captchaCode: '',
  token: ''
})

// STORE ACTION
export const actions = {
  // CODE ACTION
  async verificaCode({ commit }) {
    let ret = await axios.get(address.common.verify)
    if (ret.status) {
      commit('GET_VERIFCACODE', ret.value)
    }
    return ret
  },
  // LOGIN ACTION
  async login({ commit }, value) {
    let ret = await axios.post(address.common.login, value)
    if (ret.status) {
      commit('GET_USERINFO', ret)
    }
    return ret
  },
  // LOGOUT ACTION
  // eslint-disable-next-line no-unused-vars
  async logout({ commit }) {
    let ret = await axios.delete(address.common.logout)
    return ret
  }
}

// STORE MUTATION
export const mutations = {
  // CODE MUTATION
  GET_VERIFCACODE(state, value) {
    state.captchaCode = value
  },
  // LOGIN MUTATION
  GET_USERINFO(state, das) {
    state.token = das.token
    setSession('token', das.token)
    setSession('userInfo', das.value)
  }
}

// STORE GETTERS
export const getters = {
  captchaCode: state => state.captchaCode,
  token: state => state.token
}
