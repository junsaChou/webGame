<template>
  <div class="banner_box" >
    <div class="gw-header con" :class="{ 'open': isActive }">
      <div class="gw-nv-section">
        <div class="burger" @click=" isActive=!isActive">
          <div class="burger-line1"></div>
          <div class="burger-line2"></div>
          <div class="burger-line3"></div>
        </div>
        <router-link to="/" class="logo">
          <img src="../../src/assets/img/gamewayLogoWeb.png" alt />
        </router-link>
        <ul class="list" >
          <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#1B1B1B"
            text-color="#fff"
            active-text-color="#fff"
          >
            <el-menu-item index="1">
              <router-link to="/" active-class="active" exact>Home</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link to="/gameContents">Contents</router-link>
            </el-menu-item>
            <!-- <el-menu-item index="3">
              <router-link to="/gameNews">Newsflash</router-link>
            </el-menu-item> -->
            <el-menu-item index="4">
              <router-link to="/gameList">Games</router-link>
            </el-menu-item>
            <el-menu-item index="5">
              <div class="gameSoon">
                <!-- <span>Guilds</span> -->
                <el-button disabled>Guilds</el-button>
                <!-- <span class="btm">Coming soon</span> -->
              </div>

              <!-- <router-link >Guild</router-link> -->
            </el-menu-item>
            <el-menu-item index="6">
               <div class="gameSoon">
                <el-button disabled>Tools</el-button>
              </div>
            </el-menu-item>
            <el-menu-item index="7">
               <div class="gameSoon">
                  <el-button disabled>Market</el-button>
              </div>
            </el-menu-item>
            <el-menu-item index="8">
              <router-link to="/about">About</router-link>
            </el-menu-item>
             <!-- <el-menu-item index="6">
              <router-link to="/create">create</router-link>
            </el-menu-item> -->
            <!-- <el-menu-item index="7">
              <router-link to="/create/contents">createContents</router-link>
            </el-menu-item> -->
          </el-menu>
        </ul>
 
      </div>
      
      <div class="gw-sign-wrap" v-if="!isToken">
        <div @click="setFormVisible(true)" >
            <i class="el-icon-s-custom"></i>
            <span>Sign In</span>
        </div>
          <div class="priceBox" >
            <el-button class="el-icon-s-finance" disabled></el-button>
            <!-- <span class="btm">Coming soon</span> -->
          </div>
      </div> 
      <userAvatar v-else :userName = userName :getMsgVisibleFlag ="getMsgVisible" :gameWayLogo= userInfo.imageUrl  ></userAvatar>
      <!-- <div class="gw-sign-wrap" v-else>
          <img :src="userIcon" alt="">
          <span class="signUp">{{ userName}} </span>
      </div>  -->
    </div>
    <el-dialog
      :title="gwSignReg.photoTitle"
      :visible.sync="getFormVisible"
      :close-on-click-modal="false"
      class="gw-dialog-form"
      :before-close="handleClose"
      append-to-body
    >
      <div slot="title" class="header-title">
        <img :src="dialogImg" alt="">
      </div>
      <signIn :authFlag="getFormVisible" ></signIn>
      <div class="gw-sign">
        <p @click="goUrl('/signIn','signUp')">Sign up for a new account</p>
        <p @click="goUrl('/signIn','find')">Forgot password?</p>
      </div>
    </el-dialog>
    <message  v-if="getMsgVisible" :commentsList = msgData  :getMsgVisibleFlag ="getMsgVisible"></message>
    
  </div>
