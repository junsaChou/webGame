import Cookies from 'js-cookie'

const TokenKey = 'WebToken'
const UserInfoList = 'webUserInfoList'
const UserInfoData = 'userInfoData'
export function getToken() {
  return Cookies.get(TokenKey)
}
export function getUserInfo() {
  return Cookies.get(UserInfoList)
}
export function getUserInfoData() {
  return Cookies.get(UserInfoData)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function removeUserInfo() {
  return Cookies.remove('webUserInfoList')
}
export function removeUserInfoData() {
  return Cookies.remove('webUserInfoList')
}
export function  removeSendEmial() {

  Cookies.remove('sendEmail')
}