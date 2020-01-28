import axios from 'axios'
import Qs from 'qs'
import address from '../utils/address.config'
// import { setSession } from '@/utils/storage'
// Store state
export const state = () => ({
  commentList: {}
})

// STORE ACTION
export const actions = {
  // GETCOMMENT
  async getComment({ commit }, value) {
    const val = Qs.stringify(value)
    let ret = await axios.get(`${address.comment.getComment}?${val}`)
    commit('GET_COMMENT', ret)
    return ret
  },
  // UPDATECOMMENT
  /* eslint-disable no-unused-vars */
  async updateComment({ commit }, value) {
    let ret = await axios.put(address.comment.updateComment, value)
    return ret
  },
  // DELCOMMENT
  async delComment({ commit }, value) {
    const val = Qs.stringify(value)
    let ret = await axios.delete(`${address.comment.delComment}?${val}`)
    return ret
  }
}

// STORE MUTATION
export const mutations = {
  // USERINFO
  GET_COMMENT(state, value) {
    state.commentList = value
  }
}

// STORE GETTERS
export const getters = {
  commentList: state => state.commentList
}
