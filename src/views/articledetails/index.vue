<template>
  <div class="main con con2">
    <!-- 热门内容 -->
    <div class="content-article-detail">
      <section  class="company-activities">
        <div class="gameActicle">
          <div class="gameActicleContent">
            <h2 class="gameName">{{ gameDetailObj.title ? gameDetailObj.title : "Article title article title" }} </h2>
            <div class="headNav">
              <span class="name">Publisher: {{ gameDetailObj.createName ? gameDetailObj.createName :'name'}}</span>
              <span>{{ gameDetailObj.isOriginal == 1 ? 'Original' :'Reprint'}}</span>
              <span>Source: {{ gameDetailObj.source }}</span>
              <div class="new-date">
                <i class="el-icon-pie-chart"></i>
                <span>{{ gameDetailObj.timeInfo ? gameDetailObj.timeInfo : '1 minute ago' }} </span>
              </div>
            </div>
            <div class="acticleContent" v-html="gameDetailObj.content">
              </div>
          </div>
          <div class="acticleRit">
            <div class="hotActicle" @click="goUrl(gameInfoDetailObj.id,gameInfoDetailObj.name)" v-if="gameDetailObj.gameId">
              <div class="wrap">
                <img class="imgScale" :src="gameInfoDetailObj.src" alt="">
                <!-- <h2 class="act-title">
                  The NFT space put together an impressive Q3 performance. Overall, the NFT space amassed $10.67 billion in trading volumes from July to September. This represents an astonishing 704% increase QoQ. However, in the midst of all the euphoria around Ethereum collections like CryptoPunks and Bored Ape Yacht Club (BAYC), the role that 
                </h2> -->
              </div>
              <h3 class="name">{{ gameInfoDetailObj.name }}</h3>
              <div class="btns">
                <button v-for="(j,k) in  gameInfoDetailObj.type" :key="k">{{ j.typeName }}</button>
              </div>
            </div>
            <div class="navRight">
               <recommenCom :recommenBoxData="recommenBoxList" ></recommenCom>
            </div>
           
          </div>
         
        </div>
           <!-- 分享 -->
           <!-- <shareMenus :gameWayTitle="gameDetailObj.title"></shareMenus> -->
            <shareMenus :gameWayObj="gameDetailObj"></shareMenus> 
      </section>
    </div>
  </div>
