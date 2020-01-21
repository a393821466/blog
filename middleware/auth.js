import { getNotSession } from '../utils/storage'
import { getCookiesInServer } from '../utils/getToken'
export default function({ route, req, redirect }) {
  let isClient = process.client
  let isServer = process.server
  let redirectURL = '/logsin'
  if (isServer) {
    let splitToken = getCookiesInServer(req)
    let path = req.originalUrl
    if (path.indexOf('admin') > -1 && !splitToken.token) {
      redirect(redirectURL)
    }
  }
  if (isClient) {
    let token = getNotSession('token')
    if (!token && route.path.indexOf('admin') > -1) {
      redirect(`${redirectURL}?ref=${encodeURIComponent(redirectURL)}`)
    }
  }
  // if (path) {
  //   redirectURL = '/login?ref=' + encodeURIComponent(path)
  // }
  // if (!token) {
  //   redirect(redirectURL)
  // }
}
