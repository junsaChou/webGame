<template>
    <div class="main con">
      <!-- 热门内容 -->
      <div class="content-game-detail">
          <section  class="game-detail-wrap">
            <div class="gameHead">
              <!-- <div class="imgWrap"> -->
                
            <swiperDetail :detailData="detailList"  ref="detailSwiper" v-if="detailList.length>0" ></swiperDetail>
              <!-- </div> -->
              <div class="gameNav">
                <div class="navTop">
                  <img :src=" detailWrap.icon? detailWrap.icon :  '' " alt="" class="logo">
                  <div class="navRight">
                    <span class="name" :title="detailWrap.name">{{ detailWrap.name }}</span>
                    <div class="title">
                      <img src="../../assets/img/hotIcon.png" alt="">
                      <span class="num">{{ detailWrap.hot ? detailWrap.hot :200 }}</span>
                    </div>
                  </div>
                </div>
                <div class="table">
                  <ul>
                    <li><span class="name">Chains</span><span class="info"><span v-for="item in detailWrap.chains" :key="item.id">{{item.chainsName}}</span></span></li>
                    <li><span class="name">Token</span><span class="info" v-if="detailWrap.token"><span v-for="item in detailWrap.token" :key="item.id">{{item.tokenName}}</span></span><span v-else class="info">-</span></li>
                    <li><span class="name">Phase</span><span class="info">{{detailWrap.phase}}</span></li>
                    <li><span class="name">Platform</span><span class="info"><span v-for="item in detailWrap.platform" :key="item.id">{{item.platformName}}</span></span></li>
                  </ul>
                </div>
                <div class="btns">
                  <button v-for="(j,k) in  detailWrap.type" :key="k">{{j.typeName}}</button>
                  <!-- <button>aaaa</button>
                  <button>aaaa</button>
                  <button>aaaa</button> -->
                </div>
                <div class="submit">
                  <button @click="goBack(detailWrap.address)">Play Now</button>
                </div>
                <div class="shareLink">
                  <img v-for="item in linkData" :key="item.src" :src="item.src"  v-show="item.url && item.url!='' " alt="" @click="goBack(item.url)">
                </div>
              </div>
            </div>
            <div class="gameSection">
              <div class="gameDetailContent">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="Info" name="Info">
                    <div class="gameBtm">
                      <div class="title">Game Introduction </div>
                      <!-- <div class="pr"></div> -->
                      <div class="gameInfo">
                        <p class="preWrap">{{ detailWrap.introduction}}</p>
                      </div>
                    </div>
                    <div class="gameChart" >
                      <div class="gameTable">
                        <div class="gameTableLeft">
                          <div class="gameHed gameInfo">
                            <div class="gameTr">Token</div>
                            <div class="gameTr">Price</div>
                            <div class="gameTr">24h</div>
                            <div class="gameTr">7d</div>
                            <div class="gameTr">24h Volume</div>
                            <div class="gameTr">Mkt Cap</div>
                            <!-- <div class="gameTr">Last 7 Days</div> -->
                          </div>
                          <!-- v-for="(item,i) in coinDetailData" :key="i" -->
                          <div class="gameBody gameInfo" v-for="(item,i) in coinDetailDataLeft" :key="i" >
                              <div class="gameTd"> <span> {{ item.tokenName }}</span></div>
                              <div class="gameTd"> <span> $ {{ item.price.toFixed(2)}}</span></div>
                              <div class="gameTd" :class="[ item.oneDay ==0 ? '' :item.oneDay >0 ? 'isTop' :'isBtm' ]" ><span>{{ parseInt(item.oneDay) }} %</span></div>
                              <div class="gameTd" :class="[ item.sevenDay ==0 ? '' :item.sevenDay >0 ? 'isTop' :'isBtm' ]"><span>{{ item.sevenDay.toFixed(2) }} %</span></div>
                              <div class="gameTd"> <span>$ {{ item.oneDayVolume.toLocaleString()}}</span> </div>
                              <div class="gameTd"> <span>$ {{ item.marketCap.toLocaleString() }}</span></div>
                            <!-- <div class="gameTd"><ChartsLine :title="'charts'" :data="commonChartsData" class="data-chart" /> </div> -->
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="gameLick" >
                      <div class="lickTitle"> {{ `Community trust ( ${countVal}  votes )`}}</div>
                      <div class="lickWrap">
                        <div class="lickLeft">
                          <img :src="lickInfo.isClick == 1 ? (lickInfo.likeType & lickInfo.likeType == 1)  ?  lickIcon3: lickIcon : lickIcon"  alt="" @click="clickLick(1)">
                          <span>{{ lickInfo.likeCount ? lickInfo.likeCount:0 }} %</span>
                        </div>
                        <el-slider v-model="lickVal" :show-tooltip="false" :class="[  lickInfo.isClick == 1 ? (lickInfo.likeType & lickInfo.likeType == 1)  ?  '':'active' : '' ]" disabled></el-slider>
                        <div class="lickRit">
                          <span>{{ lickInfo.unLikeCount? lickInfo.unLikeCount : 0 }} %</span>
                          <img :src="lickIcon" :class="[  lickInfo.isClick == 1 ? (lickInfo.likeType & lickInfo.likeType == 1)  ?  '':'active' : '' ]"  @click="clickLick(2)" alt="">
                        </div>
                      </div>
                    </div>
                    <gameComment  :gameId ="detailId" :gameUserInfo="userInfo"  v-if="detailId"></gameComment>
                  </el-tab-pane>
                  <el-tab-pane label="Newsflash" disabled  name="Newsflash">Newsflash</el-tab-pane>
                  <el-tab-pane label="Forum" disabled name="Forum">Forum</el-tab-pane>
                </el-tabs>
              
         
              
              </div>
              <div class="navRight">
                <recommenCom></recommenCom>
              </div>
            </div>
        
          </section>
      </div>
    </div>
