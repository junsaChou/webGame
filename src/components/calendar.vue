<template>
  <div class="gameFiWrap">
    <div class="headWrap">
      <div class="left">
        <span>GameFi Calendar</span>
      </div>
      <i class="el-icon-message-solid" :class="{ sendInfo: isSend==0?false:true }" v-preventReClick @click="clickAttention"></i>
    </div>
    <div class="gameFiMain" >
       <!--     :markDate="calendarArr"         :sundayStart='true'    v-on:isToday="clickToday" -->
        <Calendar
            ref="Calendar"
            :textTop="['S','M','T','W','T','F','S']"
            :markDateMore="calendarArr"
            agoDayHide="1530115221"
            :class="{ active:isActive }"
            @choseDay="clickDay"
            @changeMonth="changeDate"
            >
        </Calendar>
        <div class="gameFiContent" v-if="byDayDetail.length>0">
            <div class="gameFiInfo " :class="[ calendarDateObj.id &&calendarDateObj.id==item.id ? 'active':'']"   v-for="item in byDayDetail" :key="item.id" @click="goUrl(item.id,item)">
                <div class="title">
                  <!-- Empire Warriors -->{{ item.gameName ? item.gameName :'Empire Warriors'  }}
                </div>
                <div class="box">
                    <div class="date">{{ item.dateWrap? item.dateWrap : '16:40' }}(UTC)</div>
                    <button > {{ item.eventInfo ? item.eventInfo :'IDO'  }}</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
