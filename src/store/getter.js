import Cookies from 'js-cookie'
const getters = {
  getWebSiteData:(state, getters) => state.tagsView.webSite ? state.tagsView.webSite:Cookies.get('webSite'),
  getSendEmail:(state, getters) => state.user.sendEmail ,//是否订阅日历
  getCalendarDate:(state, getters) => state.calendar.calendarDate ,//日历日期
  getCalendarId:(state, getters) => state.calendar.calendarId ,//日历 id
  getFormVisible:(state, getters) => state.tagsView.formVisible ,//sign  弹窗
  getMsgVisible:(state, getters) => state.tagsView.msgVisible ,//message 列表
  getScrollId:(state, getters) => state.tagsView.scrollId ? state.tagsView.scrollId:Cookies.get('scrollId'),//滚动id
  getInsertScrollId:(state, getters) => state.tagsView.insertScrollId,//新增滚动id
  getCommentNum:(state, getters) => state.tagsView.commentNum?  state.tagsView.commentNum:Cookies.get('commentNum'),//未读消息条数
  getToken: state => state.user.token,
  userInfoList: state => state.user.userInfoList, 
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters,
  // routers: state => state.permission.routers
}
export default getters