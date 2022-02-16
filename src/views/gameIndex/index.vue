<template>
  <div class="main con">
    <!--轮播-->
    <div class="content-banner ">
      <div class="content-imgWrap" >
        <swiper :bannerData="bannerList" ref="mychild"></swiper>
        <div class="banner-footer">
          <!-- @mouseenter.native="onEnter"
          @mouseleave.native="onLeave"-->
          <recommenCom></recommenCom>
        </div>
      </div>
      <div class="content-news">
        <div class="headWrap">
          <div class="left">
            <span>Newsflash</span>
          </div>
          <div class="right" @click="goUrl('/gameNews')">
            <span>more</span>
            <i>></i>
          </div>
        </div>
        <div @click="openDetail($event)">
            <vue-seamless-scroll :class-option="classOption" :data="newsWrapList" class="new-wrap">
              <!-- @click="goUrl('/articledetails',itme.id,null,itme.title)"       @click="openDetail(itme)" -->
              <div
                class="new-box"
                v-for="(itme,i) in newsWrapList"
                :key="i.id"
                :data-title ="itme.title"
                :data-timeInfo ="itme.timeInfo"
              >
                <h2 class="act-title">{{ itme.title }}</h2>
                <div class="new-date">
                  <i class="el-icon-pie-chart"></i>
                  <span>{{ itme.timeInfo }}</span>
                </div>
              </div>
          </vue-seamless-scroll>
        </div>
      </div>
    </div>

    <!-- </div> -->
    <!-- 热门内容 -->
    <div class="content-wrapper ">
      <section class="serviceGame">
        <!-- <h2 class="title1">功能介绍</h2> -->
        <div class="headWrap ">
          <div class="left">
            <!-- <img src="../../assets/img/CRM.png" > -->
            <span>Hot Games</span>
          </div>
          <div class="right" @click="goDetail('hot')">
            <span>more</span>
            <i>></i>
          </div>
        </div>
        <swiperGame :hotData="hotList" ref="hotListSwiper"></swiperGame>
      </section>
      <section class="calendar-Section">
        <div class="company-activities">
          <div class="company-newgame">
            <div class="headWrap">
              <div class="left">
                <!-- <img src="../../assets/img/CRM.png" > -->
                <span>New Games</span>
              </div>
              <div class="right" @click="goDetail('newgame')">
                <span>more</span>
                <i>></i>
              </div>
            </div>
            <div class="activities">
              <div
                class="activity"
                v-for="(itme,i) in newGameList"
                :key="i"
                @click="goUrl('/gameDetail',itme.id,itme.name)"
              >
                <div class="act-image-wrapper">
                  <div class="imgScaleBox">
                    <img
                      class="imgScale"
                      :src="itme.gameResources ?itme.gameResources[0].src+'?x-oss-process=image/auto-orient,1/quality,q_70/format,webp' : 'https://slideshow-photo.oss-ap-southeast-1.aliyuncs.com/gameslideshow/20211119/a0a24ef71d174f1aa5302cb0c80d933e.png?x-oss-process=image/auto-orient,1/quality,q_70/format,webp' "
                    />
                  </div>
                </div>
                <div class="act-wrap-box">
                  <!-- <div class="act-wrap"> -->
                  <h2 class="act-title">{{itme.name}}</h2>
                  <div class="act-detail">{{ itme.introduction }}</div>
                  <!-- </div> -->
                </div>
              </div>
            </div>
          </div>
          <div class="company-contents">
            <div class="headWrap">
              <div class="left">
                <!-- <img src="../../assets/img/CRM.png" > -->
                <span>New Contents</span>
              </div>
              <div class="right" @click="goUrl('/gameContents')">
                <span>more</span>
                <i>></i>
              </div>
            </div>
            <div class="activities">
              <div
                class="activity"
                v-for="(itme,i) in gameConetntList"
                :key="itme.id"
                @click="goUrl('/articledetails',itme.id,null,itme.title)"
              >
                <div class="act-image-wrapper" v-if="i<2">
                  <div class="imgScaleBox">
                    <img
                      class="imgScale"
                      :src="itme.img ?  itme.img+'?x-oss-process=image/auto-orient,1/quality,q_70/format,webp':'https://slideshow-photo.oss-ap-southeast-1.aliyuncs.com/gameslideshow/20211119/a0a24ef71d174f1aa5302cb0c80d933e.png?x-oss-process=image/auto-orient,1/quality,q_70/format,webp' "
                    />
                  </div>
                  <span>{{ itme.timeInfo ? itme.timeInfo : '1 minute ago' }}</span>
                </div>
                <div class="act-wrap-box">
                  <div class="act-head">
                    <h2 class="act-title">{{itme.title}}</h2>
                    <span v-if="i>1">{{ itme.timeInfo ? itme.timeInfo : '1 minute ago' }}</span>
                  </div>
                  <!-- <h2 class="act-title">{{itme.name}}</h2> -->
                  <div class="act-detail">{{ itme.content ? itme.content : 'gameway hello' }}</div>
                  <!-- </div> -->
                </div>
                <div class="border"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="navRight">
          <calendarBOx  :calendarDateObj="{}"></calendarBOx>
          <div class="space">
            <div class="imgBox" v-for="(item,index) in spaceMenu" :key="index"  @click="goBack(item.photoLink)">
              <img  class="imgScale" :src="item.photoSrc? item.photoSrc +'?x-oss-process=image/auto-orient,1/quality,q_70/format,webp' : 'https://slideshow-photo.oss-ap-southeast-1.aliyuncs.com/gameslideshow/20211119/a0a24ef71d174f1aa5302cb0c80d933e.png?x-oss-process=image/auto-orient,1/quality,q_70/format,webp'" alt="">
            </div>
            
          </div>
        </div>
      </section>
    </div>
    <dialogNews :newsInfo ="detailInfo" @func="closeDialog"></dialogNews>
  </div>
