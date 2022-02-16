<template>
  <div class="main con">
    <!-- 热门内容 -->
    <div class="content-game-news">
      <section  class="company-activities">
        <div class="gameNews" >
          <div class="gameContent" >
             <!-- <div class="service-btm" v-for="(itme,i) in newsList" :key="i"  @click="goUrl('/articledetails',itme.id,itme.title)"> -->
            <div class="service-btm" v-for="(itme,i) in newsList" :key="i"  @click="openDetail(itme)">
              <div class="service-wrap">
                 <div class="read-more"  >
                  <div class="new-date">
                    <!-- <i class="iconfont"></i> -->
                    <img class="fontImg" :src="gameIcon" alt="">
                    <span>{{ itme.timeInfo }}</span>
                     <i class="el-icon-pie-chart"></i>
                  </div>
                </div>
                <div class="newsBox">
                  <h2 class="title">{{itme.title}}</h2>
                  <!-- <div class="newsInfo" v-html="itme.detail">
                  </div> -->
                  <!-- <p class="detail">{{ itme.detail }}</p> -->
                </div>
          
              </div>
            </div>
          </div>
          <!-- :recommenBoxData="recommenBoxList" -->
          <div class="navRight">
             <recommenCom :recommenBoxData="recommenBoxList" ></recommenCom>
          </div>
        </div>
      </section>
    </div>
    <dialogNews :newsInfo ="detailInfo" @func="closeDialog"></dialogNews>
       <!-- 分页栏 -->
  </div>
</template>
<script>
import recommenCom from "../../components/recommend";
import dialogNews from "../../components/dialogNews";
import { apiGameContentList } from "../../api/apilist";
import { imgRegSrc } from "@/utils/index";
import { myScrollBtm } from '@/utils/uploadMixin'
export default {
  name: "index",
  components: {
    recommenCom,dialogNews
  },
  mixins:[ myScrollBtm],
  data() {
    return {
      // newsList: [],
      newsList:[
        // { src: require("@/assets/img/newgame01.png"),title:'the he NFT space put together an impressive Q3 perfput together an impressive…he NFT space put together an impressive Q3 perfput together an impressive…nftshhshhs', info: "The NFT space put together an impressive he NFT space put together an impressive Q3 perfput together an impressive…he NFT space put together an impressive Q3 perfput together an impressive…Q3 perfput together an impressive… "},
        // { src: require("@/assets/img/newgame01.png"),title:'the nftshhshhs', info: "The NFT space put together an impressive Q3 perfput together he NFT space put together an impressive Q3 perfput together an impresshe NFT space put together an impressive Q3 perfput together an impressive…ive…an impressive… "},
        // { src: require("@/assets/img/newgame01.png"),title:'the nftshhshhs', info: "The NFT space put together an impressive Q3 perfput together an imhe NFT space put together an impressive Q3 perfput together an impressive…he NFT space put together an impressive Q3 perfput together an impressive…pressive… "}
      ],
      gameIcon: require("@/assets/img/gameIcon.png"),
      recommenBoxList:[],
      page:{
        current: 1,
        size: 10
      },
      detailInfo:{
        dialogVisible:false,
      },
      finished: false,
      pageCount: 0,
      total: 0
    };
  },
  methods: {
    // 打开详情页
    openDetail(dataInfo){
      this.detailInfo.dialogVisible = true;
      this.detailInfo = {...this.detailInfo,...dataInfo}
    },
    closeDialog(data){
       this.detailInfo.dialogVisible = false;
    },
    goUrl(to,id, address) {
      this.$router.push({ path: to, query: { id, address } });
    },
    PostFetchData() {
      let data = {...this.page,type:2,webSite:1,auditStatus:2}
      apiGameContentList(data)
        .then(res => {
          if (res.code === 200) {
            this.total = res.data.total
            this.pageCount = this.total % this.page.size;
            let contentGameData = res.data.records;
            contentGameData.forEach((i,k) => {
              if(i.content.length > 10){
                let src = imgRegSrc(i,true)
                contentGameData[k] = {...i,...src };
              }
           
            })
            let newListScroll = JSON.parse(JSON.stringify(this.newsList))
            this.newsList = [ ...newListScroll, ...contentGameData];
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // scrollBottom() {
    //     this.loading = false
    //     let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //     let clientHeight = document.documentElement.clientHeight;
    //     let scrollHeight = document.documentElement.scrollHeight;
    //     let bottomOfWindow = scrollTop + clientHeight >= scrollHeight-50
    //     if (scrollTop!=0&&bottomOfWindow  && this.finished == false && this.pageCount != this.page.current ) {
    //       this.page.current = this.page.current + 1;
    //       this.PostFetchData();
          
    //     }
    // }
  },
  // mounted() {
  //   window.addEventListener('scroll', this.scrollBottom)
  // },
  created(){
    this.PostFetchData();
  },
};
</script>
<style lang="less" scoped>
.main{
  .content-game-news {
    /* 一维排版 */
    display: flex;
    justify-content: center;
    flex-direction: column;
    .company-activities {
      margin-top: 120px;
      width: 100%;
        .gameNews{
          // display: flex;
          // justify-content: space-between;
          display: grid;
          column-gap: 30px;
          grid-template-columns: 1fr 290px;
          margin: 0 0 30px;
          
          .gameContent {
            width: 100%;
            background: #4C4C50;
            box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.16);
            overflow: hidden;
            box-sizing: border-box;
            border-radius: 8px;
            min-height: 670px;
            height: auto;
            padding: 23px 45px 25px 11px;
            .service-btm {
              cursor: pointer;
              box-sizing: border-box;
              display: flex;
              .service-wrap{
               
                box-sizing: border-box;
                width: 100%;
                // width: 560px;
                .newsBox{
                   border-left: 1px solid #ACACAC;
                   padding:0 0 20px 20px;
                   margin-left: 6px;
                  .title{
                    font-size: 18px;
                    color: #fff;
                    text-align: left;
                    font-weight: bold;
                    margin-bottom: 12px;
                  }
                }
                
                .read-more{
                  display: flex;
                  align-items: center;
                    .new-date{
                      // margin-left: 40px;
                      line-height: 26px;
                      text-align: left;
                      .el-icon-pie-chart{
                        font-size: 14px;
                        color: #ACACAC;
                        margin:2px 0 0 8px;
                        // position: relative;
                        // top: 0;
                      }
                      .fontImg{
                        width: 14px;
                        height: 14px;
                        display: inline-block;
                        margin-right: 10px;
                      }
                      span{
                        font-size: 16px;
                        color: #ACACAC;
                        font-weight: 400;
                      }
                    }
                }
              }
            }
          
          }
          .navRight{
            height: auto;
            .gameRecommen{
              width: 100%;
            }
          }
        } 
      
     
    }
  
  }
}
@import '../../assets/css/common.less'; 
</style>
<style lang="less" >
 .newsInfo{
  p{
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    color: #E8E8E8;
    text-align: left;
    margin-bottom: 10px;
  }
}
</style>