// import { login, logout, getInfo } from '@/api/apilist'
import Cookies from 'js-cookie'
const calendar = {
  state: {
    calendarDate: '',
    calendarId:''
  },

  mutations: {
    setCalendarDate(state,calendarDate){//设置邮件
      state.calendarDate = calendarDate
      Cookies.set('calendarDate', calendarDate, { expires: 1 })
    },
    removeCalendarDate(state, calendarDate) {
      state.calendarDate = null
      Cookies.remove('calendarDate', null)
    },
    setCalendarId(state,calendarId){//设置邮件
      state.calendarId = calendarId
      Cookies.set('calendarId', calendarId, { expires: 1 })
    },
    removeCalendarId(state, calendarId) {
      state.calendarId = null
      Cookies.remove('calendarId', null)
    }

  }
}

export default calendar
