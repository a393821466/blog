import * as axios from 'axios'
import { getNotSession, clearALLsession } from '../utils/storage'

// eslint-disable-next-line no-unused-vars
export default ({ store, redirect }) => {
  if (process.SERVER_BUILD) {
    axios.defaults.baseURL = `http://${process.env.HOST ||
      'localhost'}:${process.env.PORT || 3000}`
  }
  // interceptors request
  axios.interceptors.request.use(
    config => {
      if (store.state.token !== '' || getNotSession('token')) {
        const token = !store.state.token
          ? getNotSession('token')
          : store.state.token
        config.headers['Authorization'] = token // 让每个请求携带自定义token 请根据实际情况自行修改
      }
      return config
    },
    err => {
      return Promise.reject(err)
    }
  )

  axios.interceptors.response.use(
    response => {
      const ret = response.data
      if (ret.code === 401) {
        clearALLsession()
        redirect('/logsin')
      }
      return ret
    },
    function(error) {
      let res = error.response.data
      if (res.code === 401) {
        clearALLsession()
        redirect('/logsin')
      }
      const data = '系统繁忙,请稍后再试'
      const errors = !res ? data : res.msg
      return Promise.reject(errors)
    }
  )
}
