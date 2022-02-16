import {get, postBody,deleteApi } from '../request'

// /login/sysUser/changUserInfo 官网用户修改信息
export const apiChangUserInfo = p => postBody('gameway-website/login/sysUser/changUserInfo', p); //新增轮播图

export const apiGetAuthorContent = p => get('gameway-website/login/game-content/getAuthorContent', p); //获取列表
// /login/game-content/insert 新增

export const apiWebGameInsert = p => postBody('gameway-website/login/game-content/insert', p);


// /login/game-content/edit 编辑
export const apiWebGamEedit = p => postBody('gameway-website/login/game-content/edit', p);

// /login/game-content/delete 删除
export const apiWebGamDelete = p => deleteApi('gameway-website/login/game-content/delete', p);

// /login/game-info/list 获取所有游戏
export const apiWebGameInfoList = p => get('gameway-website/login/game-info/list', p);


// /noLogin/sysUser/getAllCountry 获取所有国家
export const apiGetAllCountry = p => get('gameway-website/noLogin/sysUser/getAllCountry ', p);

// localhost:8004/gameway-website/noLogin/game-content-type/list 分类
export const apiGameContentTypeList = p => get('gameway-website/noLogin/game-content-type/list ', p);