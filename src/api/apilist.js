import {get, postBody,deleteApi,postUpload  } from '../request'
// import {get,getBlob, postParams, postBody,postBlob,postParamsBlob,postLogin,postUpload,deleteApi } from '../request'
// /gameSlideshow/insert
export const apiGameSlideshow = p => postBody('gameway-website/noLogin/gameSlideshow/insert', p); //新增轮播图
// 分享 图片
export const apiShareNoLogin = p => get('gameway-website/noLogin/game-content/share/new', p); //新增轮播图

// /gameSlideshow/delete
// 删除 轮播图
export const apiDeletegameSlideshow = p => deleteApi('gameway-website/noLogin/gameSlideshow/delete', p); 
// /gameSlideshow/list
// 轮播图列表
export const apiGetGameSlideshow = p => get('gameway-website/noLogin/gameSlideshow/list', p); 

// /game-info/insert  游戏资讯新增
export const apiInsertGameInfo = p => postBody('gameway-website/noLogin/game-info/insert', p);

// /game-info/list/orderByTime 游戏详情列表
export const apiGetGameInfoList = p => get('gameway-website/noLogin/game-info/list/orderByTime', p); 

///game-info/list/orderByHot 游戏详情列表
export const apiGetGameInfoListByHot = p => get('gameway-website/noLogin/game-info/list/orderByHot', p); 
// /game-info/detail  查看详情
export const apiGetGameInfoDetail = p => get('gameway-website/noLogin/game-info/detail', p); 

// 分类管理
// /game-content-type/list  获取所有内容分类
export const apiGameTypeList = p => get('/gameway-website/noLogin/game-content-type/list', p)

///game-info/list/orderBySevenDay   推荐的 详情列表
// export const apiGetGameInfoBySevenDay  = p => get('gameway-website/noLogin/game-content/list/orderBySevenDay', p); 
// /game-content-type/insert 新增

export const apiGameTypeInsert = p => postBody('/gameway-website/noLogin/game-content-type/insert', p)
///game-info/list/orderBySevenDay   推荐的 详情列表
export const apiGetGameInfoBySevenDay  = p => get('gameway-website/noLogin/game-content/list/orderBySevenDay', p); 

// /game-content-type/edit 编辑
export const apiGameTypeEdit = p => postBody('/gameway-website/noLogin/game-content-type/edit', p)
// game-content-type/delete 删除
export const apiGameTypeDelete = p => deleteApi('/gameway-website/noLogin/game-content-type/delete', p)

// listPage 列表
export const apiGameTypeListPage = p => get('/gameway-website/noLogin/game-content-type/listPage', p)

// /game-content/list/orderByTime

export const apiGameContentList = p => get('/gameway-website/noLogin/game-content/list/orderByTime', p)

// /game-content/list/orderByHot 游戏内容新闻 按热度倒序排列
export const apiGameContentOrderByHot = p => get('/gameway-website/noLogin/game-content/list/orderByHot', p)

// GET /game-content/detail 查看详情
export const apiGameContentDetail = p => get('/gameway-website/noLogin/game-content/detail', p)

// /game-info/detail
export const apiGameInfoDetail = p => get('/gameway-website/noLogin/game-info/detail', p)

export const apiPostFile = (p, d) => postUpload('/gameway-gamenews/file/upload', p, d) // 上传图片