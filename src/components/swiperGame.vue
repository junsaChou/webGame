<template>
  <div class>
    <div id="certifyGame" ref="certifyGames" >
      <div class="swiper-container">
        <div class="swiper-wrapper" >
          <div class="swiper-slide" v-for="(itme,i) in hotSwiper" :key="i" >
            <div class="services"   >
              <div class="service-item" v-for="(k,j) in itme" :key="j" @click="goUrl(k.id,k.name)"> 
                <div class="service-img">
                  <img  class="imgScale" :src="k.gameResources ?  k.gameResources[0].src+'?x-oss-process=image/auto-orient,1/quality,q_70/format,webp':'https://slideshow-photo.oss-ap-southeast-1.aliyuncs.com/gameslideshow/20211119/a0a24ef71d174f1aa5302cb0c80d933e.png?x-oss-process=image/auto-orient,1/quality,q_70/format,webp'"  />
                </div>
                <div class="service-btm">
                  <div class="btm-nav">
                    <div class="logo">
                       <img  :src="k.icon ? k.icon+'?x-oss-process=image/auto-orient,1/quality,q_70/format,webp' : 'https://slideshow-photo.oss-ap-southeast-1.aliyuncs.com/gameslideshow/20211119/a0a24ef71d174f1aa5302cb0c80d933e.png?x-oss-process=image/auto-orient,1/quality,q_70/format,webp' " />
                    </div>
                    <h4 class="service-title">{{k.name }}</h4>
                  </div>
                  <p
                    class="service-content"
                  >{{k.introduction }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="swiper-scrollbar"></div> -->
      <div class="swiper-button-next swiper-button-white">
      </div>
      <div class="swiper-button-prev swiper-button-white">
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  name: "swiperGame",
  // props:['hotData'],
  props: {
    hotData:{
        type: Array,
        default: () => [],
    }
  },
  data(){
    return{
      swiperWidth: 1200
    }
  },
  computed:{
    hotSwiper:function(){
      var result = [];
      var hotArr = this.hotData
      // let swiperWidth = this.$refs.certifyGames.clientWidth;
      hotArr.forEach((i,k) => {
        if(i.gameResources){
          i.bigImg = i.gameResources[0].src;
        }
       
        if( this.swiperWidth< 1024 && this.swiperWidth > 720  ){
          if(k % 3 === 0 ){
            result.push(hotArr.slice(k,k+3));
          }
        }else if( this.swiperWidth< 721 ){
          if(k % 2 === 0 ){
            result.push(hotArr.slice(k,k+2));
          }
        }else{
          if(k % 5 === 0 ){
            result.push(hotArr.slice(k,k+5));
          }
        }
     
      })
      result = JSON.parse( JSON.stringify(result));
      return result
    }
  },
  methods:{
     goUrl(id,address){
       this.$router.push({path: '/gameDetail', query: {id,address}})
    },
    initSwiperGame(){
       new Swiper("#certifyGame .swiper-container", {
          scrollbar: {
            el: '.swiper-scrollbar',
            hide: false,
            draggable: false,
            snaponrelease: true,
            dragsize: 20,
          },
          loop:false,
            navigation:{
              nextEl:'.swiper-button-next',
              prevEl:'.swiper-button-prev'
            }
        });
    },
    swiperWidthDom(){
      let that = this
      // window.onresize= () => {
      //   return (() => {
          that.$nextTick(() => {
            //  that.swiperWidth = that.$refs.certifyGames.clientWidth
            that.swiperWidth = document.body.clientWidth
            // console.log( that.swiperWidth )
          })
         
      
        // })();
      // }
    },
  },

  mounted() {
      this.swiperWidth = document.body.clientWidth
      window.addEventListener('resize', this.swiperWidthDom,true)
 
    // this.swiperWidthDom();
  },
  watch:{
    swiperWidth:{//深度监听，可监听到对象、数组的变化
         handler(newVal, oldVal){
            if( newVal != oldVal){
               this.swiperWidth  = newVal;
            }
         },
        //  deep:true //true 深度监听
     }
  },
  destroyed(){
    window.removeEventListener('resize', this.swiperWidthDom,true)
  }
};
</script>

<style lang="less">

#certifyGame {
  position: relative;
  // width: 1200px;
  // margin: 0 auto;
}
#certifyGame .swiper-container {
  // padding-bottom: 60px;
  margin: 0 auto 0px;

}
.swiper-scrollbar{
  height: 5px;
  width: 80%;
  margin: 0 auto;
  background-color: #828285;
  .swiper-scrollbar-drag{
    background-color: #ECB639;
  }
}
#certifyGame .swiper-slide {
  // height: 320px;
  margin-top: 30px;
  .services {
    display: flex;
    justify-content: space-between;
    // display: grid;
    .service-item {
      // width: 208px;
      width: 18%;
      transition: 0.4s;
      box-sizing: border-box;
      // overflow: hidden;
      cursor: pointer;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      background-color: #4C4C50;
      align-items: center;
      /* padding: 24px; */
      box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.06);
      .service-img{
        border-radius: 8px;
        width: 100%;
        // width: 208px;
        width: 100%;
        overflow: hidden;
        height: 123px;
      }
      .service-btm {
        /* display: flex; */
        width: 100%;
        box-sizing: border-box;
        padding: 10px 10px 20px;
        .btm-nav {
          display: flex;
          padding-left: 6px;
          .logo{
            width: 48px;
            height: 48px;
            margin: -20px 15px 0 0;
            box-sizing: border-box;
            border-radius: 6px;
            background: #fff;
            position: relative;
            z-index: 10;
            img {
              width: 46px;
              position: relative;
              left:  3px;
              top: 3px;
              height: 46px;
              border-radius: 6px;
             
            }
          }
      
          .service-title {
            height: 28px;
            grid-area: title;
            text-align: left;
            /* color: var(--text-color-darker); */
            color: #fff;
            font-size: 18px;
            text-overflow:ellipsis;
            width: 130px;
            white-space: nowrap;
            overflow: hidden;
          }
        }
        .service-content {
          // text-indent: 1em;
          height: 98px;
          margin-top: 10px;
          grid-area: content;
          word-break: break-word;
          font-size: 16px;
          line-height: 24px;
          color: #E8E8E8;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: left;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          /* letter-spacing: 15px; */
        }
      }
    }
  }
}
#certifyGame .swiper-slide img {
  display: block;
}
#certifyGame .swiper-slide p {
  text-align: center;
}

#certifyGame .swiper-pagination {
  width: 100%;
  bottom: 20px;
}

#certifyGame .swiper-pagination-bullets .swiper-pagination-bullet {
  margin: 0 5px;
  border: 3px solid #fff;
  background-color: #d5d5d5;
  width: 10px;
  height: 10px;
  opacity: 1;
}

#certifyGame .swiper-pagination-bullets .swiper-pagination-bullet-active {
  border: 3px solid #00aadc;
  background-color: #fff;
}

#certifyGame .swiper-button-prev {
  z-index: 1000;
  top: 50%;
  left: -30px;
}

#certifyGame .swiper-button-next {
  right: -30px;
  // margin: 0 -30px 0 0;
  z-index: 1000;
  top: 50%;
}
#certifyGame .swiper-button-next,#certifyGame .swiper-button-prev{
  width: 24px;
  height: 70px;
  background-color: #4C4C50;
  border-radius: 30px;
  color: #6E6E6E;
  background-size: 50% 80%;
  filter:drop-shadow( 0 0 0px #6E6E6E);
}
.swiper-slide-active {
  border-bottom: 0px !important;
}
</style>