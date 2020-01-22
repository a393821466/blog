/* eslint-disable no-unused-vars */
import axios from 'axios'
import Qs from 'qs'
import address from '../utils/address.config'
// import { setSession } from '@/utils/storage'
// Store state
export const state = () => ({
  articleList: {}
})

// STORE ACTION
export const actions = {
  // ADDARTICLE
  async add({ commit }, value) {
    let ret = await axios.post(address.article.add, value)
    return ret
  },
  // GETARTICLE
  async get({ commit }, value) {
    const val = Qs.stringify(value)
    let ret = await axios.get(`${address.article.get}?${val}`)
    if (ret.status) {
      commit('GET_ARTICLE', ret.value)
    }
    return ret
  },
  // UPDATEARTICLE
  async updates({ commit }, value) {
    let ret = await axios.put(address.article.update, value)
    return ret
  },
  // DELETEARTICLE
  async del({ commit }, value) {
    const val = Qs.stringify(value)
    let ret = await axios.delete(`${address.article.del}?${val}`)
    return ret
  },
  // UPLOADIMG
  async uploadImg({ commit }, value) {
    let ret = await axios.post(address.upload.content, value)
    return ret
  }
}

// STORE MUTATION
export const mutations = {
  GET_ARTICLE(state, value) {
    state.articleList = value
  }
}

// STORE GETTERS
export const getters = {
  articleList: state => state.articleList
}
