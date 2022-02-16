<template>
  <div class="main con">
    <!-- 热门内容 -->
    <div class="content-game-contents">
      <section  class="company-activities">
        <div class="head-wrap-btn">
          <!-- <button> -->
          <div class="button" v-for="(itme,j) in btnsMenu"  :class="[j == isActive ? 'active'  : '']" :key="j" @click="goBtns(j,itme)">
            {{itme.type}}
          </div>
        </div>
        <div class="gameSection">
          <div class="gameContent">
             <div class="service-btm" v-for="(itme,i) in gameList" :key="i" @click="goActicle(itme.id,itme.title)">
              <div class="btm-nav">
                <img class="imgScale" :src="itme.img ?  itme.img+'?x-oss-process=image/auto-orient,1/quality,q_70/format,webp':'https://slideshow-photo.oss-ap-southeast-1.aliyuncs.com/gameslideshow/20211119/a0a24ef71d174f1aa5302cb0c80d933e.png?x-oss-process=image/auto-orient,1/quality,q_70/format,webp' " />
              </div>
              <div class="service-wrap-gamecontent">
                <div class="head-box">
                  <h4 class="name">{{itme.title}}</h4>
                  <div class="btns" v-if="itme.classifyName">
                     <button >{{ itme.classifyName }}</button>
                  </div>
                </div>
               
                 
                <p class="detail">{{itme.content ? itme.content : 'gameway hello'}}</p>
               
                <div class="read-more"  >
                  <div class="new-date">
                    <i class="el-icon-pie-chart"></i>
                    <span>{{ itme.timeInfo ? itme.timeInfo : '1 minute ago' }}</span>
                  </div>
                   <div class="new-date">
                      <i class="el-icon-s-custom"></i>
                      <span>{{itme.createName ? itme.createName : 'Admin' }}</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div class="navRight">
             <recommenCom :recommenBoxData="recommenBoxList" ></recommenCom>
          </div>
        </div>
      </section>
    </div>
       <!-- 分页栏 -->
    <Pagination
      :total="total"
      :page.sync="page.current"
      :limit.sync="page.size"
      @pagination="getContentData('top')"
    />
  </div>