</template>
<script>
import recommenCom from "@/components/recommend";
import shareMenus from '@/components/shareMenus'
import { imgRegSrc,metaAppend  } from "@/utils/index"
//文章详情  游戏详情 
import { apiGameContentDetail, apiGetGameInfoListByHot,apiGetGameInfoList,apiGameInfoDetail } from "../../api/apilist";
import { mapGetters,mapMutations } from 'vuex'
export default {
  name: "index",
  components: {
    recommenCom,
    shareMenus
  },
  data() {
    return {
      gameDetailObj:{},
      gameInfoDetailObj:{},//推荐游戏
      gameList: [],
      twitterImg:'',
      webSite: 1,
      recommenBoxList:[
        // { srcArr: [require("@/assets/img/banner2.png")], detail: "The NFT space put together an impressive Q3 perfput together an impressive… "},
        // { srcArr: [require("@/assets/img/banner2.png")], detail: "The NFT space put together an impressive Q3 perfput together an impressive… "},
        // { srcArr: [require("@/assets/img/banner2.png")], detail: "The NFT space put together an impressive Q3 perfput together an impressive… "}
      ],
      isActive:0
    }
  },
  // metaInfo(){
  //   return {
  //     title: this.gameDetailObj.title + '- GameWay',
  //     meta: [
  //       // { name:'twitter:card',content:'summary' },
  //       { name:'twitter:title',content: this.gameDetailObj.title },
  //       { name:'twitter:description',content: this.gameDetailObj.title },
  //       { name:'twitter:image',content: this.twitterImg },
  //       { name:'twitter:site', content:'@GameWayFun' },
  //       { name:'twitter:creator', content:'@GameWayFun' }
  //     ]
  //   }
  // },
  watch: {
    '$route.query.id':function(newVal,oldVal) {
      if(newVal != oldVal){
        //  console.log(this.gameDetailObj)
         this.getContentData(newVal);
      }
    }
  },
  methods: {
     ...mapMutations([ "removeWebSite"]),
    goUrl(id,address){
      this.$router.push({path: '/gameDetail', query: {id,address}})
    },
    getContentData(id) {
      apiGameContentDetail({id,webSite:this.webSite})
        .then(res => {
        
          if (res.code === 200) {
            this.gameDetailObj = res.data;
            let { content } = this.gameDetailObj;
            if(content.indexOf('&nbsp;')!==-1 ){
              this.gameDetailObj.content = content.replace(/&nbsp;/ig, "   ")
            }
            if( this.gameDetailObj.gameId != null & this.gameDetailObj.gameId !== '' ){
                this.getGameInfotData( this.gameDetailObj.gameId )
            }
            // this.twitterImg = this.gameDetailObj.srcArr[0]

          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getGameInfotData(id) {
      apiGameInfoDetail({id,webSite:1})
        .then(res => {
        
          if (res.code === 200) {
            this.gameInfoDetailObj = res.data;
            this.gameInfoDetailObj.src = this.gameInfoDetailObj.gameResources[0].src;
           
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  beforeMount(){

  },
  mounted() {
    // console.log(this.$route.query.title)
    // this.pushMeta();
    window.addEventListener('scroll', this.scrollBottom)
  },
  computed: {
    ...mapGetters(['getWebSiteData']),
  },
  created(){
    // console.log( this.getWebSiteData!=undefined  )
    if(this.getWebSiteData & this.getWebSiteData!=undefined  ){
      this.webSite = null;
    }
    const queryList = this.$route.query;
    if(queryList.id){
      this.detailId = queryList.id;
      this.getContentData(this.detailId);
    }
  },
  destroyed(){
    if( this.getWebSiteData){
        this.removeWebSite(null)
    }
  }
};
</script>
<style lang="less" scoped>
.main{
  .content-article-detail {
    /* 一维排版 */
    display: flex;
    justify-content: center;
    flex-direction: column;
    .company-activities {
      margin-top: 120px;
      width: 100%;
        .gameActicle{
          margin: 30px 0;
          display: grid;
          column-gap: 30px;
          grid-template-columns: 1fr 290px;
          
          .gameActicleContent {
            // width: 900px;
            width: 100%;
            background: #4C4C50;
            box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.16);
            overflow: hidden;
            box-sizing: border-box;
            border-radius: 8px;
            padding: 30px;
            .gameName{
              text-align: left;
              font-size: 30px;
              line-height: 30px;
              font-family: Arial;
              font-weight: bold;
              color: #FFFFFF;
              word-break: break-word;
            }
            .headNav{
              margin-top: 24px;
              position: relative;
              display: flex;
              justify-content: space-between;
              padding-bottom: 22px;
              flex-wrap: wrap;
              span{
                font-size: 18px;
                font-family: Arial;
                font-weight: bold;
                color: #ACACAC;
                line-height: 20px;
                text-align: left;
                // text-align-last: left;
              }
              .new-date{
                // margin-left: 40px;
                line-height: 20px;
                text-align: left;
                i{
                  font-size: 18px;
                  color: #ACACAC;
                  margin-right: 10px;
                }
                span{
                  font-size: 18px;
                  color: #ACACAC;
                  font-weight: 400;
                }
              }
             &::after {
                position: absolute;
                content: "";
                width: 72%;
                height: 3px;
                background: linear-gradient(90deg, #ecb639 0%, #ee8a22 100%);
                border-radius: 3px;
                // left: -80%;
                // top: 43%;
                bottom: 0;
                // margin-left: -25%;
              }
            }
            .acticleContent{
              padding-top: 21px;
              p{
                font-size: 16px;
                font-family: Arial;
                font-weight: 400;
                line-height: 40px;
                color: #E8E8E8;
                text-align: left;
              }
              img{
                width: 100%;
                height: auto;
                margin: 8px auto;
              }
            }
          }
          .acticleRit{
            // width: 270px;
            display: flex;
            flex-direction: column;
            .hotActicle{
              margin-bottom: 30px;
              cursor: pointer;
              // width: 270px;
              // height: 245px;
              background: #4C4C50;
              box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.16);
              border-radius: 8px;
              box-sizing: border-box;
              padding: 19px;
              .wrap{
                position: relative;
                // width: 233px;
                width: 100%;
                height: 135px;
                border-radius: 8px;
                overflow: hidden;
                .act-title{
                  position: absolute;
                  bottom: 12px;
                  left: 12px;
                  width: 60%;
                  height: 70px;
                  font-size: 12px;
                  color: #FFFFFF;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  text-align: left;
                  display: -webkit-box;
                  -webkit-line-clamp: 4;
                  -webkit-box-orient: vertical;
                }
              }
              .name{
                font-size: 18px;
                font-family: Arial;
                font-weight: bold;
                color: #FFFFFF;
                text-align: left;
                margin: 16px 0;
              }
              .btns{
                text-align: left;
                display: flex;
                flex-wrap: wrap;
                button{
                  min-width: 55px;
                  height: 22px;
                  border: 1px solid #D6D6D6;
                  color: #D6D6D6;
                  background-color: #4C4C50;
                  font-size: 14px;
                  border-radius: 4px;
                  margin: 0 5px 0 0;
                }
              }
            }
            .navRight{
              .gameRecommen{
                width: 100%;
              }
            }
          }
        } 
      
     
    }
  
  }
}
@import '../../assets/css/common.less'; 
</style>
<style  >
.acticleContent{
  padding-top: 21px;
}
.acticleContent p{
    font-size: 16px;
    font-family: Arial;
    font-weight: 400;
    line-height: 28px;
    margin-bottom: 20px;
    color: #E8E8E8;
    text-align: left;
  }
.acticleContent img{
    /* width: 100%; */
    height: auto;
    margin: 8px auto;
  }
  u{
    text-decoration: none;
  }
  u:hover{
    color: #ecb639;
  }
  li,figcaption,u{
    text-align: left;
    color: #E8E8E8;
  }
.acticleContent h1,.acticleContent h2,.acticleContent h3,.acticleContent h4 {
    color: #fff;
    margin: 20px 0 30px;
    text-align: left;
  }
  figure{
    margin: 10px;
  }
  a{
    color:#fff;
  }
</style>