import {get, postBody,deleteApi,postLogin } from '../request'
// 人机验证 gameway-security/kaptcha
export const apiSecurity = p => get('gameway-security/kaptcha', p); 

// 注册
export const apiRegister = p => postBody('gameway-website/noLogin/sysUser/userRegister', p); 

//发送邮件 
export const apiSendEmail = p => get('gameway-website/noLogin/email/sendEmail',p);
// 用户点赞或者取消点赞：
// http://localhost:8004/gameway-website/noLogin/game-content/click?gameContentId=1&userId=2&like=1
export const apiClickId = p => get('gameway-website/login/game-content/click',p);
// 用户是否点击
// http://localhost:8004/gameway-website/noLogin/game-content/detail?id=1&webSite=1&userId=1
export const apiClickDetail = p => get('gameway-website/noLogin/game-info/detail',p);
// 修改密码 找回密码
export const apiResetPwd = p => postBody('gameway-website/noLogin/sysUser/websiteUserResetPwd', p); 

export const apiLogin = p => postLogin('/gameway-security/login', p) // POST backstageUser/login 用户登录

// 用户退出
export const apiLogoutn= p => get('/gameway-security/logout', p) // POST backstageUser/login 用户登录

// gameway-website/noLogin/feignCoingecko/getCoinDetail?coin=zoc
export const apiGetCoinDetail = p => get('gameway-website/noLogin/feignCoingecko/getCoinDetail',p);