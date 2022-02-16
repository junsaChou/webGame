<template>
  <div id="certify" class="gw-shadow" >
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(itme,i) in bannerData" :key="i"  @click="goBack(itme.photoLink)">
          <div>
              <img  :src="itme.photoSrc+'?x-oss-process=image/auto-orient,1/quality,q_70/format,webp'" />
              <p class="photoTitle">{{itme.photoTitle}}</p>
          </div>
       
        </div>
      </div>
    </div>
    <!-- <div class="swiper-button-next"></div> -->
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  name: "swiper",
  props: {
    bannerData:{
        type: Array,
        default: () => [],
    }
  },
  methods: {
    goBack(url){
        // console.log(url);
        window.open(url)
        // return ;
        // window.location.href = url;
        // window.open(url)
    },
    initSwiper() {
      new Swiper("#certify .swiper-container", {
        // watchSlidesProgress: true,
        // slidesPerView: 'auto',
        // centeredSlides: true,
        
        loop: true,
        loopedSlides: 3,
        autoplay:{
          // delay : 3000,
          disableOnInteraction: false,
        },
        // navigation: {
        // 	nextEl: '.swiper-button-next',
        // 	prevEl: '.swiper-button-prev',
        // },
        pagination: {
          el: ".swiper-pagination"
          //clickable :true,
        },
        on: {
          progress: function(progress) {
            var i = this.slides.length;
            for (i = 0; i < this.slides.length; i++) {
              var slide = this.slides.eq(i);
              var slideProgress = this.slides[i].progress;
              var modify = 1;
              if (Math.abs(slideProgress) > 1) {
                modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
              }
              var translate = slideProgress * modify * 60 + "px";
              var scale = 1 - Math.abs(slideProgress) / 5;
              var zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
              slide.transform(
                "translateX(" + translate + ") scale(" + scale + ")"
              );
              slide.css("zIndex", zIndex);
              slide.css("opacity", 1);
              if (Math.abs(slideProgress) > 1) {
                slide.css("opacity", 0);
              }
            }
          },
          setTransition: function(transition) {
            for (var i = 0; i < this.slides.length; i++) {
              var slide = this.slides.eq(i);
              slide.transition(transition);
            }
          }
        }
      });
    }
  },
  mounted() {},
  created() {}
};
</script>

<style >
 #certify {
  position: relative;
  /* width: 879px; */
  /* width: 100%; */
}
#certify .swiper-slide {
  width: 100%;
  /* width: 1200px; */
  /* height: 378px; */
  cursor: pointer;
  position: relative;
}
#certify .swiper-slide img {
  width: 100%;
  border-radius: 8px;
  /* width: 1200px; */
  object-fit: cover;
  height: 378px;
  /* height: 100%; */
  display: block;
}
#certify .swiper-slide .photoTitle {
	position: absolute;
	text-align: left;
	left: 5%;
	bottom: 13%;
  /* width: 500px; */
  min-width: 200px;
	height: 44px;
	font-size: 40px;
	color: #FFFFFF;
	text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.16);
}

#certify .swiper-pagination {
  width: 100%;
  bottom: 4%;
}

#certify .swiper-pagination-bullets .swiper-pagination-bullet {
  margin: 0 5px;
  width: 16px;
  height: 5px;
  background: #E8E8E8;
  opacity: 0.4;
  border-radius: 4px;
}

#certify .swiper-pagination-bullets .swiper-pagination-bullet-active {
  /* border: 3px solid #00aadc; */
  background: linear-gradient(90deg, #ECB639 0%, #EE8A22 100%);
   opacity: 1;
}

#certify .swiper-button-prev {
  left: -30px;
  width: 45px;
  height: 45px;
  /* background: url(../../src/img/wm_button_icon.png) no-repeat; */
  background-position: 0 0;
  background-size: 100%;
}

#certify .swiper-button-prev:hover {
  background-position: 0 -46px;
  background-size: 100%;
}

#certify .swiper-button-next {
  right: 50%;
  margin-right: -75px;
  width: 150px;
  height: 150px;
  margin-top: 120px;
  /* background: url(../../src/img/icon4.gif) no-repeat; */
  background-size: 150px 150px;
}
.swiper-slide-active {
  border-bottom: 0px !important;
}
</style>