</template>
<script>
import Swiper from 'swiper';
import swiperDetail from '../../components/swiperSlt2';
import recommenCom from "../../components/recommend";
import gameComment from "../../components/gameComment";
import { apiGetGameInfoDetail } from "../../api/apilist";
import { apiClickId,apiClickDetail,apiGetCoinDetail } from "../../api/sign";
import { mapGetters,mapMutations } from 'vuex'
// import ChartsLine from '@/components/Charts/ChartsLine'
export default {
  name: 'gameDetail',
  components:{
    swiperDetail,
    recommenCom,
    gameComment
  },
  data(){
    return{
        detailWrap:{},
        detailList:[
          // {img:require("@/assets/img/newgame01.png")},
          // {img:require("@/assets/img/newgame02.png")},
          // {img:require("@/assets/img/newgame03.png")},
          // {img:require("@/assets/img/newgame04.png")}
        ],
        linkData:[
          {
            src: require("@/assets/img/twitter.png"),
            url: "https://twitter.com/GameWayFun",
          },
          {
            src: require("@/assets/img/Discord.png"),
            url: "http://discord.gg/R2zA9J75sx",
          },
          {
            src: require("@/assets/img/telegram.png"),
            url: "https://t.me/gamefiwave",
          }
        ],
        lickVal: 50,
        countVal: 0,
        lickIcon:require("@/assets/img/lick.png"),
        lickIcon2:require("@/assets/img/lick2.png"),
        lickIcon3:require("@/assets/img/lick3.png"),
        // commonChartsData: {
        //   Mon: 782,
        //   Tue: 925,
        //   Wed: 1196,
        //   Thu: 812,
        //   Fri: 328,
        //   Sat: 222,
        //   Sun: 1080
        // },
        activeName: 'Info',
        lickInfo:{},
        detailId:null,
        userInfo: {},
        webSite: 1,
        coinDetailData:[],
        coinDetailDataLeft:[
          {tokenName:'tokenName',price:12322.86,oneDay:6767,sevenDay:6,oneDayVolume:1783.90,marketCap:8789.090},
          {tokenName:'tokenName',price:12322.86,oneDay:6767,sevenDay:6,oneDayVolume:1783.90,marketCap:8789.090},
          // {tokenName:'tokenName',price:12322.86,oneDay:6767}
        ],
        coinDetailDataRit: [],
        coinDetailObj:{} // 硬币行情
    }
  },
  watch: {
    'userInfoList':function(newVal,oldVal) {
      if( newVal!=null & newVal != undefined  ){
          this.detailId = Number(this.$route.query.id);
          this.userInfo = JSON.parse(this.userInfoList)
      }
    },
    '$route.query.id':function(newVal,oldVal) {
        if(newVal != oldVal){
          this.detailId = Number(newVal);
          this.PostFetchData(newVal);
        }
      }
      
  },
  methods:{
    ...mapMutations([ "setFormVisible"]),
    PostFetchData(id) {
      let uid = null;
      if (this.userInfo.uid ){
        uid = this.userInfo.uid
      }
      let data = { id,webSite:this.webSite,userId:uid}
      apiGetGameInfoDetail( data )
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.detailWrap = res.data;
            let { token,telegram,twitter,discord } = this.detailWrap;
            this.linkData[0].url = twitter;
            this.linkData[1].url = discord;
            this.linkData[2].url = telegram;
            if( token && token.length>0 ){
              token.forEach(k => {
                this.GetCoinDetail( k.tokenName)
              });
            }
            // this.GetCoinDetail( token)
            this.detailList = this.detailWrap.gameResources;
            this.$nextTick(() => {
              this.$refs.detailSwiper.galleryThumbsLunbo()
              this.$refs.detailSwiper.galleryTopLunbo()
            })
           
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    clickLick(like){
      if(Object.keys(this.userInfo).length == 0 ){
           this.$message({
              type: 'warning',
              message: 'Please sign in first'
          })
          this.setFormVisible(true)
          return
      }
      if ( like == this.lickInfo.likeType ){
        like = 3;
      }
      let data = { gameContentId:this.detailId,userId:this.userInfo.uid,like}
      apiClickId( data )
        .then(res => {
          if (res.code === 200) {
           this.clickDetail()
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    GetCoinDetail( name ){
      let data = {coin :name }
      apiGetCoinDetail( data )
        .then(res => {
          if (res.code === 200) {
            let { price,oneDay,sevenDay,oneDayVolume,marketCap } = res.data
    
            this.coinDetailDataLeft = [ ...this.coinDetailDataLeft,{ tokenName:name,  price:Number(price),oneDay:Number(oneDay) }]
            this.coinDetailDataRit = [ ...this.coinDetailDataRit,{sevenDay:Number(sevenDay),oneDayVolume:Number(oneDayVolume),marketCap:Number(marketCap)} ]
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    clickDetail(){
      // id=1&webSite=1&userId=1
      let data = { id:this.detailId,userId:this.userInfo.uid,webSite:1}
      apiClickDetail(data )
        .then(res => {
          if (res.code === 200) {
           let { isClick,likeCount,unLikeCount,likeType } = res.data;
           this.countVal = likeCount + unLikeCount;
            if ( likeCount == 0 & unLikeCount == 0){
              this.lickVal = 50
            }else if( likeCount == 0 & unLikeCount != 0 ) {
               this.lickVal = 0
               unLikeCount = 100
            }else if( likeCount != 0 & unLikeCount == 0 ) {
               this.lickVal = 100
               likeCount = 100
            }else{

              this.lickVal = likeCount / (likeCount + unLikeCount );
              // let lickValStatic = (Math.round(this.lickVal *10000)/100).toFixed(1)
              this.lickVal= (Math.round(this.lickVal *10000)/100).toFixed(1)
              this.lickVal = Number(this.lickVal)
              likeCount = this.lickVal;
              unLikeCount = 100 - this.lickVal
            }
           this.lickInfo =  { isClick,likeCount,unLikeCount,likeType }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    goBack(url){
      if ( url != ''){
           window.open(url)
      }
    },
    handleClick(tab, event) {
        // console.log(tab, event);
    }
  },
  computed: {
    ...mapGetters(['userInfoList']),
  },
  created(){
    const queryList = this.$route.query;
    if(queryList.id){
      this.detailId = Number(queryList.id);
      if( this.userInfoList != undefined & this.userInfoList != null   ){
          this.userInfo = JSON.parse(this.userInfoList)
          this.clickDetail();
      }
      this.PostFetchData(this.detailId);

    }
 

  }
}
</script>
<style lang="less" scoped>
.main{
  .content-game-detail {
    /* 一维排版 */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .game-detail-wrap{
      width: 100%;
      margin: 110px 0 30px; 
      .gameHead{
        display: grid;
        // width: 102%
        grid-template-columns: 73.2% 290px;
        grid-column-gap: 30px;
        .gameNav{
          background: #4C4C50;
          border-radius: 8px;
          box-sizing: border-box;
          padding: 30px 20px 20px 30px;
          .navTop{
            display: flex;
            .logo {
              width: 74px;
              height: 74px;
              border-radius: 50%;
            }
            .navRight{
              margin-left: 5px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .name{
                line-height: 40px;
                font-size: 20px;
                color: #fff;
                max-width: 164px;
                text-overflow:ellipsis;
                cursor: pointer;
                white-space: nowrap;
                overflow: hidden;
                font-weight: bold;
              }
              .title {
                text-align: left;
                img{
                  width: 34px;
                  height: 30px;
                  vertical-align: middle;
                }
                .num{
                  position: relative;
                  top: 5px;
                  font-size: 14px;
                  display: inline-block;
                  color: #DC3929;
                  height: 20px;
                }
              }
            }
          }
          .table {
            ul{
              margin: 60px 0 52px;
              width: 100%;
              li{
                width: 100%;
                display: flex;
                margin-bottom: 2px;
                white-space: nowrap;
                span{
                  height: 40px;
                  background: #828285;
                  border-radius: 6px;
                  line-height: 40px;
                }
                .info{
                  max-width: 160px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  -o-text-overflow:ellipsis;
                  flex: 1;
                  margin-left: 2px;
                  padding-left: 12px;
                  color: #fff;
                  span{
                    text-align: left;
                    padding-right: 3px;
                  }
                }
                .name{
                  width: 93px;
                  text-align: center;
                  color: #fff;
                }
              }
            }
          }
          .btns{
            display: flex;
            flex-wrap: wrap;
            // justify-content: space-between;
            text-align: left;
            margin-bottom: 30px;
            button{
              min-width: 56px;
              background: #4C4C50;
              height: 26px;
              margin: 0 5px 5px;
              border: 1px solid #fff;
              border-radius: 4px;
              color: #fff;
            }
          }
          .submit {
            
            button{
              cursor: pointer;
              width: 100%;
              height: 40px;
              background: #ECB639;
              line-height: 20px;
              font-weight: 900;
              border: 1px solid #ECB639;;
              font-size: 24px;
              color: #fff;
              border-radius: 20px;
            } 
          }
          .shareLink{
            display: flex;
            justify-content: center;
            margin-top: 26px;
            img{
              width: 20px;
              height: 20px;
              margin-right: 20px;
              cursor: pointer;
            }
          }
        }
      }
  
    } 
    .gameSection{
      display: grid;
      // column-gap: 30px;
      grid-template-columns: 1fr 290px;
      grid-column-gap: 30px;
      margin-top: 30px;
      .gameDetailContent{
        .gameBtm{
          width: 100%;
          box-sizing: border-box;
          height: auto;
          background: #4C4C50;
          // border-radius: 8px;
          padding: 10px 30px 30px;
        
          .title{
            font-size: 20px;
            line-height: 20px;
            font-weight: bold;
            text-align: left;
            padding-left: 10px;
            color: #FFFFFF;
          }
          .pr{
            margin-top: 10px;
            width: 100%;
            height: 8px;
            height: 8px;
            background: #E8E8E8;
            opacity: 0.4;
          }
          .gameInfo p{
            padding-left: 10px;
            font-size: 16px;
            height: auto;
            color:#E8E8E8;
            line-height: 27px;
            padding-top: 10px;
            text-align: left;
          }
        }
        .gameLick{
          width: 100%;
          box-sizing: border-box;
          height: auto;
          background: #4C4C50;
          border-radius: 8px;
          padding: 30px;
          margin-top: 30px;
          .lickTitle{
            line-height: 28px;
            text-align: center;
            font-size: 20px;
            color: #FEFEFE;
          }
          .lickWrap{
            display: grid;
            grid-template-columns: 15% 70% 15%;
            .lickLeft,.lickRit{
              // padding:0 10%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              img{
                width: 35px;
                height: 36px;
                cursor: pointer;
              }
              .active{
                //  transform: rotate(0deg)!important;
                opacity: 0.5;
              }
              span{
                color: #fff;
                font-size: 16px;
                padding-right: 20%;
              }
            }
            .lickRit{
              img{
                transform: rotate(180deg);
              
              }
              span{
                padding:0 0 0 20%;
              }
            }
          }
        }
      }
      .gameRecommen{
        width: 100%;
      }
    }
  
    .gameChart{
      width: 100%;
      box-sizing: border-box;
      height: auto;
      background: #4C4C50;
      border-radius:0 0 8px 8px;
      padding: 10px 30px 30px;
      position: relative;
      // margin-top: 30px;
      &::after{
        content: '';
        position: absolute;
        height: 1px;
        width: calc( 100% - 60px );
        left: 30px;
        background-color: rgba(255, 255, 255, 0.1);
        top: -10px;
      }
      .gameTable{
        // display: grid;
        // grid-template-columns: repeat(2,1fr);
        .gameTableLeft{
          display: grid;
          grid-template-columns: 28% 36% 36%;
        }
        .gameInfo{
          display: grid;
          // grid-template-columns: repeat(3,1fr);
          grid-template-columns: 100%;
          .gameTr,.gameTd{
            // line-height: 27px;
            text-align: left;
            line-height: 46px;
            font-size: 18px;
            color: #FFFFFF;
          }
          .gameTd{
             text-align: center;
             position: relative;
            // line-height: 60px;
             &::after{
              content: '';
              position: absolute;
              height: 100% ;
              width: 1px;
              left: 0;
              background-color: rgba(255, 255, 255, 0.1);
              top: 0;
            }
            .data-chart{
              height: 100%;
            }
          }
          .isBtm span,.isTop span{
            color: red;
            position: relative;
          }
          .isBtm span::after,.isTop span::after{
            content:'';
            width: 0;
            height: 0;
            position: absolute;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid red;
            top:40%;
            left: -16px;
          }
          .isTop span{
            color: #5EC488;
          }
          .isTop span::after{
            border-top: none;
            border-bottom: 6px solid #5EC488;
          }
        }
        .gameBody{
          // border-bottom: 1px solid rgba(255, 255, 255, .5);
        }
      }

    }
  }
}
@import '../../assets/css/common.less'; 
</style>
<style lang="less">
.el-tabs{
   .el-tabs__header{
     margin-bottom: 0;
   }
   .is-disabled{
     cursor: not-allowed;
   }
  .el-tabs__nav-scroll{
    background: #4C4C50;
    border-radius: 8px 8px 0 0;
    padding: 10px 30px 30px;
    // margin-bottom: 30px;
    .el-tabs__item{
      font-size: 18px;
      color: #fff;
    }
    .el-tabs__active-bar{
      background: linear-gradient(90deg, #ecb639 0%, #ee8a22 100%);
    }
    .is-active{
      // color: #ee8a22;
      background: linear-gradient(90deg, #ecb639 0%, #ee8a22 100%);
      -webkit-background-clip: text;
      color: transparent;
    }
  }
  .el-tabs__nav-wrap::after{
    height: 1px;
    width: calc( 100% - 60px );
    left: 30px;
    background-color: rgba(255, 255, 255, 0.1);
    bottom: 30px;
  }
}

.el-slider .el-slider__runway{
  height: 20px;
  border-radius: 20px;
  background-color: #fff;
  overflow: hidden;
}
.active .el-slider__runway{
  opacity: 0.5;
}
.el-slider__button-wrapper{
    display: none;
  }
.el-slider__runway.disabled .el-slider__bar {
  height: 100%;
  background: linear-gradient(270deg, #EE8A22 0%, #ECB639 100%);
  border-radius: 20px 0 0 20px;
}
    
</style>