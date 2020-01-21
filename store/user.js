import axios from 'axios'
import Qs from 'qs'
import address from '../utils/address.config'
// import { setSession } from '@/utils/storage'
// Store state
export const state = () => ({
  userInfo: {}
})

// STORE ACTION
export const actions = {
  // USERINFO
  async userInfos({ commit }, value) {
    const val = Qs.stringify(value)
    let ret = await axios.get(`${address.user.userInfo}?${val}`)
    if (ret.status) {
      commit('GET_USERINFO', ret)
    }
    return ret
  }
}

// STORE MUTATION
export const mutations = {
  // USERINFO
  GET_USERINFO(state, value) {
    state.userInfo = value
  }
}

// STORE GETTERS
export const getters = {
  userInfo: state => state.userInfo
}
