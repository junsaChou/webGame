<template>
  <div class="comment-item" :class="{ 'sub-comment-item': isSubComment }">
    <div class="comment">
      <!-- 评论或回复人头像 -->
      <img
        class="avatar"
        v-if="!comment.reply"
        :src="comment.user.imageUrl || logoImg"
        @error="(e) => e.target.classList.add('error')"
      >

      <div class="content-box"  >
        <!-- 评论或回复人具体信息 -->
        <!-- <div class="meta-box" :ref="`commentId-${comment.commentsId}`" :data-box="`commentId-${comment.commentsId}`">
          <slot name="userMeta">
            <div class="user-popover-box">
              <span v-if="comment.user">{{ comment.user.username + (comment.user.author === true ? '（作者）' : '') }}</span>
            </div>
          </slot>
        </div> -->

        <!-- 评论或回复内容 -->
        <div class="content">
          <div class="meta-box" :ref="`commentId-${comment.commentsId}`" :data-box="`commentId-${comment.commentsId}`">
            <!-- <slot name="userMeta"> -->
              <div class="user-popover-box">
                <span v-if="comment.user">{{ comment.user.username + (comment.user.author === true ? '（作者）' : '：') }}</span>
              </div>
            <!-- </slot> -->
          </div>
          <span
            v-if="comment.reply"
            class="reply"
          >@
            <span class="reply-target" :title="comment.reply.username">{{
              comment.reply.username + ''
            }}</span>
          </span>
          {{ comment.commentsContent }}
          <div v-if="comment.imgSrc" class="img-box">
            <!-- <img
              :src="comment.imgSrc+'?x-oss-process=image/auto-orient,1/quality,q_70/format,webp' || ''"
              @error="(e) => e.target.classList.add('error')"
            > -->
            <el-image
              :src="comment.imgSrc+'?x-oss-process=image/auto-orient,1/quality,q_70/format,webp' || ''"
              @error="(e) => e.target.classList.add('error')"
              fit="cover"
              :preview-src-list="[comment.imgSrc+'?x-oss-process=image/auto-orient,1/quality,q_70/format,webp']"
            />
          </div>
        </div>

        <!-- 评论或回复时间及操作 -->
        <div class="reply-stat">
            <!-- :title="formatTime(comment.createTime, true)"
            :datetime="comment.createTime" -->
          <time
   
          >{{ comment.timeInfo }}</time>
          <!-- {{ formatTime(comment.createTime) }} -->
           <!-- v-if="user.author === true"           -->
          <div
            v-if="user.username === comment.user.username"
            class="delete"
            @click.stop="$emit('comment-delete', { id, comment, parent })"
          >
            <span>·</span>Delete
          </div>
          <div class="action-box">
            <!-- <div
              class="like-action action"
              :class="{ active: comment._liked }"
              @click.stop="$emit('comment-like', { id, comment })"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                class="icon like-icon"
              >
                <g fill="none" fill-rule="evenodd">
                  <path d="M0 0h20v20H0z" />
                  <path
                    :stroke="comment._liked ? '#37C700' : '#8A93A0'"
                    stroke-linejoin="round"
                    :fill="comment._liked ? '#37c700' : 'none'"
                    d="M4.58 8.25V17h-1.4C2.53 17 2 16.382 2 15.624V9.735c0-.79.552-1.485 1.18-1.485h1.4zM11.322 2c1.011.019 1.614.833 1.823 1.235.382.735.392 1.946.13 2.724-.236.704-.785 1.629-.785 1.629h4.11c.434 0 .838.206 1.107.563.273.365.363.84.24 1.272l-1.86 6.513A1.425 1.425 0 0 1 14.724 17H6.645V7.898C8.502 7.51 9.643 4.59 9.852 3.249A1.47 1.47 0 0 1 11.322 2z"
                  />
                </g>
              </svg>
              <span v-show="comment.likes" class="action-title">{{
                comment.likes
              }}</span>
            </div> -->
            <div
              class="comment-action action"
              @mousedown.prevent="$emit('comment-reply', id)"
              @click.prevent
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                class="icon comment-icon"
              >
                <g fill="none" fill-rule="evenodd">
                  <path d="M0 0h20v20H0z" />
                  <path
                    stroke="#8A93A0"
                    stroke-linejoin="round"
                    d="M10 17c-4.142 0-7.5-2.91-7.5-6.5S5.858 4 10 4c4.142 0 7.5 2.91 7.5 6.5 0 1.416-.522 2.726-1.41 3.794-.129.156.41 3.206.41 3.206l-3.265-1.134c-.998.369-2.077.634-3.235.634z"
                  />
                </g>
              </svg>
              <span class="action-title">Reply</span>
            </div>
          </div>
        </div>

        <!-- 评论表单组件 -->
        <slot :id="id" />

        <!-- 回复列表 -->
        <slot name="subList" :parentId="id" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      default: () => {},
      required: true
    },
    id: {
      type: [String, Number],
      required: true
    },
    parent: {
      type: Object,
      default: () => {}
    },
    user: {
      type: Object,
      default: () => {}
    }
  },
  data(){
    return{
      logoImg: require("@/assets/img/avatar.png"),
    }
  },
  computed: {
    ...mapGetters(['getScrollId','getInsertScrollId','userInfoList']),
    isSubComment() {
      return this.id.split('-').length === 3
    }
  },
  watch:{
    getScrollId(newVal,oldVal){
      // console.log( newVal)
      this.scrollIntoViewDom( newVal )
    },
    getInsertScrollId(newVal,oldVal){
      // this.scrollIntoViewDom( newVal )
       if (newVal ){
          this.scrollIntoViewDom( newVal )
        }else if ( this.getScrollId ){
            this.scrollIntoViewDom( this.getScrollId )
        }
    },
    userInfoList( newVal,oldVal ){
      if ( newVal ){
           let { username } = JSON.parse(newVal)
        if ( newVal != oldVal){
          this.user.username = username
        }
      }
     
    }
  },
  created(){
  },
  mounted(){
    if ( this.getInsertScrollId ){
      this.scrollIntoViewDom( this.getInsertScrollId )
    }else if ( this.getScrollId ){
        this.scrollIntoViewDom( this.getScrollId )
    }
  },
  methods: {
    formatTime(time, local = false) {
      const d = new Date(time)

      if (local) {
        return d.toString()
      }

      const now = Date.now()
      const diff = (now - d) / 1000
      // return time
      if (diff < 30) {
        // return '刚刚'
        return diff + 'Seconds ago'
      } else if (diff < 3600) {
        return Math.ceil(diff / 60) + 'Minutes ago'//Minutesago 分钟前
      } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + 'Hours ago'//Hoursago 小时前
      } else if (diff < 3600 * 24 * 30) {
        return Math.floor(diff / 3600 / 24) + 'Day'
      } else if (diff < 3600 * 24 * 365) {
        return Math.floor(diff / 3600 / 24 / 30) + 'Month ago'
      } else {
        return Math.floor(diff / 3600 / 24 / 365) + 'Years ago'
      }
    },
    scrollIntoViewDom(ref) {
      this.$nextTick(()=>{
        let flagId = 'commentId-'+ref;
        if( Object.keys(this.$refs )[0] === flagId ){
          this.$refs[flagId].scrollIntoView(
              {
                behavior: 'smooth',
                block: 'center'
              }
          )
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.comment-list{
  >.comment-item{
    >.comment{
     .content-box:hover{
       .reply-stat .delete{
          display: block;
        }
       .sub-comment-list .delete{
           display: none;
         }
     }
    }
  }
}
.comment-item {
  background: #4C4C50;
  border-radius: 8px;
  padding: 10px 15px;
  // margin-bottom: 1.0664rem;
  &:not(:last-child) {
    .content-box {
      // border-bottom: 1px solid #f1f1f1;
    }
  }
  &:hover {
    .comment .reply-stat .delete {
      visibility: visible;
    }
  }

  .comment {
    display: flex;
    // &:hover  .reply-stat .delete{
    //   display: block!important;
    // }

    .content-box {
      margin-left: 0.6664rem;
      flex: 1 1 auto;
      // &:hover {
      //   .reply-stat > .delete {
      //     display: block;
      //   }
      // }
      &.focus {
        padding-bottom: 0.4rem;
      }
      .meta-box {
        display: inline-flex;
        align-items: center;
        font-size: 0.8664rem;
        line-height: 1.25;
        white-space: nowrap;
        .user-popover-box {
          color: #ECB639;
          cursor: pointer;
        }
      }
      .content {
        margin-top: 0.44rem;
        font-size: 0.8664rem;
        line-height: 1.4664rem;
        white-space: pre-line;
        word-break: break-all;
        text-align: left;
        // color: #505050;
        color: #fff;
        overflow: hidden;
        .img-box {
          margin-top: 0.5rem;
          img {
            max-width: 100%;
            max-height: 20rem;
            object-fit: cover;
          }
          /deep/.el-image{
             img {
              max-width: 100%;
              max-height: 20rem;
              object-fit: cover;
            }
          }
        }
        .reply {
          vertical-align: top;
          color: #ECB639;
        }
        .reply-target {
          cursor: pointer;
          // color: #406599;
          color: #ECB639;
        }
      }
    }
    .reply-stat {
      display: flex;
      margin-top: 7px;
      font-weight: 400;
      // &:hover .delete{
      //   display: block;
      // }
      time,
      .delete {
        font-size: 0.8664rem;
        // color: #8a9aa9;
        color: #ACACAC;
      }
      .delete {
        display: none;
        visibility: hidden;
        cursor: pointer;
        span {
          margin: 0 0.2rem;
        }
      }
      .action-box {
        flex: 0 0 auto;
        display: flex;
        justify-content: space-between;
        margin-left: auto;
        min-width: 7.04rem;
        // color: #8a93a0;
         color: #ACACAC;
        user-select: none;
        .action {
          display: flex;
          align-items: center;
          margin-left: 0.4rem;
          cursor: pointer;
          // display: none;
          &:hover {
            opacity: 0.8;
          }
          &.active {
            color: #37c700;
          }
          .icon {
            min-width: 16.5px;
            min-height: 16.5px;
            width: 0.8rem;
            height: 0.8rem;
          }
          .action-title {
            margin-left: 0.2rem;
            font-size: 0.76rem;
          }
        }
      }
    }
  }
}

.sub-comment-list {
  margin: 0.8rem 0;
  padding: 0 0 0 0.8rem;
  border-left:1px solid rgba(255, 255, 255, 0.1) ;
  // background-color: #fafbfc;

  border-radius: 3px;
  .sub-comment-item{
      .reply-stat {
        .action-box{
           justify-content: center;
        }
      }
  }
  .comment-item {
    margin-bottom: 0;
    &:last-child .content-box {
      border-bottom: none;
    }
    .comment {
      position: relative;
      padding: 0;
      //  padding: 0.8rem 0 0;
      .content-box {
        margin-right: 0.8rem;
        justify-content: center;
        .action{
          // display: none;
          opacity: 0;
        }
        // padding-bottom: 0.8rem;
        &:hover .delete{
          display: block!important;
        }
        &:hover .action{
          // display: block;
          opacity: 1;
        }
        
      }
    }
  }
}
</style>
