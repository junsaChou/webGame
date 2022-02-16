<template>
  <div>
    <div class="swiper-container gallery-top">
      <div class="swiper-wrapper"  :options='galleryTop' ref="galleryTopDom">
        <div class="swiper-slide">
          <img alt="一站式智能营销解决方案" src="../assets/img/newgame01.png" />
        </div>
        <div class="swiper-slide">
          <img alt="一站式智能营销解决方案" src="../assets/img/newgame02.png" />
        </div>
        <div class="swiper-slide">
          <img alt="一站式智能营销解决方案" src="../assets/img/newgame03.png" />
        </div>
        <div class="swiper-slide">
          <img alt="一站式智能营销解决方案" src="../assets/img/newgame04.png" />
        </div>
      </div>
      
      <!-- Add Arrows -->
    </div>
    <div class="swiper-container gallery-thumbs">
      <div class="swiper-wrapper" :options='galleryThumbs' ref="galleryThumbsDom">
        <div class="swiper-slide">
          <img alt="一站式智能营销解决方案" src="../assets/img/newgame01.png" />
        </div>
        <div class="swiper-slide">
          <img alt="一站式智能营销解决方案" src="../assets/img/newgame02.png" />
        </div>
        <div class="swiper-slide">
          <img alt="一站式智能营销解决方案" src="../assets/img/newgame03.png" />
        </div>
        <div class="swiper-slide">
          <img alt="一站式智能营销解决方案" src="../assets/img/newgame04.png" />
        </div>
      </div>
      <div class="swiper-button-next swiper-button-white"></div>
      <div class="swiper-button-prev swiper-button-white"></div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  name: "swiper_coverflow",
  data() {
    return {
        galleryThumbs:{
            spaceBetween: 10,
            centeredSlides: true,
            slidesPerView: "auto",
            touchRatio: 0.2,
            slideToClickedSlide: true,
            navigation:{
              nextEl:'.swiper-button-next',
              prevEl:'.swiper-button-prev'
            }
        },
        galleryTop:{
            spaceBetween: 10
        }
    };
  },
  props: ["listData"],
  mounted() {
    // if(this.$refs.galleryTopDom){
    //   this.$nextTick(()=>{
    //     const swiperTop = this.$refs.galleryTopDom.swiper
    //     const swiperThumbs = this.$refs.galleryThumbsDom.swiper
    //     swiperTop.controller.control = swiperThumbs
    //     swiperThumbs.controller.control = swiperTop
    //   })
    // }
      
  },
  methods: {
    initSwiper: function() {
        var galleryTop = new Swiper(".gallery-top", {
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween: 10
        });
        var galleryThumbs = new Swiper(".gallery-thumbs", {
        // nextButton: ".swiper-button-next",
        // prevButton: ".swiper-button-prev",
          spaceBetween: 10,
          centeredSlides: true,
          slidesPerView: "auto",
          touchRatio: 0.2,
          slidesPerView: 4,
          slideToClickedSlide: true,
          watchSlidesVisibility: true
        });
        // controller
        // galleryTop.params.control = galleryThumbs;
        // galleryThumbs.params.control = galleryTop;
    }
  },
  created() {
    // this.initSwiper();
  }
};
</script>
<style lang="less" scoped>
.swiper-container {
  width: 1200px;
  height: 320px;
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