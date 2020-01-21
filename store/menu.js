/* eslint-disable no-unused-vars */
import axios from 'axios'
// import Qs from 'qs'
import address from '../utils/address.config'
import { setSession } from '@/utils/storage'
// Store state
export const state = () => ({
  menuList: []
})

// STORE ACTION
export const actions = {
  // ADDMENU
  async get({ commit }) {
    let ret = await axios.get(address.menu.get)
    if (ret.status) {
      commit('GET_MENULIST', ret.value)
    }
    return ret
  }
}

// STORE MUTATION
export const mutations = {
  GET_MENULIST(state, val) {
    if (val.length > 0) {
      let fileMenu = val.filter(item => {
        return item.subMenu == 'menu'
      })
      let das = [
        {
          id: 0,
          subMenu: '全部选有'
        }
      ]
      if (fileMenu.length && fileMenu[0].children) {
        das = das.concat(fileMenu[0].children)
        state.menuList = das
      }
    }
  }
}

// STORE GETTERS
export const getters = {
  menuList: state => state.menuList
}
