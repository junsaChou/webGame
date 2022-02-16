<template>
  <div class="gw-sign-wrap"  >
    <!-- el-icon-message -->
    <el-badge :value="noReadCount"  :max="11" class="item" @click.native="openMsg">
       <i class="el-icon-message"></i>
    </el-badge>
    <el-dropdown  @command="handleCommand">
        <div class="avatar-box">
          <!-- :src="userIcon" -->
           <el-avatar size="small"  v-if="gameWayLogo&& gameWayLogo !=''"  :src="gameWayLogo" />
          <i class="el-icon-s-custom" v-else></i>
          <!-- <el-avatar size="small" src="el-icon-s-custom" /> -->
          <span class="signUp">{{ userName }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
     
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="Profile">Profile</el-dropdown-item>
          <el-dropdown-item command="SignOut">Sign Out</el-dropdown-item>
       
        </el-dropdown-menu>

    </el-dropdown>
    <div class="priceBox">
      <el-button disabled class="el-icon-s-finance"></el-button>
      <!-- <span class="btm">Coming soon</span> -->
    </div>
      </div>
</template>

<script>
import {  mapMutations,mapGetters } from 'vuex'
import { apiLogoutn } from  "@/api/sign";
import { getToken } from '@/utils/cookie'
// import Stomp from 'stompjs'
// import SockJS from 'sockjs-client'
// import store from '../../store'
export default {
  name: 'UserAvatar',
  props: {
    userName:{
        type: String,
        default: () => '',
    },
    gameWayLogo:{
        type: String,
        default: () => '',
    },
    getMsgVisibleFlag:{
        type: Boolean,
        default: () => false,
    },
  },
  data() {
    return {
      userInfo: {},
      userIcon:require('@/assets/img/avatar.png'),
      noReadCount: null
    }
  },
  computed: {
    ...mapGetters(['getCommentNum']),
  },
  watch:{
    getCommentNum(newVal,oldVal){
      // if ( newVal!=oldVal ){
        // this.noReadCount = newVal;
        this.getCommentNums( newVal )
      // }

    },
  },
  mounted(){
    this.getCommentNums(this.getCommentNum)
   
  },
  methods: {
    ...mapMutations(['removeToken','removeUserInfo','removeSendEmial','setMsgVisible']),
    openMsg(){//打开推送消息列表
      // console.log( this.noReadCount )
      // if (this.noReadCount ){
        this.setMsgVisible( !this.getMsgVisibleFlag)
      // }
    
    },
    getCommentNums(val){
      val && val !='null' ?  this.noReadCount = val :  this.noReadCount = null;
    },
    handleCommand(command) {
      if (command === 'SignOut') {
        this.loginOut()
      }
      if( command === 'Profile' ){
        this.goUrl('/create')
      }
    },
    goUrl(to,isSign){
      // this.gwSignReg.formVisible = false;
      this.$router.push({path: to, query: {isSign}})
    },
    loginOut() {
      apiLogoutn()
        .then(res=>{
            if(res.code == 200){
                this.removeToken()
                this.removeUserInfo()
                this.removeSendEmial()
                this.setMsgVisible( !this.getMsgVisibleFlag)
                this.$message({
                    type: 'success',
                    message: 'Sign out successfully'
                })
                this.$router.push('/')
            }
      });
    },

  },
  mounted(){
    // this.initWebsocket()
  },
  destroyed(){

  }
}
</script>

<style lang="less">
  .el-badge{
    margin-right: 15px;
    .el-icon-message{
      font-size: 24px;
      color: #fff;
    }
  }
  .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
    color: #EE8A22!important;
  }
  .el-avatar{
    line-height: 26px;
    width: 26px;
    height: 26px;
    overflow: hidden;
    display: inline-block;
    box-sizing: border-box;
    // border: 2px solid #fff;
    img{
        vertical-align:inherit!important;
        width: 100%;
    }
  }
  .gw-sign-wrap{
    display: flex;
    align-items: center;
    // height: 60px;
    cursor: pointer;
    .avatar-box{
        display: flex;
        align-items: center;
    }
    .signUp{
      padding-left: 6px;
      font-size: 16px;
      line-height: 17px;
      color: #fff;
      position: relative;
    }
  }
</style>
