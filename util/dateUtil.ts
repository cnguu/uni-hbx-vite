/***********
 * 时间相关 *
 **********/
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import updateLocale from 'dayjs/plugin/updateLocale'
import utc from 'dayjs/plugin/utc'
import weekday from 'dayjs/plugin/weekday'
import 'dayjs/locale/zh-cn'
import { TimezoneEnum } from '@/enum/timezoneEnum.ts'

dayjs.extend(calendar)
dayjs.extend(quarterOfYear)
dayjs.extend(relativeTime)
dayjs.extend(timezone)
dayjs.extend(updateLocale)
dayjs.extend(utc)
dayjs.extend(weekday)

dayjs.locale('zh-cn')

dayjs.updateLocale('zh-cn', {
  calendar: {
    sameDay: 'HH:mm',
    nextDay: '[明天]',
    nextWeek: 'dddd',
    lastDay: '[昨天] HH:mm',
    lastWeek: 'dddd HH:mm',
    sameElse: 'YYYY年M月D日 HH:mm',
  },
  relativeTime: {
    future: '%s后',
    past: '%s前',
    s: '几秒',
    m: '1分钟',
    mm: '%d分钟',
    h: '1小时',
    hh: '%d小时',
    d: '1天',
    dd: '%d天',
    M: '1个月',
    MM: '%d个月',
    y: '1年',
    yy: '%d年',
  },
})

dayjs.tz.setDefault(TimezoneEnum.ASIA_SHANGHAI)

// 时间工具类
export const dateUtil = dayjs

export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const DATE_FORMAT = 'YYYY-MM-DD'
export const TIME_FORMAT = 'HH:mm'

/**
 * 格式化日期
 * @param _date 日期对象、时间戳或字符串
 * @param format 格式字符串
 * @returns 格式化后的日期字符串
 */
const _format = <T extends dayjs.ConfigType>(_date: T, format?: string): string | T => {
  const date = dateUtil.isDayjs(_date) ? _date : dateUtil(_date)
  return date.isValid() ? date.format(format) : _date
}

export const formatToDatetime = <T extends dayjs.ConfigType>(
  date: T,
  format: string = DATETIME_FORMAT,
): string | T => {
  return _format(date, format)
}

export const formatToDate = <T extends dayjs.ConfigType>(
  date: T,
  format: string = DATE_FORMAT,
): string | T => {
  return _format(date, format)
}

export const formatToTime = <T extends dayjs.ConfigType>(
  date: T,
  format = TIME_FORMAT,
): string | T => {
  return _format(date, format)
}

/**
 * 时间人性化显示
 * @param date 要格式化的日期
 * @param oppositeDate 参考日期，默认为当前时间
 * @returns 人性化的时间字符串
 */
export const humanizedDate = <T extends dayjs.ConfigType>(
  date: T,
  oppositeDate?: T,
): string | T => {
  if (!date || !dateUtil(date).isValid()) return ''
  const now = oppositeDate ? dateUtil(oppositeDate) : dateUtil()
  const diffSeconds = now.diff(date, 'second')
  const diffMinutes = now.diff(date, 'minute')
  const diffHours = now.diff(date, 'hour')
  const diffDays = now.diff(date, 'day')
  if (diffSeconds < 60) {
    return `${diffSeconds}秒前`
  } else if (diffMinutes < 60) {
    return `${diffMinutes}分钟前`
  } else if (diffHours < 24) {
    return `${diffHours}小时前`
  } else if (diffDays < 7) {
    return `${diffDays}天前`
  } else {
    return formatToDatetime(date)
  }
}

/**
 * 获取时辰问候语
 * @returns 根据当前时间返回相应的问候语
 */
export const getGreeting = (): string => {
  const currentHour = dateUtil().hour()
  if (currentHour >= 5 && currentHour < 12) {
    return '早上好'
  } else if (currentHour >= 12 && currentHour < 14) {
    return '中午好'
  } else if (currentHour >= 14 && currentHour < 18) {
    return '下午好'
  } else if (currentHour >= 18 && currentHour < 24) {
    return '晚上好'
  } else {
    return '深夜了'
  }
}

/**
 * 获取当天时间范围的人性化表示
 * @param startTime 开始时间
 * @param endTime 结束时间
 * @returns 人性化的时间范围表示
 */
export const getHumanizedTimeRange = (
  startTime: dayjs.ConfigType,
  endTime: dayjs.ConfigType,
): string[] => {
  const startDt = dayjs(startTime)
  const endDt = dayjs(endTime)

  // 开始和结束在同一天
  if (startDt.isSame(endDt, 'day')) {
    return [startDt.format('HH:mm'), endDt.format('HH:mm')]
  }

  const today = dateUtil()
  const todayStart = today.startOf('day')
  const startDate = startDt.startOf('day')
  const endDate = endDt.startOf('day')

  // 当天在时间范围内
  if (startDate <= todayStart && todayStart <= endDate) {
    return ['全天']
  }

  // 跨天
  return [startDt.format('YYYY-MM-DD HH:mm'), endDt.format('YYYY-MM-DD HH:mm')]
}
