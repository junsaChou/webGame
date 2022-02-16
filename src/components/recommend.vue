<template>
  <div class="gameRecommen">
    <div class="headWrap">
      <div class="left">
        <span>Reco Contents</span>
      </div>
    </div>
    <div class="recommenWrap">
      <div class="recommenBox" v-for="(itme,i) in recommenBoxList" :key="i" @click="goActicle(itme.id,itme.title)">
        <div class="imgScaleBox">
            <img class="imgScale" :srcset="itme.img ?  itme.img+'?x-oss-process=image/auto-orient,1/quality,q_70/format,webp':'https://slideshow-photo.oss-ap-southeast-1.aliyuncs.com/gameslideshow/20211119/a0a24ef71d174f1aa5302cb0c80d933e.png?x-oss-process=image/auto-orient,1/quality,q_70/format,webp'" :src="itme.srcArr ?  itme.srcArr[0]+'?x-oss-process=image/auto-orient,1/quality,q_70/format,webp':'https://slideshow-photo.oss-ap-southeast-1.aliyuncs.com/gameslideshow/20211119/a0a24ef71d174f1aa5302cb0c80d933e.png?x-oss-process=image/auto-orient,1/quality,q_70/format,webp'"  alt />
        </div>
        <div class="act-pr">
           <h2 class="act-title">{{itme.title}}</h2>
        </div>
       
      </div>
      <div class="recommenBox createContent" v-if="recommenFlag" @click="goUrl('/create/contents')">
        <div class="createIcon">
           <i class="el-icon-plus"></i>
        </div>
        <div class="createTitle">
          Create 
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { apiGetGameInfoBySevenDay } from "@/api/apilist";
import { _isMobile } from "@/utils"
import {  mapMutations } from "vuex";
export default {
  name: "recommend",
  props: {
    recommenBoxData: {
      type: Array,
      default: () => []
    },
    recommenFlag:{
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      recommenBoxList:[],
    };
  },
  created(){
    if( this.recommenFlag ){
      this.recommenBoxList = this.recommenBoxData;
      return
    }
    this.getHotData()
  },
  methods: {
    ...mapMutations([ "setWebSite"]),
    goUrl(to, id, address,title) {
     
      if ( _isMobile()){
           this.$message({
              type: "warning",
              message: 'Please access the new content function through PC'
            });
            return
      }
      this.$router.push({ path: to, query: { id, address,title } });
    },
    goActicle(id,title){
      this.setWebSite(1);
      this.$router.push({path: '/articledetails', query: {id,title}})
    },
    getHotData() {
      let data = {
          current:1,
          size:3,
          type:1,
          // webSite:1,
          auditStatus:2
        }
      apiGetGameInfoBySevenDay(data)
        .then(res => {
          if (res.code === 200) {
            let contentGameData = res.data.records;
            this.recommenBoxList = contentGameData;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
  }
};
</script>
<style lang="less" scoped>
.gameRecommen {
  width: 270px;
  background: #4c4c50;
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  max-height: 550px;
  padding-bottom: 15px;
  height: auto;
  .headWrap {
    display: flex;
    justify-content: space-between;
    height: 60px;
    .left {
      display: flex;
      align-items: center;
      padding-left: 20px;
      span {
        font-size: 18px;
        font-weight: bold;
        color: #ffffff;
        position: relative;
        left: 28px;
      }
      span::after {
        position: absolute;
        content: "";
        width: 25px;
        height: 3px;
        background: linear-gradient(90deg, #ecb639 0%, #ee8a22 100%);
        left: -25%;
        top: 43%;
        // margin-left: -25%;
      }
    }
  }
  .recommenWrap{
    max-height: 630px;
    height: auto;
    overflow-y: auto;
     .recommenBox {
        cursor: pointer;
        padding: 15px 31px;
        position: relative;
        .imgScaleBox{
          width: 228px;
          height: 127px;
          border-radius: 8px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .act-pr{
          position: absolute;
          top: 15px;
          background: linear-gradient(180deg, rgba(76, 76, 80, 0) 0%, rgba(76, 76, 80, 0.79) 100%);
          width: 228px;
          height: 127px;
          padding:80px 6px 10px;
          box-sizing: border-box;
        }
        .act-title {
          font-size: 16px;
          line-height: 20px;
          color: #e8e8e8;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: left;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          // height: 45px;
          -webkit-box-orient: vertical;
          text-shadow: 1px 0px  #000;
          // width: 210px;
          // 
        }
        .createIcon{
          i{
            font-size: 40px;
            font-weight: bold;
            color: #666;
          }
        }
        .createTitle{
          line-height: 25px;
          font-size: 18px;
           color: #666;
        }
    }
    .createContent{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

  }
 
}
</style>