</template>
<script>
import Swiper from "swiper";
import swiper from "@/components/swiper";
import swiperGame from "@/components/swiperGame";
import recommenCom from "@/components/recommend";
import calendarBOx from "@/components/calendar";
import dialogNews from "@/components/dialogNews";
import vueSeamlessScroll from "vue-seamless-scroll";
//新闻
import {
  apiGetGameSlideshow,
  apiGetGameInfoListByHot,
  apiGetGameInfoList,
  apiGameContentList
} from "../../api/apilist";
import { imgRegSrc } from "@/utils/index";
import {  mapMutations } from "vuex";
export default {
  name: "index",
  components: {
    swiper,
    swiperGame,
    recommenCom,
    vueSeamlessScroll,
    dialogNews,
    calendarBOx
  },
  data() {
    return {
      list: [],
      bannerList: [],
      hotList: [],
      gameConetntList: [], // 内容
      newGameList: [], // new 游戏
      newsWrapList: [], //新闻
      page: {
        current: 1,
        size: 10
      },
      detailInfo:{
        dialogVisible: false
      },
      spaceMenu:[
        // { photoSrc:'https://slideshow-photo.oss-ap-southeast-1.aliyuncs.com/gameslideshow/20220119/2e438530c9b740de8495b21da9431577.jpg',photoLink:'https://twitter.com/GameWayFun/status/1483650736374562816?s=20' }
      ]
    };
  },
  methods: {
    ...mapMutations([ "removeCalendarDate","removeCalendarId"]),
    goDetail(name) {
      this.$router.push({
        name: "gameList",
        params: {
          name: name
        }
      });
    },
    goBack(url){
      window.open(url);
    },
      // 打开详情页
    openDetail(e){
      let target = e.target.parentElement;
      let title = target.dataset.title;
      let timeInfo = target.dataset.timeinfo;
      this.detailInfo.dialogVisible = true;
      this.detailInfo = {...this.detailInfo,title,timeInfo }
    },
    closeDialog(data){
       this.detailInfo.dialogVisible = false;
    },
    // 获取数据列表
    goUrl(to, id, address,title) {
      this.$router.push({ path: to, query: { id, address,title } });
    },
    PostFetchData(type) {//轮播图
      apiGetGameSlideshow({...this.page,type})
        .then(res => {
          if (res.code === 200) {
            let {records } = res.data;
            type == 1? this.bannerList = records: this.spaceMenu = records;
            this.$nextTick(() => {
              this.$refs.mychild.initSwiper();
            });
            // this.total = res.data.total;
            // this.tableData = res.data.records;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getHotData() {
      apiGetGameInfoListByHot(this.page)
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.hotList = res.data.records;
            this.$nextTick(() => {
              this.$refs.hotListSwiper.initSwiperGame();
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getNewGameData() {
      this.page.size = 5;
      apiGetGameInfoList(this.page)
        .then(res => {
          if (res.code === 200) {
            let newGameListData = res.data.records;
            this.newGameList = newGameListData;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getNewsData(isNews) {
      let type;
      isNews ? (type = 2) : (type = 1);
      let data = { current: 1, size: 5, type, auditStatus: 2 };
      apiGameContentList(data)
        .then(res => {
          if (res.code === 200) {
            let contentGameData = res.data.records;
            contentGameData.forEach((i, k) => {
              // if (i.content.length > 10) {
              //   let src = imgRegSrc(i);
              //   contentGameData[k] = { ...i, ...src };
              // }
              if(i.content.indexOf('&nbsp;')!==-1 ){

                i.content = i.content.replace(/&nbsp;/ig, "   ")
                contentGameData[k] = i;
              }else{
                 contentGameData[k] = i;
              }
            });

            isNews ? (this.newsWrapList = contentGameData): (this.gameConetntList = contentGameData);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.PostFetchData('1');
    this.PostFetchData('2')
    this.getHotData();
    this.getNewGameData();
    this.getNewsData("news");
    this.getNewsData();
    // 清除日历的选中 
    this.removeCalendarDate()
    this.removeCalendarId()
  },
  mounted(){
    // console.log(this.$refs.mychild.$el )
  },
  computed: {
    classOption() {
      return {
        step: 0.3, // 数值越大速度滚动越快
        // limitMoveNum: 3, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        // openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      };
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  min-height: 100vh;
  box-sizing: border-box;
  .content-banner {
    margin: 120px auto 0;
    display: grid;
    grid-template-columns: 73% 1fr;
    grid-column-gap: 30px;
    // height: 560px;
    .content-imgWrap {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .banner-footer {
        margin-top: 30px;
      }
    }
    .content-news {
      height: 100%;
      background: #4c4c50;
      box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.16);
      opacity: 1;
      border-radius: 8px;
      .headWrap {
        display: flex;
        justify-content: space-between;
        height: 60px;
        background: #4c4c50;
        box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.06);
        opacity: 1;
        border-radius: 6px;
        .left {
          display: flex;
          align-items: center;
          padding-left: 20px;
          span {
            font-size: 18px;
            font-weight: bold;
            color: #ffffff;
            position: relative;
            left: 45px;
          }
          span::after {
            position: absolute;
            content: "";
            width: 34px;
            height: 3px;
            background: linear-gradient(90deg, #ecb639 0%, #ee8a22 100%);
            left: -50%;
            top: 43%;
            // margin-left: -25%;
          }
        }
        .right {
          cursor: pointer;
          display: flex;
          align-items: center;
          span {
            font-size: 18px;
            color: #acacac;
          }
          i {
            font-size: 18px;
            color: #acacac;
            margin: 0 10px;
          }
        }
      }
      .new-wrap {
        padding: 0 35px;
        height: 476px;
        overflow: hidden;
        .new-box {
          cursor: pointer;
          padding-top: 20px;
          border-bottom: 1px solid #fff;

          .act-title {
            height: 43px;
            font-weight: 400;
            word-break: break-word;
            font-size: 16px;
            line-height: 24px;
            color: #e8e8e8;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .new-date {
            padding-left: 8px;
            line-height: 26px;
            text-align: left;
            i {
              font-size: 13px;
              color: #acacac;
              margin-right: 10px;
            }
            span {
              font-size: 12px;
              color: #acacac;
              font-weight: 400;
            }
          }
        }
      }
    }
  }
  .content-wrapper {
    display: flex;
    flex-direction: column;
    .headWrap {
      display: flex;
      justify-content: space-between;
      // width: 1200px;
      height: 60px;
      background: #4c4c50;
      // box-shadow: 2px 1px 5px rgba(153, 153, 153, 0.16);
      box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.06);
      opacity: 1;
      border-radius: 6px;
      .left {
        display: flex;
        align-items: center;
        span {
          font-size: 18px;
          padding-left: 20px;
          font-weight: bold;
          color: #ffffff;
        }
      }
      .right {
        cursor: pointer;
        display: flex;
        align-items: center;
        span {
          font-size: 18px;
          color: #acacac;
        }
        i {
          font-size: 18px;
          color: #acacac;
          margin: 0 10px;
        }
      }
    }
    .serviceGame {
      padding-top: 30px;
      .services {
        // width: 1200px;
        width: 100%;
        margin-top: 20px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        /* grid-template-rows: 1fr 1fr; */
        column-gap: 30px;
        row-gap: 30px;
        .service-item {
          transition: 0.4s;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #4c4c50;
          /* padding: 24px; */
          box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.06);
          img {
            width: 100%;
            height: 123px;
          }
          .service-btm {
            /* display: flex; */
            padding: 10px 20px 7px 24px;
            .btm-nav {
              display: flex;
              padding-left: 6px;
              img {
                width: 46px;
                height: 54px;
                margin: -28px 15px 0 0;
              }
              .service-title {
                height: 28px;
                grid-area: title;
                /* color: var(--text-color-darker); */
                color: #fff;
                font-size: 18px;
              }
            }
            .service-content {
              text-indent: 2em;
              height: 98px;
              // font-size: 16px;
              padding-top: 10px;
              grid-area: content;
              word-break: break-word;
              font-size: 10px;
              line-height: 15px;
              color: #666666;
              overflow: hidden;
              text-overflow: ellipsis;
              text-align: left;
              display: -webkit-box;
              -webkit-line-clamp: 5;
              -webkit-box-orient: vertical;
              /* letter-spacing: 15px; */
            }
          }
        }
      }
    }
    .calendar-Section{
      margin: 30px 0;
      display: grid;
      column-gap: 30px;
      grid-template-columns: 1fr 290px;
      .company-activities {
        // margin: 30px 0;
        display: grid;
        grid-template-columns:100%;
        // column-gap: 30px;
        row-gap: 30px;
        width: 100%;
        .activities {
          margin-top: 30px;
          display: grid;
          grid-template-columns:100%;
          row-gap: 30px;
          .activity {
            box-shadow: 0px 0px 10px rgba(0, 0, 20, 0.1);
            padding: 14px 30px 10px;
            // height: 140px;
            box-sizing: border-box;
            cursor: pointer;
            background: #4c4c50;
            border-radius: 8px;
            display: flex;
            .act-image-wrapper {
              border-radius: 8px;
              margin-bottom: 0;
              width: 180px;
              height: 130px;
              margin: -28px 42px 0 0;
              .imgScaleBox {
                width: 180px;
                height: 130px;
                overflow: hidden;
                border-radius: 8px;
              }
            }
            .act-wrap-box {
              box-sizing: border-box;
              .act-title {
                color: #ffffff;
                font-size: 18px;
                width: 300px;
                // width: 100%;
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
                height: 90px;
                grid-area: content;
                word-break: break-word;
                font-size: 16px;
                line-height: 24px;
                color: #e8e8e8;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: left;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
              }
            }
          }
        }
        .company-contents {
          .activities {
            row-gap: 0;
            background: #4c4c50;
            overflow: hidden;
            border-radius: 8px;
            .activity {
              position: relative;
              border-radius: 0;
              box-shadow: 0 0 0 0;
              margin-bottom: 24px;
              box-sizing: border-box;
              .act-image-wrapper {
                margin: 0 20px 0 0;
                display: flex;
                flex-direction: column;
                .imgScaleBox {
                  width: 113px;
                  height: 82px;
                  overflow: hidden;
                }
                span {
                  margin-top: 4px;
                  font-size: 12px;
                  font-weight: bold;
                  color: #acacac;
                }
              }
              .act-wrap-box {
                // flex-shrink: 0;
                // width: 100%;
                display: inline-block;
                .act-head {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 4px;
                  span {
                    font-size: 12px;
                    font-weight: bold;
                    color: #acacac;
                  }
                }
                .act-detail {
                  -webkit-line-clamp: 3;
                  height: 70px;
                }
              }
              .border {
                position: absolute;
                bottom: 2px;
                width: 93%;
                height: 1px;
                background: #707070;
              }
            }
          }
        }
      }
      .navRight{
        .gameFiWrap{
          width: 100%;
        }
        .space{
          margin-top: 30px;
          display: grid;
          grid-template-columns:100%;
          row-gap: 30px;
          cursor: pointer;
          .imgBox{
            border-radius: 8px;
            width: 100%;
            overflow: hidden;
            height: 162px;
          }
        }
      }
    }
  
  }
}
@import '../../assets/css/common.less'; 
</style>
<style lang="less">
#app{
  .banner-footer {
    .gameRecommen {
      background: transparent;
      width: 100%;
      height: 158px;
      padding-bottom: 0;
      box-shadow: none;
      .headWrap {
        display: none;
      }
      .recommenWrap {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 30px;
        height: 158px;
        overflow: hidden;
        .recommenBox {
          // width: 268px;
          width: 100%;
          height: 158px;
          box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.16);
          box-sizing: border-box;
          overflow: hidden;
          background: linear-gradient(
            180deg,
            rgba(76, 76, 80, 0) 0%,
            rgba(76, 76, 80, 0.79) 100%
          );
          border-radius: 8px;
          padding: 0;
          position: relative;
          .imgScaleBox {
            width: 100%;
            // width: 270px;
            height: 158px;
            overflow: hidden;
          }
          .act-pr {
            box-sizing: border-box;
            top: 0;
            width: 100%;
            height: 100%;
            // padding-top: 100px;
            padding: 40% 4% 2%;
            .act-title {
              font-weight: bold;
              font-size: 16px;
              -webkit-line-clamp: 2;
            }
          }
        }
      }
    }
  }
}

</style>