</template>
<script>
import Pagination from '../../components/Pagination'
import recommenCom from "../../components/recommend";
import { imgRegSrc,toTop } from "@/utils/index"
// 分类接口  内容列表 推荐文章
import { apiGameTypeList,apiGameContentList,apiGameContentOrderByHot, apiGetGameInfoListByHot,apiGetGameInfoList } from "@/api/apilist";
export default {
  name: "gameContents",
  components: {
    recommenCom,
    Pagination
  },
  data() {
    return {
      gameList: [],
      recommenBoxList:[],
      btnsMenu:[
      ],
      page:{
        current: 1,
        size: 10
      },
      total: 0,
      isActive:0,
      classify:null
    };
  },
  methods: {
    goActicle(id,title){
      this.$router.push({path: '/articledetails', query: {id,title}})
    },
    goBtns(j,itme){
      this.isActive = j;
         this.classify = itme.id;
      if( itme ){
         this.page = {
          current: 0,
          size: 10
        }
      }
      this.getContentData();
    },
    getClassify(){
      apiGameTypeList()
        .then(res=>{
          if( res.code == 200 ){
            this.btnsMenu = [{id:null,type:'All'},...res.data]
          }
        })
    },
    getContentData(flag) {
      if(flag) toTop();//回到顶部
      let data = {...this.page,type:1,classify:this.classify,webSite:1,auditStatus:2}
      apiGameContentList(data)
        .then(res => {
          if (res.code === 200) {
            this.total = res.data.total
            let contentGameData = res.data.records;
            contentGameData.forEach((i,k) => {
              if(i.content.indexOf('&nbsp;')!==-1 ){

                i.content = i.content.replace(/&nbsp;/ig, "   ")
                contentGameData[k] = i;
              }else{
                 contentGameData[k] = i;
              }
           
            })
            this.gameList = contentGameData;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getNewGameData() {
      apiGetGameInfoList(this.page)
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            let contentGameData = res.data.records;
            contentGameData.forEach((i,k) => {
              // if(i.content.length > 10){
              //   let src = imgRegSrc(i)
              //   contentGameData[k] = {...i,...src };
              // }
              if(i.content.indexOf('&nbsp;')!==-1 ){

                i.content = i.content.replace(/&nbsp;/ig, "   ")
                contentGameData[k] = i;
              }else{
                 contentGameData[k] = i;
              }
            })
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getHotData() {
    let data = {
        current:1,
        size:6,
        type:1
      }
      apiGameContentOrderByHot(data)
        .then(res => {
          if (res.code === 200) {
            let contentGameData = res.data.records;
            // this.total = res.data.total
            contentGameData.forEach((i,k) => {
              if(i.content.length > 10){
                let src = imgRegSrc(i)
                contentGameData[k] = {...i,...src };
              }
           
            })
            this.recommenBoxList = contentGameData;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

  },
  created(){
    this.getContentData();
    this.getClassify();
    // this.getHotData();
  },
};
</script>
<style lang="less" scoped>
.main{
  .content-game-contents {
    /* 一维排版 */
    display: flex;
    // align-itmes: center;
    justify-content: center;
    flex-direction: column;
    .company-activities {
      margin-top: 120px;
      // margin: 0 auto;
      width: 100%;
        .gameSection{
          margin: 20px 0 30px;
          display: grid;
          column-gap: 30px;
          grid-template-columns: 1fr 290px;
          //  row-gap: 30px;
          .gameContent {
            // width: 900px;
            width: 100%;
            // display: grid;
            display: flex;
            flex-direction: column;
            .service-btm {
              // width: 585px;
              margin-bottom: 30px;
              cursor: pointer;
              box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.16);
              padding: 24px 12px;
              box-sizing: border-box;
              transition: 0.4s;
              background: #4C4C50;
              border-radius: 8px;
              // display: flex;
              height: 210px;
              display: grid;
              grid-template-columns: 300px 1fr;
              // justify-content: center;
              .btm-nav{
                // width: 300px;
                border-radius: 8px;
                height: 163px;
                // width: 300px;
                overflow: hidden;
              }
              .service-wrap-gamecontent{
                position: relative;
                padding-left: 20px;
                box-sizing: border-box;
                // width: 560px;
               
                .detail{
                  font-size: 16px;
                  font-weight: 400;
                  color: #D6D6D6;
                  text-align: left;
                  height: 70px;
                  margin: 0px 0 10px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  text-align: left;
                  display: -webkit-box;
                  -webkit-line-clamp: 3;
                  -webkit-box-orient: vertical;
                }
                .head-box{
                  display: flex;
                  flex-wrap: wrap;
                  height: 44px;
                  padding-bottom: 10px;
                   .name{
                    font-size: 18px;
                    line-height: 20px;
                    height: 20px;
                    max-width: 100%;   
                    font-weight: bold;   
                    color: #FFFFFF;
                    text-align: left;
                    display: inline-block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    padding-right: 9px;
                  }
                  .btns{
                      display: inline-flex;
                      flex-wrap: wrap;
                      height: 20px;
                      align-items: center;
                      button{
                        min-width: 55px;
                        height: 18px;
                        line-height: 10px;
                        border: 1px solid #D6D6D6;
                        color: #D6D6D6;
                        background-color: #4C4C50;
                        font-size: 12px;
                        // transform: scale(0.9);
                        border-radius: 4px;
                      }
                    }
                }
                .read-more{
                  position: absolute;
                  right: 0;
                  // bottom: px;
                  display: flex;
                    .new-date{
                      margin-left: 40px;
                      line-height: 26px;
                      text-align: left;
                      i{
                        font-size: 13px;
                        color: #ACACAC;
                        margin-right: 10px;
                      }
                      span{
                        font-size: 12px;
                        color: #ACACAC;
                        font-weight: 400;
                      }
                    }
                }
              }
            }
          
          }
          .gameRecommen{
            width: 100%;
          }
        } 
      
     
    }
  
  }

  /* 列表页 */
  .head-wrap-btn {
    // width: 100%;
    text-align: left;
    // padding-left: 30px;
    .button {
      display: inline-block;
      text-align: center;
      // margin-right: 31px;
      padding: 0 20px;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      font-weight: bold;
      box-sizing: border-box;
      // color: #333;
      color: #fff;
      // opacity: 1;
      // border-radius: 20px;
      position: relative;
    }
    .button:first-child:after{
      display: none;
    }
    .button:after{
      content: "";
      position: absolute;
      width: 1px;
      top: 0;
      height: 100%;
      left: 0;
      background-color: #fff;
      opacity: 0.2;
      // background: rgba(255, 255, 255, 0.3);
    }
    .active {
      background: linear-gradient(90deg, #ecb639 0%, #ee8a22 100%);
      -webkit-background-clip: text;
      color: transparent;
    }
  }
}
@import '../../assets/css/common.less'; 
</style>