</template>
<script>
import signIn from "./signIn";
import userAvatar from "./userAvatar";
import message from "./message";
import { mapGetters,mapMutations } from 'vuex'
import { getToken } from '@/utils/cookie'
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      isActive:false,
      gwSignReg:{
        photoTitle:'',
        formVisible:false
      },
      userIcon:require('@/assets/img/avatar.png'),
      isToken: false,
      userName:null,
      userInfo: {},
      dialogImg:require('@/assets/img/gamewayLogo.png'),
        // webscoket 协议
      websock: null,
      msgData: [] //消息列表 的数据
    };
  },
  components: { signIn,userAvatar,message },
  computed:{
    ...mapGetters(['getFormVisible','getToken','userInfoList','getMsgVisible','getCommentNum']),
  },
  methods: {
    ...mapMutations([ "setFormVisible","setCommentNum"]),
    handleClose() {
      this.setFormVisible(false)
    },
    handleSelect(key, keyPath) {
      this.isActive = false; 
      // console.log(key, keyPath);
    },
    goUrl(to,isSign){
      this.setFormVisible(false)
      this.$router.push({path: to, query: {isSign}})
    },
    watchUser(newVal){
      if( newVal!= undefined&&newVal!= null  ){
          let userInfo = JSON.parse( newVal )
          this.userInfo = userInfo;
          this.isToken =  true;
          this.userName = userInfo.username;
          this.initWebscoketComment();
      }
      else{
        this.isToken = false;
        this.userName = null;
      }
    },
    // webscoket
    initWebscoketComment(){
      // return false
	      if(typeof(WebSocket) === "undefined"){
          // alert("您的浏览器不支持WebSocket")
          this.$message({
            type: 'warning',
            message: 'Your browser does not currently support websockets'
          })
	        return false
        }
        let userId = this.userInfo.uid;
        let webscoketUrl;
        process.env.VUE_APP_MODE  == 'production' ? webscoketUrl = 'wss://gameway.fun/wss' : webscoketUrl= 'ws://112.124.6.107/wss';
        const wsuri = `${webscoketUrl}/${ userId }/${getToken()}` // websocket地址
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
      if ( e.data.indexOf('{')!== -1  ){
        let dataJson = JSON.parse(e.data)
        if (dataJson.code == 200 ){
          // console.log( dataJson)
          let { data } = dataJson;
          if ( data ){
            // console.log( data )
            // console.log(JSON.stringify(this.msgData).length,JSON.stringify(data.records).length )
             if( JSON.stringify(this.msgData).length != JSON.stringify(data.records).length){
                this.setCommentNum(data.total )
                data.records ? this.msgData = data.records : this.msgData = [] ;
              }
         
            // this.gameComments = data.gameComments;
            // this.setCommentNum(data.total )
          }else{
            this.msgData = []
            this.setCommentNum( null )
          }
           
        }
      }

    },
    //链接创建失败重连
    websocketonerror(e){
      // console.log(`链接失败的信息：`, e)
      this.initWebscoketComment() // 链接失败后尝试从新链接
    },
    //关闭链接
    websocketclose(e){ 
      // console.log('断开链接',e)
    }
  },
  destroyed(){
    this.websocketclose()
  },
  watch:{
    userInfoList:function(newVal,oldVal) {
     this.watchUser(newVal)
    },
    msgData(newVal,oldVal){
      // if( JSON.stringify(newVal).length != JSON.stringify(oldVal).length){
        this.msgData = newVal;
        // console.log( this.msgData )
      // }
    }
  },
  mounted(){
    this.watchUser(this.userInfoList)

  }
};
</script>
<style lang="less" scoped>
.banner_box {
  height: 80px;
  // background: #1b1b1b;
  background: linear-gradient( #000 0%, #3d3d41 100%)!important;
  padding: 0px 120 px;
  transition: all 0.25s ease-in-out;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-width: 1024 px;
  z-index: 500;
  width: 100 vw;
  box-sizing: border-box;
  &:after{
      content: '';
      width: 100%;
      height: 1px;
      position: absolute;
      left: 0;
      bottom: 8%;
      background: rgba(255, 255, 255, 0.2);
      // border-bottom: 1px solid rgba(255, 255, 255, 0.4);

  }
}
.con {
  display: flex;
  align-items: center;
  height: 100%;
}
.gw-header{
  justify-content: space-between;
  .gw-nv-section{
    display: flex;
    align-items: center;
    .logo {
      padding: 0px 40px 0 0;
      display: inline-block;
      img {
        width: 152px;
        height: 38px;
      }
    }
    .list {
      // width: 700px;
      display: inline-block;
      vertical-align: middle;
      height: 60px;
      font-size: 28px;
      color: #fff;
    }
    // 按钮
    .burger{
      display: none;
    }
  }
  .gw-sign-wrap{
    display: flex;
    align-items: center;
    // height: 60px;
    cursor: pointer;
    img{
      width: 23px;
      height: 23px;
      display: inline-block;
      position: relative;
      
    }
    i{
      font-size: 22px;
      color: #8e8e8e;
    }
    span{
      // margin-left: 14px;
      padding-left: 6px;
      font-size: 16px;
      line-height: 17px;
      color: #fff;
      position: relative;
    }
  }
}

</style>
<style lang="less">
.priceBox{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10px;
    // padding-top: 10%;
    .el-button{
      background-color: transparent!important;
      border: none;
      padding: 0!important;
      color: #acacac;
      font-size: 24px;
    }
    span{
       color: #A2A5AA;
       font-size: 14px;
    }
  }
.gw-dialog-form{
  .el-dialog{
    border-radius: 10px;
    border: 1px solid #FFFFFF;
    width: 540px;
    position: relative;
    background: none;
    background: #3D3D41;
    .el-dialog__body{
      padding:30px 25%;
      .gw-sign{
        display: flex;
        // justify-content: flex-end;
        align-items: flex-start;
        flex-direction: column;
        position: relative;
        z-index: 2;
        p{
          text-align: left;
          min-width: 50%;
          font-size: 12px;
          color: #fff;
          line-height: 18px;
          cursor: pointer;
        }
        p:hover{
           color: #ecb639!important;
        }
      }
    }
  }
  .header-title{
    position: relative;
    img{
      width: 144px;
      height: 44px;
    }
  }
}
.el-menu-item {
  padding: 0px 30px !important;
  position: relative;
  cursor: auto;
  font-size: 20px !important;
  font-weight: bold;
}
.el-menu.el-menu--horizontal,.el-menu-item  {
  border-bottom: 0px !important;
  background-color: transparent!important;
}
.el-menu.el-menu--horizontal,.el-menu-item  .gameSoon {
  // display: flex;
  // grid-template-columns: 1fr;
  // flex-direction: column;
}
.el-menu.el-menu--horizontal,.el-menu-item  .gameSoon  .el-button{
  // display: block;
  border: none;
  background: transparent;
  font-size: 20px;
  font-weight: bold;
  line-height:initial;
  // line-height: 20px;
  // height: 20px;
  // padding: 0;
  color: #A2A5AA;
  // line-height: inherit;
}
.el-button.is-disabled:hover{
  background-color: transparent!important;
  color: #A2A5AA!important;
}
// .el-menu.el-menu--horizontal,.el-menu-item  .gameSoon  .btm{
//   font-size: 14px;
// }
.el-menu-item {
 padding:0 15px!important;
}
.el-menu--horizontal > .el-menu-item a {
  display: block;
}
.el-submenu__title {
  font-size: 18px !important;
  padding-left: 26px !important;
}
.el-menu--horizontal > .el-menu-item.is-active,
.el-menu.el-menu--horizontal {
  border-bottom: 0px !important;
}
.el-icon-arrow-down:before {
  color: #fff !important;
}
.el-menu--horizontal > .el-menu-item:hover {
  // background-color: #247dff !important;
  // background: linear-gradient(90deg, #ECB639 0%, #EE8A22 100%)!important;
}
.el-menu--horizontal > .el-submenu .el-submenu__title {
  background: linear-gradient(90deg, #ECB639 0%, #EE8A22 100%)!important;
}
.el-menu-item:after {
  position: absolute;
  content: "";
  width: 0%;
  height: 2px;
  background: linear-gradient(90deg, #ecb639 0%, #ee8a22 100%);
  left: 50%;
  // top: 58px;
  bottom: -5%;
  transition: all 0.3s;
}
.banner_box .el-menu-item a.active,.banner_box .el-menu--horizontal>.el-menu-item a:hover{
  background: linear-gradient(90deg, #ecb639 0%, #ee8a22 100%);
  -webkit-background-clip: text;
  color: transparent;
  // color: #ecb639!important;
}
.el-menu-item a.active:after {
  position: absolute;
  content: "";
  width: 30%;
  height: 2px;
  // background-color: #fff;
  background: linear-gradient(90deg, #ecb639 0%, #ee8a22 100%);
  left: 60%;
  bottom: -5%;
  transition: all 0.3s;
  margin-left: -25%;
}
.el-menu--horizontal>.el-menu-item a:hover{}
.el-menu-item:hover:after {
  position: absolute;
  content: "";
  width: 50%;
  height: 2px;
  left: 50%;
  // top: 58px;
  bottom: -5%;
  margin-left: -25%;
}
@media screen  and (max-width: 1200px) {
.banner_box{
    .gw-header .gw-nv-section .logo{
      padding-right: 20px;
    }
    .gw-nv-section{
      .list{
          .el-menu--horizontal{
              .el-menu-item {
                  font-size: 16px!important;
                  padding:0 6px!important;
              }
          }
      }
    }
    .el-menu-item  .gameSoon  .el-button{
        font-size: 16px!important;
        padding:0 6px!important;
    }
  }
}

</style>