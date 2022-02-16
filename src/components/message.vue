<template>
    <div class="message"  >
        <div
        v-for="(itme,i) in gameComments"
        :key="itme.id"
        @click="goUrl('/gameDetail',itme.gameId,'message-Gameway',itme)"
        >
          <div   class="activityMsgClose"  v-if=" getScrollId != itme.id"> 
            <div class="act-image-wrapper" >
                <div class="imgScaleBox">
                    <!-- class="imgScale" -->
                <img
                    :src="itme.imageUrl ?  itme.imageUrl+'?x-oss-process=image/auto-orient,1/quality,q_70/format,webp':'https://slideshow-photo.oss-ap-southeast-1.aliyuncs.com/gameslideshow/20220121/2d149bcfa741499e9cfb82d320e0e493.png?x-oss-process=image/auto-orient,1/quality,q_70/format,webp' "
                />
                </div>
            
            </div>
            <div class="act-wrap-box">
                <div class="act-head">
                    <span class="name">{{ itme.username }}</span>
                    <span class="toast">{{ 'Replied to my comment'}}</span>
                </div>
                <div class="act-detail">{{ itme.commentsContent ? itme.commentsContent : 'gameway hello' }}</div>
                <div class="time">{{ itme.timeInfo ? itme.timeInfo : '1 minute ago' }}</div>
            </div>
          </div>
       
        </div>
        <div class="more" v-if="gameComments.length == 0">No notification</div>
        <div class="modelGame" @click="closeMsg"></div>
    </div>
</template>
<script>
import { apiGameCommentsReadStatus } from "@/api/comment";
import { mapMutations,mapGetters } from 'vuex'
export default {
  name: "message",
  props:{
    getMsgVisibleFlag:{
        type: Boolean,
        default: () => false,
    },
    commentsList: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
        gameConetntList: [], // 内容
        msgData:{}, //消息列表
        gameComments:[],
        noReadCount: null //未读消息数
      
    };
  },
  watch:{
    getCommentNum(newVal,oldVal){
      if ( newVal !=oldVal ){
        this.noReadCount = newVal;
      }
    },
    commentsList(newVal,oldVal){
    }
  },
  computed: {
    ...mapGetters(['getCommentNum','getScrollId']),
  },
  created(){
     this.gameComments = this.commentsList;
     this.noReadCount = this.getCommentNum
  },
  methods: {
    ...mapMutations([ "setScrollId","setMsgVisible","setCommentNum"]),
       // 获取数据列表
    async goUrl(to, gameDetailId, address,info) {
      try{
        let { isRead,id } = info;
        let res = await apiGameCommentsReadStatus({id,isRead:2})
        if ( res.code !=200 ) return
        this.setScrollId(id)
        this.setMsgVisible( !this.getMsgVisibleFlag)
        this.setCommentNum(this.noReadCount == 1? null: this.noReadCount -1 ) 
        this.$router.push({ path: to, query: { id:gameDetailId, address } });
      }catch(err){
          console.log( err)
      }
    },
    closeMsg(){
      this.setMsgVisible( !this.getMsgVisibleFlag)
    }
  }
};
</script>
<style lang="less">
.modelGame{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  z-index: 1;
  // background: #ccc;
  top: 0;
}
.message {
    position: absolute;
    background: #333333;
    box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.16);
    right: 3%;
    width: 300px;
    display: grid;
    grid-template-columns:100%;
    max-height: 360px;
    overflow-y: auto;
    padding: 11px 13px;
    border-radius: 8px;
    z-index: 2;
    box-sizing: border-box;
    // row-gap: 30px;
    .activityMsgClose {
        position: relative;
        z-index: 30;
       border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding:6px 0;
        display: grid;
        grid-template-columns: 52px 200px;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        &:hover{
          background: #4C4C50;
        }
        .act-image-wrapper {
            border-radius: 8px;
            margin-bottom: 0;
            width: 52px;
            height: 52px;
            .imgScaleBox {
                width: 52px;
                height: 52px;
                overflow: hidden;
                border-radius: 50%;
                img{
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
            }
        }
        .act-wrap-box {
            box-sizing: border-box;
            .act-head{
                text-align: left;
                span{
                    font-size: 16px;
                    color: #fff;
                }
                .toast{
                    color: #Acacac;
                    font-size: 12px;
                    margin-left: 13px;
                }
            }
            .act-title {
                color: #ffffff;
                font-size: 18px;
                line-height: 20px;
                height: 20px;
                margin-bottom: 6px;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: left;
                white-space: nowrap;
                text-align: left;
            }
            .act-detail {
                font-size: 14px;
                line-height: 24px;
                color: #e8e8e8;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-align: left;
            }
            .time{
                font-size: 12px;
                line-height: 24px;
                color: #acacac;
                text-align: left;
            }
        }
    }
    .more{
        font-size: 16px;
        text-align: center;
        padding: 10px 0 6px;
        position: relative;
        z-index: 30;
        color: #acacac;
        cursor: pointer;
        &:hover{
          background: #4C4C50;
        }
    }
}
@media screen  and (min-width: 1300px) {
  .message{
    right: 10%;
  }
}
</style>