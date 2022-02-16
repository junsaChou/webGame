// import { login, logout, getInfo } from '@/api/apilist'
import Cookies from 'js-cookie'
import { getToken, getUserInfo } from '@/utils/cookie'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    sendEmail: Cookies.get('sendEmail') ? Cookies.get('sendEmail') : 0,
    roles: [],
    userInfoList: getUserInfo() // 路由信息
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    setSendEmail(state,sendEmail){//设置邮件
      state.sendEmail = sendEmail
      Cookies.set('sendEmail', sendEmail, { expires: 1 })
    },
    setToken(state, token) {
      state.token = token
      Cookies.set('WebToken', token, { expires: 1 })
    },
    removeSendEmial(state, sendEmail) {
      state.sendEmail = null
      Cookies.remove('sendEmail', null)
    },
    removeToken(state, token) {
      state.token = null
      Cookies.remove('WebToken', token)
    },
    getToken() {
      return Cookies.get('WebToken')
      // Cookies.remove('token', token)
    },
    setUserInfo(state, userInfoList) {
      state.userInfoList = userInfoList
      Cookies.set('webUserInfoList', userInfoList, { expires: 1 })
    },
    setUserInfoData(state, userInfoData) {
      state.userInfoData = userInfoData
      Cookies.set('userInfoData', JSON.stringify(userInfoData), { expires: 1 })
    },
    getUserInfo() {
      return Cookies.get('webUserInfoList')
      // Cookies.remove('token', token)
    },
    getUserInfoData() {
      return Cookies.get('userInfoData')
      // Cookies.remove('token', token)
    },
    removeUserInfoData(state, userInfoData) {
      state.userInfoData = null
      Cookies.remove('userInfoData', userInfoData)
    },
    removeUserInfo(state, userInfoList) {
      state.userInfoList = null
      Cookies.remove('webUserInfoList', userInfoList)
    }
  }
}

export default user