// 详情 当天日历信息  当月日历信息
import { apiGetCalendarDetail,apiGetMonthEventByDay,apiGetMonthEventByYearMonth,apiCalendarSendToUser } from "@/api/calendar ";
import Calendar from "./vue-calendar-component";
import { formatMonth } from '@/utils'
import { mapGetters,mapMutations } from 'vuex'
export default {
  name: "calendarBOx",
  props: {
    calendarDateObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
        searchYearMonth:'',//当前月份
        searchDay:'',//当前天数
        isActive: false,
        byDayDetail:[],//当天日历详情
        calendarArr: [],
        userInfo: {},
        isSend: 0,
        flag:false,
        isGetDate:'', //是否是今天的日期
        isParent:''
    };
  },
  watch:{
    'userInfoList':function(newVal,oldVal) {
      if( newVal!=null & newVal != undefined  ){
      
          this.userInfo = JSON.parse(newVal)
          if ( this.getSendEmail != null && this.getSendEmail != undefined && this.getSendEmail!=''){
            this.isSend = this.getSendEmail
          }else{
            this.isSend = 0;
          }
      }else{
        this.isSend = 0;
        this.userInfo= [];
      }
    }
  },
  components: {
    Calendar
  },
  created(){
    this.isParent = JSON.stringify( this.calendarDateObj);
    let  date = new Date();
    this.isGetDate= `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
    if(  this.isParent  != '{}'){
      let { calendarDate,calendarMonth } = this.calendarDateObj;
      this.searchYearMonth = calendarMonth;
      this.searchDay = calendarDate;
      this.getByYearMonth(this.searchYearMonth)
    }else{
          this.searchYearMonth = `${date.getFullYear()}/${date.getMonth()+1}`;
          this.searchDay = this.isGetDate;
          this.getByYearMonth(this.searchYearMonth)
    }

    if( this.userInfoList != undefined & this.userInfoList != null   ){
        this.userInfo = JSON.parse(this.userInfoList)
        if ( this.getSendEmail.toString() != 'null' && this.getSendEmail.toString() != 'undefined' ){
          this.isSend = this.getSendEmail
        }else{
          this.isSend = 0;
        }
    }else{
      this.isSend = 0;
      this.userInfo= [];
    }
  },
  methods: {
    ...mapMutations([ "setFormVisible",'setSendEmail','setCalendarDate','setCalendarId']),
    clickAttention(){
      if(Object.keys(this.userInfo).length == 0 ){
           this.$message({
              type: 'warning',
              message: 'Please sign in first'
          })
          this.setFormVisible(true)
          return
      }
      let sendEmail = 0;
      let sendTitle = '';
      let confirmButtonText,cancelButtonText;
      if(  this.isSend  == 0 ){
        sendEmail = 1;
        sendTitle = 'Do you need a weekly email subscription?';
        confirmButtonText = 'Subscribe';
        cancelButtonText = 'Cancel';
        
      }else{
        sendEmail = 0;
        sendTitle = 'Do you need to cancel the weekly email subscription?';
        confirmButtonText = 'Yes';
        cancelButtonText = 'No';
      }
      this.$confirm(sendTitle, '', {
          cancelButtonText: cancelButtonText,
          confirmButtonText: confirmButtonText,
          type: 'warning'
        }).then(() => {
          this.getSendEmailClick(sendEmail);
        })
    
    },  
    getSendEmailClick(sendEmail){//订阅api
      let data = { userId:this.userInfo.uid,sendEmail }
      apiCalendarSendToUser( data )
        .then(res => {
          if (res.code === 200) {
            let { sendEmail } = res.data;
            if ( sendEmail == 1){
              this.$message({
                type: 'success',
                message: 'Subscribed successfully'
              })
            }else{
                this.$message({
                  type: 'success',
                  message: 'Unsubscribed successfully'
                })
            }
            this.isSend = sendEmail;
            this.setSendEmail(sendEmail);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getByYearMonth(searchYearMonth) {
      apiGetMonthEventByYearMonth({ searchYearMonth:searchYearMonth.replace( /\//g,"-") })
        .then(res => {
          if (res.code === 200) {
           let { data } = res;
           if( data && data.length>0 ){
              this.calendarArr = [];
              data.forEach((item,i) => {
                this.calendarArr.push({ date:item.replace( /\//g,"-"),className: "mark2" })
              });
           }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getByDayDetail(searchDate  ) {
      
      apiGetMonthEventByDay({searchDate: searchDate.replace( /\//g,"-") })
        .then(res => {
          if (res.code === 200) {
           let { data } = res;
           this.byDayDetail = [];
           if( data && data.length>0 ){
              data.forEach((item,i)=>{
                this.byDayDetail[i] = {...item,dateWrap:this.getDateHour(item.dateInfo) }
              })
          
           }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getDateHour(data){
      let  date = new Date(data);
      let h =  date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()
      let m = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
      let dateWrap = `${h}:${m}`
       return dateWrap
    },
    clickDay(data) {
      if ( data!== this.isGetDate ){
        this.isActive = true;
      }else{
        this.isActive = false;
      }
      // data = data.replace( /\//g,"-");
      this.getByDayDetail(data)
    },
    clickToday(data) {
    },
    changeDate(data) {
      // data = data.replace( /\//g,"-")
      this.searchYearMonth  = data
      this.getByYearMonth( data ) 
      this.$nextTick(()=>{
          this.dateHead(data)
      })
      // console.log("左右点击切换月份", data); //左右点击切换月份
    },
    goUrl(id,data){
      this.$router.push({path: '/calendardetails', query: {id}})
    },
    dateHead(box){
      let x,y;
      if ( box ){
           let str = box.split('/');
            x= str[1];
            y = str[0];
            document.getElementsByClassName("wh_content_li")[0].innerHTML = formatMonth(x)+'&nbsp &nbsp'+ y;
      }else{
          let month = document.getElementsByClassName("wh_content_li")[0].innerText;
          if ( month.indexOf('月')==-1){
            return
          }
             y = month.match(/(\S*)年/)[1];
             x = month.match(/年(\S*)月/)[1];
            document.getElementsByClassName("wh_content_li")[0].innerHTML = formatMonth(x)+'&nbsp &nbsp'+y;
      }
    }
  },
  computed: {
    ...mapGetters(['userInfoList','getSendEmail','getCalendarDate','getCalendarId']),
  },
  mounted(){
    this.$nextTick(()=>{
      this.clickDay(this.searchDay);
      if( this.isParent != '{}' ){
        let { calendarDate } = this.calendarDateObj;
        let  data = calendarDate.replace( /\//g,"-");
        this.$refs.Calendar.ChoseMonth(data); //跳到12月12日选中12月12日
        this.dateHead(this.searchYearMonth )
      }else{
        this.dateHead()
      }
    })

  }
};
</script>
<style lang="less" scoped>
.gameFiWrap {
  width: 100%;
  background: #4c4c50;
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  max-height: 550px;
  padding:0 0 17px;
  height: auto;
  .headWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 26px;
    .left {
      span {
        font-size: 18px;
        font-weight: bold;
        color: #ffffff;
        position: relative;
      }
    }
    i{
        font-size: 20px;
        color: #949495;
        cursor: pointer;
    }
    .sendInfo{
      color: #EE8A22;
    }
  }
  .gameFiMain{
    padding: 0 10px;
    max-height: 630px;
    height: auto;
    .gameFiContent{
        .gameFiInfo{
            cursor: pointer;
            padding:0 16px 0 30px;
            position: relative;
            &::after{
                content: '';
                position: absolute;
                left: 16px;
                top: 12px;
                width: 4px;
                height: 4px;
                background: #EE8A22;
                border-radius: 50%;

            }
            .title,.date{
                font-size: 18px;
                text-align: left;
                line-height: 30px;
                text-overflow: ellipsis;
                width: 130pxpx;
                white-space: nowrap;
                overflow: hidden;
                color: #fff;
                position: relative;
            }
            .box{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .date{
                  font-size: 14px;
                  color: #ACACAC;
                }
                button{
                    height: 18px;
                    border: 1px solid #ACACAC;
                    border-radius: 4px;
                    color: #ACACAC;
                    background-color: transparent;
                    font-size: 14px;
                    line-height: 14px;
                }
            }
        }
        .active{
          background: linear-gradient(270deg, #EE8A22 0%, #ECB639 100%);
          border-radius: 8px;
          &::after{
              content: '';
              position: absolute;
              left: 16px;
              top: 12px;
              width: 4px;
              height: 4px;
              background: #fff;
              border-radius: 50%;

          }
          .title,.date{
            color: #fff!important;
          }
          .box{
            button{
              color: #fff;
              border: 1px solid #fff;
            }
          }
        
        }
     
    }
  
  }
 
}
</style>
<style scoped>
.wh_container >>>.wh_content_all{
    background-color: transparent;
}
.wh_container >>>.wh_content_all .wh_top_changge li .wh_jiantou1,.wh_container >>>.wh_content_all .wh_top_changge li .wh_jiantou2 {
    /* background: #828285; */
    border-color: #ACACAC;
}
/* ,.wh_container >>>.wh_content_item .wh_isToday */
.wh_container >>> .mark2 {
  background-color: transparent;
  position: relative;
}
.wh_container >>>  .wh_content_item .wh_item_date{
    /* font-size: 18px; */
}
.wh_container >>> .mark2::after{
    content: '';
    width: 30%;
    height: 3px;
    background: linear-gradient(270deg, #EE8A22 0%, #ECB639 100%);
    position: absolute;
    bottom: 0;
}
.wh_container >>>.wh_content_item .wh_chose_day,.wh_container >>>.wh_item_date:hover,.wh_container >>>.wh_content_item .wh_isToday {
    background: #EE8A22!important;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
    font-weight: bold;
}
.wh_container >>>.wh_content_item .wh_other_dayhide, .wh_container >>>.wh_content_item .wh_want_dayhide{
    display: none;
}
.wh_container >>>.wh_content_item .wh_chose_day::after,.wh_container >>>.wh_content_item .wh_isToday::after{
  background: none;
}
.active >>>.wh_content_item .wh_isToday{
  background: transparent!important;
  box-shadow: none;
  border-radius: 0;
}

</style>