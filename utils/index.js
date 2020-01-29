import * as dayjs from 'dayjs'

export function formartTime(t) {
  return dayjs(t).format('YYYY-MM-DD HH:mm:ss')
}

export function filterHtml(msg) {
  // eslint-disable-next-line no-redeclare
  var msg = msg.replace(/<\/?[^>]*>/g, '') // 去除html标签
  msg = msg.replace(/[|]*\n/, '') // 去除行尾空格
  msg = msg.replace(/&npsp;/gi, '') // 去掉npsp
  return msg
}
