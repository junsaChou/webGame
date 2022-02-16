<template>
  <div class="bannerBox">
    <div class="swiper-container gallery_top">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) of detailData" :key="index">
          <img class="gallery_topimg1" :src="item.src+'?x-oss-process=image/auto-orient,1/quality,q_70/format,webp'" />
        </div>
      </div>
      <div class="swiper-pagination" style="display:none;"></div>
    </div>
    <div class="swiper-isbar" ></div>
    <div class="swiper-container gallery_thumbs">
      <div class="swiper-wrapper">
        <div class="swiper-slide swiper-bottom" v-for="(item, index) of detailData" :key="index">
          <div class="gallery_topimg_box">
            <img class="gallery_topimg" :src="item.src+'?x-oss-process=image/auto-orient,1/quality,q_70/format,webp'" />
            <!-- <div class="gallery_topimg_name">相册名称1</div> -->
          </div>
        </div>
      </div>
      <!-- <div class="swiper-button-prev swiper-button-white">
        <img class="prev_left" src="../../assets/icon_left.png" alt />
      </div>
      <div class="swiper-button-next swiper-button-white">
        <img class="prev_right" src="../../assets/icon_right.png" alt />
      </div> -->
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  name: "swiperDetail",
  data() {
    return {
      // bigImg: [
      //   {img:require("@/assets/img/newgame01.png")},
      //   {img:require("@/assets/img/newgame02.png")},
      //   {img:require("@/assets/img/newgame03.png")},
      //   {img:require("@/assets/img/newgame04.png")}
      // ],
      galleryThumbs: {},
      
   
    };
  },
  props: {
    detailData:{
        type: Array,
        default: () => [],
    }
  },
  mounted() {
  },
  methods: {
    galleryTopLunbo() {
       new Swiper(".gallery_top", {
        spaceBetween: 0,     
        loop: true,
        autoplay:{
          // delay : 3000,
          disableOnInteraction: false,
        },
        loopedSlides: 4,
        pagination: {
          el: '.swiper-pagination',
          //clickable :true,
        },
        thumbs: {
          //thumbs组件专门用于制作带缩略图的swiper
          swiper: this.galleryThumbs,
          slideThumbActiveClass: "swiper-slide-thumb-active",
        }
      })
    },
     galleryThumbsLunbo() {
       this.galleryThumbs = new Swiper(".gallery_thumbs", {
        //  navigation: {
        //    nextEl: ".swiper-button-next",
        //    prevEl: ".swiper-button-prev",
        //  },
         spaceBetween: 12, //在slide之间设置距离（单位px）
         slidesPerView: 4, //设置slider容器能够同时显示的slides数量
         loop: true, //设置为true 则开启loop模式
         freeMode: true, //默认为false，普通模式：slide滑动时只滑动一格
         loopedSlides: 7, //一般设置大于可视slide个数2个即可
         watchSlidesVisibility: true, //开启watchSlidesVisibility选项前需要先开启watchSlidesProgress
         watchSlidesProgress: true, //开启这个参数来计算每个slide的progress(进度、进程)
       });
     },
  },
  created() {
    // this.initSwiper();
    // this.$nextTick( ()=> {  
    //   this.galleryThumbsLunbo();
    //   this.galleryTopLunbo();
    // })
  }
};
</script>
<style lang="less" scoped>

.swiper-isbar{
  height: 12px; 
  width: 100px;
}
.swiper-container {
  // width: 1200px;
  width: 100%;
  height: 320px;
  //   margin: 60px auto 60px;
  //   padding: 40px 0px 120px 0px;
  //   overflow: hidden;

  .swiper-slide {
    background-size: cover;
    background-position: center;
  }
  &.gallery-top {
    height: 80%;
    width: 100%;
  }
  &.gallery-thumbs {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
    .swiper-slide {
      width: 25%;
      height: 100%;
      opacity: 0.4;
    }
    .swiper-slide-active {
      opacity: 1;
    }
  }
}

</style>
<style >
.gallery_top .swiper-pagination-bullets .swiper-pagination-bullet-active {
  /* border: 3px solid #00aadc; */
  background: linear-gradient(90deg, #ECB639 0%, #EE8A22 100%);
}
 .prev_right,
 .prev_left {
   width: 20px;
   height: 20px;
 }
 .swiper-button-next {
   width: 26px;
   height: 100px;
   /* background: #000000; */
   border-radius: 2px;
   /* opacity: 0.3; */
   right: 0;
   top: 20px;
   display: flex;
   align-items: center;
   justify-content: center;
 }
 .swiper-button-prev {
   width: 26px;
   height: 100px;
   /* background: #000000; */
   border-radius: 2px;
   /* opacity: 0.3; */
   left: 0;
   top: 20px;
   display: flex;
   align-items: center;
   justify-content: center;
 }
 .gallery_topimg_name {
   position: absolute;
   bottom: 5px;
   left: 0;
   width: 100%;
   background: rgba(0, 0, 0, 0.2);
   font-size: 14px;
   font-weight: 400;
   color: #ffffff;
   line-height: 20px;
 }
 .gallery_topimg_box {
   cursor: pointer;
   position: relative;
   background: #000;
   overflow: hidden;
   text-align: center;
   width: 210px; 
   height: 150px;
   border-radius: 8px;
   opacity: 0.8;
 }
 .gallery_topimg1 {
   width: 100%;
   height: 100%;
 }
 .gallery_topimg {
   width: 100%;
   height: 100%;
   object-fit: cover;
   filter: alpha(opacity=80);
 }
 .bannerBox .gallery_top {
   width: 100%;
   height: 400px;
   border-radius: 8px;
 }
 .bannerBox .gallery_thumbs {
   width: 100%;
   height: 150px;
 }
 .bannerBox .swiper-slide-thumb-active .gallery_topimg_box .gallery_topimg {
   opacity: 1;
 }
 .bannerBox .swiper-slide-thumb-active .gallery_topimg_box {
   /* background: #fff; */
   opacity: 1;
 }
</style>