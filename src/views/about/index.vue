<template>
  <div class="main con">
    <!-- 热门内容 -->
    <div class="content-game-about">
      <section  class="company-activities">
        <div class="gw-about-wrap">
          <div class="gw-about-detail">
            <h2>Introduction</h2>
            <div class="gw-about-info">{{aboutDetail }}</div>
            <div class="gw-about-info">{{aboutDetail2 }}</div>
          </div>
          <div class="gw-about-partners">
           <h2>Partners</h2>
           <div class="gw-about-friend">
             <img :src="friendImg" alt="">
           </div>
          </div>
          <div class="gw-about-content">
           <h2>Contact</h2>
           <div class="gw-about-title">
             If you have any ideas, welcome to contribute and contact： 
           </div>
           <div class="gw-about-title">
             Way@gameway.fun   
           </div>
          </div>
        </div>
      
      </section>
    </div>
       <!-- 分页栏 -->
  </div>
</template>
<script>
import { apiGameContentList } from "../../api/apilist";
import validatorForm from '../../assets/js/validatorForm'
export default {
  name: "about",
  components: {
    
  },
  data() {
    return {
      recommenBoxList:[],
      friendImg:require("@/assets/img/aboutFriend.png"),
      aboutDetail: "GameWay is a blockchain game vertical service platform, which focuses on providing a convenient blockchain game     information publishing platform for blockchain game lovers. In addition to providing users with diversified games and   interactive entertainment, it is also committed to developing community, NFT prop trading, and other related services. ",
      aboutDetail2: "  Living together in the global village, we gather in GameWay. Let your dreams be your wings, and build our Metaverse   jointly. So, let's go to the Metaverse on our GameWay!"
    };
  },
  methods: {
    // 添加body图片
    setBodyBackGround () {
          document.getElementById('app').className = 'filter-app'
    },
      // 清除背景图
    clearBodyBackGround () {
          document.getElementById('app').className = ''
    }
  },
  mounted() {
    // this.setBodyBackGround();
  },
  beforeDestroy(){
    // this.clearBodyBackGround();
  },
  created(){
    // this.getNewsData();
  },
};
</script>
<style lang="less" >
.main{
  // min-height: calc( 100vh - 200px);
  .content-game-about {
    position: relative;
    /* 一维排版 */
    display: flex;
    justify-content: center;
    flex-direction: column;
    .company-activities {
      margin-top: 120px;
      width: 100%;
      .gw-about-wrap{
        margin: 0px auto;
        padding:0px 72px 0px;
        // width: 80%;
        box-sizing: border-box;
        .gw-about-detail,.gw-about-partners,.gw-about-content{
          // display: grid;
          width: 80%;
          margin: 0 auto;
          h2{
            line-height: 40px;
            font-size: 28px;
            color: #FFFFFF;
            text-align: center;
            margin: 0px auto 30px;
          }
          .gw-about-info{
            // word-break:break-word;  
            // white-space: pre-line;
            // word-wrap:break-word;  
            text-shadow: 2px 1px  #000;
            // width: 100%;
            text-align: left;
            font-size: 16px;
            line-height: 24px;
            color: #FFFFFF;
            
          }
         .gw-about-info:nth-child(2){
           margin-bottom: 20px;
         }
          .gw-about-title{
            line-height: 25px;
            font-size: 16px;
            color: #fff;
            text-align: center;
            margin: 30px 0;
          }
        }
        .gw-about-partners{
          margin-top: 40px;
          width: 100%;
          .gw-about-friend{
            // margin-top: -10px;
            width: 100%;
            height: auto;
            overflow: hidden;
            img{
              width: 100%;
              margin:6px auto 30px;
            }
          }

        }
      }
    }
  
  }
}
@import '../../assets/css/common.less'; 
</style>
<style scoped>
body{
   white-space: pre-wrap;
}
</style>