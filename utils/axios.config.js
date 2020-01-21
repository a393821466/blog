import Qs from 'qs'
const serviceConfig = {
  url: '/',
  method: 'get',
  // transformRequest: [data => Qs.stringify(data)], // 发送请求之前对请求数据进行处理
  transformResponse: [data => Qs.parse(data)], // 返回数据之前的处理
  headers: {}, // 请求头部
  onDownloadProgress: p => {
    return 1 * (p.loaded / p.total)
  },
  params: {}, // `params` are the URL parameters to be sent with the request
  data: {}, // POST的PAYLOAD, 在使用axios.post(url, {}, config)时, 没有额外的参数也要用一个空对象, 否则会报错.
  processData: false,
  contentType: false,
  timeout: 30 * 1000,
  responseType: 'json',
  withCredentials: true
}

export default serviceConfig
