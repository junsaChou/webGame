<template>
  <div class="main con">
    <!-- 热门内容 -->
    <div class="content-wrapper-gameList">
      <section  class="company-activities">
        <div class="head-wrap-btn">
          <div class="button" v-for="(itme,j) in btnsMenu"  :class="[j == isActive ? 'active'  : '']" :key="j" @click="goBtns(j,itme)">
            {{itme.name}}
          </div>
          <!-- <button v-for="(item,j) in btnsMenu"  :class="[j == isActive ? 'active'  : '']" :key="j" @click="goBtns(j,item.name)">
            {{item.name}}
          </button> -->
        </div>
        <div class="gameSection">
          <div class="service-btm" v-for="(itme,i) in gameList" :key="i" @click="goUrl(itme.id,itme.name)">
            <div class="btm-nav">
            <img class="imgScale"   :src="itme.gameResources ?itme.gameResources[0].src+'?x-oss-process=image/auto-orient,1/quality,q_70/format,webp' : 'https://slideshow-photo.oss-ap-southeast-1.aliyuncs.com/gameslideshow/20211119/a0a24ef71d174f1aa5302cb0c80d933e.png?x-oss-process=image/auto-orient,1/quality,q_70/format,webp' " />
            </div>
            <div class="service-wrap">
              <h4 class="name">{{itme.name}}</h4>
              <p class="detail">{{itme.phase}}</p>
              <div class="btns">
                <button v-for="(j,k) in  itme.type" :key="k">{{j.typeName}}</button>
              </div>
              <div class="read-more"  >
                View Details    >
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
       <!-- 分页栏 -->
    <Pagination
      :total="total"
      :page.sync="page.current"
      :limit.sync="page.size"
      @pagination="goBtns(isActive,null,'top')"
    />
  </div>
</template>
<script>
import Pagination from '../../components/Pagination'
import { apiGetGameInfoListByHot,apiGetGameInfoList } from "../../api/apilist";
import { toTop } from "@/utils/index"
import {  mapMutations } from "vuex";
export default {
  name: "index",
  components: {
    Pagination,
  },
  data() {
    return {
      tabPosition: "left",
      limit: "",
      gameList: [],
      btnsMenu:[
        {id:1,name:'All'},
        {id:3,name:'Latest'},
        {id:3,name:'Hot'}
      ],
      page:{
        current: 1,
        size: 10
      },
      total: 0,
      isActive:0
    };
  },
  methods: {
    ...mapMutations([ "setWebSite"]),
    goUrl(id,address){
        this.setWebSite(1);
      //  this.$router.push({
      //     path: `/gameDetail/${id}`,
      //   })

      this.$router.push({path: '/gameDetail', query: {id,address}})
    },
    goBtns(j,name,flag){
      this.isActive = j;
      if( name ){
         this.page = {
          current: 1,
          size: 10
        }
      }
      switch(this.isActive){
        case 1:  this.getHotData();
        break;
        case 2: this.getNewGameData();
        break;
        default: this.getHotData();
      }
      if(flag) toTop();
    },
    getNewGameData() {
      apiGetGameInfoList(this.page)
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.total = res.data.total
            let newGameListData = res.data.records;
            // newGameListData.forEach((i,k) => {
            //    i.bigImg = i.gameResources[0].src;
            // })
            this.gameList = newGameListData;
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
            this.total = res.data.total
            let newGameListData = res.data.records;
            // newGameListData.forEach((i,k) => {
            //    i.bigImg = i.gameResources[0].src;
            // })
            this.gameList = newGameListData;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

  },
  mounted() {
    window.addEventListener('scroll', this.scrollBottom)
  },
  created(){
    if(this.$route.params.name){
      // console.log(this.$route.params.name);
      let num = '';
      let name = this.$route.params.name;
      name == 'hot' ? num = 2 : num = 1;
      // console.log(num);
      this.goBtns(num)
      return
    }
    this.getNewGameData();
  },
};
</script>
<style lang="less" scoped>
.main{
  .content-wrapper-gameList {
    /* 一维排版 */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    // width: 100%;
    .section {
      /* 二维 */
      display: grid;
      /* 每个列的对齐方式 */
      justify-items: center;
    }
    .company-activities {
      margin-top: 120px;
      // margin: 0 auto;
      width: 100%;
       .gameSection {
        margin: 30px 0;
        display: grid;
        // grid-template-rows: 1fr;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 30px;
        row-gap: 30px;
        .service-btm {
          // width: 585px;
          cursor: pointer;
          box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.16);
          padding: 13px 12px;
          box-sizing: border-box;
          transition: 0.4s;
          background: #4C4C50;
          border-radius: 8px;
          display: grid;
          grid-template-columns:300px 1fr;
          column-gap: 20px;
          // display: flex;
          // justify-content: center;
          .btm-nav{
            // width: 300px;
            object-fit: cover;
            height: 163px;
            border-radius: 8px;
            overflow: hidden;
          }
          .service-wrap{
            position: relative;
            // padding-left: 20px;
            box-sizing: border-box;
            // width: 240px;
            // width: 80%;
            .name{
              font-size: 20px;
              line-height: 26px;   
              // font-weight: bold;   
              color: #FFFFFF;
              text-align: left;
            }
            .detail{
              font-size: 18px;
              font-weight: 400;
              color: #D6D6D6;
              text-align: left;
              margin: 8px 0 16px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
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
                margin: 0  5px 5px 0;
              }
            }
            .read-more{
              position: absolute;
              right: 0;
              bottom: 0;
              cursor: pointer;
              font-size: 10px;
              font-weight: 400;
              color: #ACACAC;
            }
          }
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
      // margin: 0 30px 0 0;
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