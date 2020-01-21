import * as dayjs from 'dayjs'

export function formartTime(t) {
  return dayjs(t).format('YYYY-MM-DD HH:mm:ss')
}
