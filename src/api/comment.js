import {get, postBody } from '../request'
// 评论接口
// localhost:8004/gameway-website/login/game-comments/insert
export const apiGameCommentsInsert = p => postBody('gameway-website/login/game-comments/insert', p); 

// 删除评论  传一个评论id
// localhost:8004/gameway-website/login/game-comments/delete?id=2  删除评论
export const apiGameCommentsDelete = p => get('gameway-website/login/game-comments/delete', p); 

// WS方式获取评论区前五条评论： /1是游戏id
// ws://localhost:8004/gameway-website/login/gameWayWebsiteWebSocket/1

// http方式获取评论区评论（分页） 传游戏id 和分页参数即可，用在点more的时候。
// gameway-website/login/game-comments/getGameComments
// localhost:8004/gameway-website/login/game-comments/getGameComments?gameId=1&current=0&size=3
export const apiGameCommentsList = p => get('gameway-website/noLogin/game-comments/getGameComments', p); 
//  是否已读
// gameway-website/login/game-comments/updateReadStatus?id=5
export const apiGameCommentsReadStatus = p => get('gameway-website/login/game-comments/updateReadStatus', p); 