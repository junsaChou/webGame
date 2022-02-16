<template>
  <div class="main con">
    <!-- 热门内容 -->
    <div class="game-calendar-contents">
      <section  class="company-activities">
        <div class="gameSection">
          <div class="gameContent">
              <div class="service-btm" @click="goUrl(detailWrap.id,detailWrap.name)">
                <div class="btm-nav">
                  <img class="imgScale" :src="detailWrap.gameResources?  detailWrap.gameResources[0].src+'?x-oss-process=image/auto-orient,1/quality,q_70/format,webp': 'https://slideshow-photo.oss-ap-southeast-1.aliyuncs.com/gameslideshow/20211119/a0a24ef71d174f1aa5302cb0c80d933e.png?x-oss-process=image/auto-orient,1/quality,q_70/format,webp'" />
                </div>
                <div class="service-wrap">
                  <h4 class="name">{{detailWrap.name}}</h4>
                  <!-- <p class="detail">{{detailWrap.phase}}</p> -->
                  <div class="btns">
                    <button v-for="(j,k) in  detailWrap.type" :key="k">{{j.typeName}}</button>
                  </div>
                  <div class="act-detail">
                    {{ detailWrap.introduction }}
                  </div>
                  <div class="read-more"  >
                    View Details    >
                  </div>
                </div>
              </div>
              <div class="calendarTitle">Event Detail</div>
              <div class="table">
                  <ul>
                    <li><span class="name">Time</span><span class="info"><span >{{calendarInfo.dateInfoEng}}(UTC)</span></span></li>
                    <li><span class="name">Type</span><span class="info">{{ calendarInfo.eventInfo }}</span></li>
                    <li><span class="name">Address</span><span class="info">{{calendarInfo.address}}</span></li>
                    <li><span class="name">Info</span><span class="info preWrap">{{calendarInfo.description}}</span></li>
                    <!-- <li><span class="name">Info</span><span class="info"><span v-html="calendarInfo.description"></span></span></li> -->
                  </ul>
                </div>
          </div>
          <div class="navRight">
            <!-- :calendarDateObj="calendarInfo"  -->
            <calendarBOx :calendarDateObj="calendarInfo" v-if="calendarInfo.id"></calendarBOx>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import calendarBOx from "@/components/calendar";
//详情
import { apiGetCalendarDetail } from "@/api/calendar ";
import {  mapMutations } from "vuex";
export default {
  name: "calendardetails",
  components: {
    calendarBOx
  },
  data() {
    return {
      detailWrap:{},
      calendarInfo:{}
    };
  },
  watch:{
    '$route.query.id':function(newVal,oldVal) {
      this.PostFetchData(newVal);
      // if(newVal != oldVal){
      //     this.PostFetchData(newVal);
      // }
    }
  },
  methods: {
    ...mapMutations([ "setWebSite"]),
    goUrl(id,address){
      // this.setWebSite(1);
      this.$router.push({path: '/gameDetail', query: {id,address}})
    },
    PostFetchData(id) {
      // let data = { id,webSite:this.webSite,userId:uid};
      let data = {eventId:id };
      apiGetCalendarDetail( data )
        .then(res => {
          if (res.code === 200) {
            let { data } = res;
            if ( data ){
               this.calendarInfo = {};
              this.detailWrap = data.gameInfo;
              let {dateInfo,description,gameName,address,id,eventInfo,dateInfoEng } = data;
              dateInfo = dateInfo.replace( /-/g,"/")
              // console.log(dateInfo)
              let  date = new Date(dateInfo);
              let calendarDate = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
              let calendarMonth = `${date.getFullYear()}/${date.getMonth()+1}`;
              this.calendarInfo =  {dateInfo,description,gameName,address,id,calendarDate,calendarMonth,eventInfo,dateInfoEng };
              console.log(description)
            }
            // this.detailWrap = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  created(){
    let queryList = this.$route.query;
    if(queryList.id){
      this.detailId = queryList.id;
      this.PostFetchData(this.detailId)
    }
  },
};
</script>
<style lang="less" scoped>
.main{
  .game-calendar-contents {
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
                    margin: 10px 0;
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
                  .act-detail {
                    height: 70px;
                    grid-area: content;
                    word-break: break-word;
                    font-size: 16px;
                    line-height: 24px;
                    color: #e8e8e8;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-align: left;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
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
            .calendarTitle{
              box-sizing: border-box;
              width: 100%;
              padding-left: 20px;
              font-weight: bold;
              font-size: 18px;
              line-height: 40px;
              background: #4C4C50;
              box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.16);
              border-radius: 6px;
              text-align: left;
              color: #FFFFFF;
              margin: 30px 0;
            }
            .table {
              min-height: 400px;
              background: #4C4C50;
              box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.16);
              border-radius: 8px;
              padding: 20px 27px 30px 20px;
              ul{
                width: 100%;
                display: grid;
                grid-template-columns: 100%;
                row-gap: 10px;
                li{
                  display: grid;
                  width: 100%;
                  grid-template-columns:160px 1fr;
                  grid-column-gap: 30px;
                  // white-space: nowrap;
                  span{
                    padding: 5px 8px;
                    // height: 40px;
                    background: #828285;
                    border-radius: 6px;
                    line-height: 30px;
                    word-wrap:break-word;
                    word-break:break-all; 
                  }
                  .info{
                    padding-left: 12px;
                    color: #fff;
                    span{
                      text-align: left;
                      padding-right: 3px;
                    }
                  }
                  .name{
                    text-align: center;
                   
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    // vertical-align: middle;
                    color: #fff;
                  }
                }
              }
            }
          }
          .navRight{
            .gameFiWrap{
              width: 100%;
            }
          }
        } 
      
     
    }
  
  }
}
@import '../../assets/css/common.less'; 
</style>