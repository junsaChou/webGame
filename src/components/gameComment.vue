<template>
  <div id="gameComment">
    <!-- <div ref="header" class="change-role">
      <div class="change" @click="changeUser">
        切换角色
      </div>
      <div class="current-role">
        <img :src="currentUser.imageUrl" />
        <span>{{
          currentUser.username + (currentUser.author ? '（作者）' : '（游客）')
        }}</span>
      </div>
    </div> -->
    <div ref="comment" :style="wrapStyle" class="comment-wrap">
      <Comment
        v-model="data"
        :user="currentUser"
        :before-submit="submit"
        :before-like="like"
        :before-delete="deleteComment"
        :upload-img="uploadImg"
        :props="props"
        :tokenInfo ="gameUserInfo"  
        v-if="data"
      >
      </Comment>
    </div>
  </div>
</template>

<script>
import Comment from '@/components/Comment'
// 新增  删除  列表
import { apiGameCommentsInsert,apiGameCommentsDelete,apiGameCommentsList } from "@/api/comment";
import { mapGetters,mapMutations } from 'vuex'
import {  apiPostFile } from "@/api/apilist";
export default {
  name: 'gameComment',
  components: {
    Comment,
  },
  props: {
    gameId:{
        type: Number,
        default: () => 0,
    },
    gameUserInfo:{
        type: Object,
        default: () => { },
    },
  },
  data() {
    const users = [
      {
        username: 'Up&Up',
        imageUrl: require('@/assets/image/avatar1.jpg'),
        author: true,
        
      },
      {
        username: '我叫白云',
        imageUrl: require('@/assets/image/comment.png'),
      },
      {
        username: '我叫黑土',
        imageUrl: require('@/assets/image/avatar3.jpg'),
      },
      {
        username: 'NARUTO',
        imageUrl: require('@/assets/image/avatar2.jpg'),
        _id: 5
      },
    ]
    return {
      data: [],
      props: {
        id: '_id',
        commentsContent: 'commentsContent',
        imgSrc: 'imgSrc',
        children: 'childrenComments',
        likes: 'likes',
        reply: 'reply',
        userId: 'userId',
        createTime: 'createTime',
        user: 'visitor',
      },
      page:{
        current: 1,
        size: 200
      },
      // currentUser: users[0],
      currentUser: {},
      users,
      wrapStyle: '',
      // webscoket  协议
      websocketObj: null,
      wsHeartflag: false,
      reconnectTime: 0,
      websock: null
    }
  },
  computed:{
    ...mapGetters(['getScrollId']),
  },
  watch:{
    getScrollId(newVal,oldVal){
      if( newVal!=oldVal){
        this.postCommentList( this.gameId )
      }
     
    },
    gameId(newVal,oldVal){
      if( newVal != oldVal){
        this.postCommentList( newVal )
      }
    }
  },
  created() {
    this.postCommentList( this.gameId )
    let { username,imageUrl,uid } = this.gameUserInfo;
     this.currentUser = { username:username,imageUrl:imageUrl }
  },
  mounted() {
   
  },
  methods: {
    ...mapMutations([ "setInsertScrollId"]),
    async submit(newCommetn, parent, add) {
      let data = { gameId:this.gameId,commentsContent:newCommetn.commentsContent,parentId:parent? parent.commentsId :0,imgSrc:newCommetn.imgSrc}
      parent ? data.atUserId = newCommetn.userId  :''
      newCommetn.commentsId ?data.id = newCommetn.commentsId  :''
      let resList = await apiGameCommentsInsert(data );
      if ( resList.code ==200 ){
        // if ( resList.data == "" )
        let { createTime,id,imgSrc,timeInfo,createId,atUserId } = resList.data;
         this.postCommentList( this.gameId)
        this.setInsertScrollId(id)
        // newCommetn['timeInfo'] = timeInfo; 
        // newCommetn['commentsId'] = id; 
        // newCommetn['userId'] = createId; 
        // newCommetn['id'] = id; 
        // newCommetn['createTime'] = createTime; 
        // if( atUserId && newCommetn.reply ){
        //    newCommetn.reply.atUserId = atUserId; 
        // }
      }else if ( resList.code == 500 ){
          this.$message({
              type: 'warning',
              message: 'This message has been deleted'
          })
          return
      }
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ newCommetn, parent })
        }, 300)
      })
      add(Object.assign(res.newCommetn, { _id: new Date().getTime() }))

      // console.log('addComment: ', res)
    },
    async like(comment) {
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(comment)
        }, 0)
      })

      console.log('likeComment: ', res)
    },
    async uploadImg({ file, callback }) {
      // const res = await new Promise((resolve, reject) => {
      //   console.log(file)
      //   const reader = new FileReader()
      //   reader.readAsDataURL(file)
      //   reader.onload = () => {
      //     resolve(reader.result)
      //   }
      //   reader.onerror = () => {
      //     reject(reader.error)
      //   }
      // })
      const form = new FormData()
      form.append('file', file)
      const res = await apiPostFile(form, { type: 1 })
      // console.log( res.code == 200 )
      if ( res.code == 200 ){
          callback(res.data)
      }
          // .then(res => {
          //   if (res.code === 200) {
          //     c
          //   } else {
          //     this.handleError(res.data)
          //   }
          // })
          // .catch(error => {
          //   console.log(error)
          //   this.listLoading = false
          // })
      // callback(res.data)
      // console.log('uploadImg： ', res)
    },
    async deleteComment(comment, parent) {
        // let sendTitle = 'Do you want to delete it ?';
        // let confirmButtonText = 'Yes';
        // let cancelButtonText = 'No';
        // this.$confirm(sendTitle, '', {
        //   cancelButtonText: cancelButtonText,
        //   confirmButtonText: confirmButtonText,
        //   type: 'warning'
        // }).then(() => {
        //   console.log( '成功')
        // })
      const resData = await apiGameCommentsDelete({ id:comment.commentsId })
      if( resData.code != 200){
          this.$message({
              type: 'warning',
              message: resData.message
          })
        return false
      }
      // return
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ comment, parent })
        }, 300)
      })

      // console.log('deleteComment: ', res)
    },
    changeUser() {
      const users = this.users
      const index = users.findIndex((c) => c.username === this.currentUser.username)
      this.currentUser = users[index === users.length - 1 ? 0 : index + 1]
      this.$refs.comment.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
    },
    addData(times) {
      setTimeout(() => {
        this.data = new Array(times)
          .fill([
            {
              _id: 1,
              commentsContent: '梦芸\n近况如何\n算来已有十月未见你\n甚是思念',
              visitor: {
                username: '我叫白云',
                imageUrl: require('@/assets/image/comment.png'),
              },
              createTime: '2020.11.24',
              likes: 1,
              imgSrc:'https://slideshow-photo.oss-ap-southeast-1.aliyuncs.com/gameslideshow/20220111/e3e3be0fbe5140d3a28654975cc6d8d9.jpg?x-oss-process=image/auto-orient,1/quality,q_70/format,webp',
              childrenComments: [
                {
                  _id: 2,
                  commentsContent:
                    '此刻我能闻见漫天火药味道\n我随军藏身长江边一暗无天日的地窖底\n埋首台灯下写这些字却不知把心绪给寄向何地',
                  visitor: {
                    username: 'NARUTO',
                    imageUrl: require('@/assets/image/avatar2.jpg'),
                  },
                  createTime: '2020.11.25',
                },
                {
                  _id: 3,
                  commentsContent: '\n如磐石般坚毅',
                  visitor: {
                    username: '我叫黑土',
                    imageUrl: require('@/assets/image/avatar3.jpg'),
                  },
                  createTime: '2020.11.25',
                  reply: {
                    username: 'NARUTO',
                    imageUrl: require('@/assets/image/avatar2.jpg'),
                  },
                },
              ],
            },
            {
              _id: 4,
              commentsContent:
                '我想时光亦是用来磨的\n细细地磨慢慢地磨\n总能磨出些许墨香来',
              visitor: {
                username: '我叫黑土',
                imageUrl: require('@/assets/image/avatar3.jpg'),
              },
              createTime: '2020.12.5',
              childrenComments: [
                {
                  _id: 5,
                  commentsContent:
                    '即使我鼻子已不灵\n眼睛生出疾\n侥幸你的照片还能辨出依稀',
                  visitor: {
                    username: 'NARUTO',
                    imageUrl: require('@/assets/image/avatar2.jpg'),
                  },
                  createTime: '2020.12.6',
                },
              ],
            },
          ])
          .flat(Infinity)
          // console.log(this.data)
      }, 0)
    },
    postCommentList( gameId ){
      let data = {...this.page,gameId }
      apiGameCommentsList( data )
        .then(res => {
          if (res.code == 200 ){
            let { data } = res;
            // console.log(data)
            data  ? this.data = data : this.data = [];
            // this.formatDate(data)
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // formatDate(date){
    //     date.filter((item,i)=>{
    //       console.log(item)
    //     })
    // },
    initWebscoketComment(){
      // return false
	      if(typeof(WebSocket) === "undefined"){
	        alert("您的浏览器不支持WebSocket")
	        return false
        }
        // this.gameId = 1;
        let gameId = 1;
        //  this.webSocketObj = new WebSocket(
        //         "wss://"+newApi+"/websocket?sid="+userToken
        //     );
        // 192.168.103.59:8004/proxyapi/gameway-website/noLogin/gameCommentsWebSocket
        // const wsuri = `ws://192.168.103.59:8004/proxyapi/gameway-website/noLogin/gameCommentsWebSocket/${ gameId }` 
	      const wsuri = `ws://112.124.6.107/wss/${ gameId }` // websocket地址
	      this.websock = new WebSocket(wsuri)
	      this.websock.onopen = this.websocketonopen
	      this.websock.onmessage = this.websocketonmessage
	      this.websock.onerror = this.websocketonerror
	      this.websock.onclose = this.websocketclose
	    },
	    //链接成功
	    websocketonopen(){ 
	      // console.log('WebSocket链接成功')
	    },
	    //接收后端返回的数据
	    websocketonmessage(e){ 
        // console.log(e)
        if ( e.data.indexOf('{')!== -1  ){
          let dataJson = JSON.parse(e.data)
          if (dataJson.code == 200 ){
            let { data } = dataJson;
            data  ? this.data = data : this.data = [];
          }
            // 在这里使用后端返回的数据，对数据进行处理渲染
        }

	    },
	    //链接创建失败重连
	    websocketonerror(e){
	      console.log(`链接失败的信息：`, e)
	      this.initWebscoketComment() // 链接失败后尝试从新链接
	    },
	    //关闭链接
	    websocketclose(e){ 
	      console.log('断开链接',e)
	    }

  },
  // destroyed () {
  //       // 销毁监听
  //       this.websocketclose();
  //   }
}
</script>

<style lang="less">
// @mixin scroll-style(
//   $thumb: rgba(255, 255, 255, 0.6),
//   $track: rgba(255, 255, 255, 0)
// ) {
//   &::-webkit-scrollbar,
//   &::-webkit-scrollbar-thumb,
//   &::-webkit-scrollbar-track {
//     border: none;
//     box-shadow: none;
//   }
//   &::-webkit-scrollbar {
//     width: 4px;
//   }
//   &::-webkit-scrollbar-thumb {
//     border-radius: 2px;
//     background: $thumb;
//   }
//   &::-webkit-scrollbar-track {
//     background: $track;
//   }
// }
.scroll-style(
  @thumb: rgba(255, 255, 255, 0.6),
  @track: rgba(255, 255, 255, 0)
) {
  &::-webkit-scrollbar,
  &::-webkit-scrollbar-thumb,
  &::-webkit-scrollbar-track {
    border: none;
    box-shadow: none;
  }
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: $thumb;
  }
  &::-webkit-scrollbar-track {
    background: $track;
  }
}
// * {
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
// }

// html {
//   font-size: 14px;
// }

// html,
// body,
// #gameComment {
//   height: 100%;
// }

// @media screen and (min-width: 320px) {
//   html {
//     font-size: calc(14px + 4 * ((100vw - 320px) / (1200 - 320)));
//   }
// }

// @media screen and (min-width: 1200px) {
//   html {
//     font-size: 18px;
//   }
// }

.change-role {
  background: #1c2433;
  margin-top: 30px;
  color: #eee;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-content: center;
  .change {
    cursor: pointer;
    padding: 0.4rem;
    margin-right: 2rem;
    font-size: 0.9rem;
    border: 1px solid #e99210;
    border-radius: 5px;
    user-select: none;
    &:hover {
      opacity: 0.9;
    }
  }
  .current-role {
    min-width: 15rem;
    color: #e99210;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #e99210;
    padding: 0 1rem;
    img {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.5rem;
      border: 1px solid #eee;
      border-radius: 50%;
    }
  }
}

.comment-wrap {
  // overflow: auto;
  @include scroll-style(#db8f1c, #b9b9b9);
}

// @media screen and (min-width: 760px) {
//   body {
//     margin: 0 10%;
//     border: 1px dashed #eee;
//   }
// }

@media screen and (max-width: 500px) {
  .change-role .current-role {
    min-width: 5rem;
    padding: 0 0.5rem;
  }
}
</style>
