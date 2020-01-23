/* eslint-disable no-unused-vars */
import axios from 'axios'
import Qs from 'qs'
import address from '../utils/address.config'
import { setSession } from '@/utils/storage'
// Store state
export const state = () => ({
  menuList: [],
  allMenu: [],
  moduleMenu: []
})

// STORE ACTION
export const actions = {
  // ADDMENU
  async add({ commit }, value) {
    let ret = await axios.post(address.menu.add, value)
    return ret
  },
  // GETMENU
  async get({ commit }) {
    let ret = await axios.get(address.menu.get)
    if (ret.status) {
      commit('GET_MENULIST', ret.value)
    }
    return ret
  },
  // UPDATE
  async update({ commit }, value) {
    let ret = await axios.put(address.menu.update, value)
    return ret
  },
  // DELETE
  async del({ commit }, value) {
    let val = Qs.stringify(value)
    let ret = await axios.delete(`${address.menu.del}?${val}`)
    return ret
  },
  // GETMENUID
  async getIsMenu({ commit }) {
    let ret = await axios.get(address.menu.isMenu)
    if (ret.status) {
      commit('GET_ISMENU', ret.value)
    }
    return ret
  },
  // LIKEMENU
  async likeGet({ commit }, value) {
    let val = Qs.stringify(value)
    let ret = await axios.get(`${address.menu.like}?${val}`)
    if (ret.status) {
      commit('GET_ALLMENULIST', ret.value)
    }
    return ret
  }
}

// STORE MUTATION
export const mutations = {
  // FILEMENU
  GET_MENULIST(state, val) {
    if (val.length > 0) {
      let fileMenu = val.filter(item => {
        return item.isMenu == 1
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
  },
  // GETMODULEMENU
  GET_ISMENU(state, val) {
    let das = [
      {
        id: 0,
        masterMenu: '顶级模块'
      }
    ]
    das = das.concat(val)
    state.moduleMenu = das
  },
  // GETALLMENU
  GET_ALLMENULIST(state, val) {
    state.allMenu = val
  }
}

// STORE GETTERS
export const getters = {
  menuList: state => state.menuList,
  allMenu: state => state.allMenu,
  moduleMenu: state => state.moduleMenu
}
