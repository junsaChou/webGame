import {get, postBody } from '../request'

// /noLogin/game-calendar/getCalendarDetail 获取游戏日历详细信息 包括游戏
export const apiGetCalendarDetail = p => get('gameway-website/noLogin/game-calendar/getCalendarDetail', p); 

// /noLogin/game-calendar/getMonthEventByDay 获取当天日历信息
export const apiGetMonthEventByDay = p => get('gameway-website/noLogin/game-calendar/getMonthEventByDay', p); 

// /noLogin/game-calendar/getMonthEventByYearMonth 获取当月日历信息 传参格式 2021-11 2021-12
export const apiGetMonthEventByYearMonth = p => get('gameway-website/noLogin/game-calendar/getMonthEventByYearMonth', p); 
// /login/game-calendar/isSendToUser 给用户设置是否邮件提醒日历 , isSend 1是 0否
export const apiCalendarSendToUser = p => get('gameway-website/login/game-calendar/isSendToUser', p); 
