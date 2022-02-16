<template>
  <div class="stairs">
    <div class="shareMenu"  v-for=" (item,i) in shareMenus" :key="i" @click="goBack(item.name)">
      <img  :src="item.src" alt />
    </div>

  </div>
</template>
<script>
import { toTop,metaAppend } from "@/utils/index"

import { apiShareNoLogin} from "../api/apilist";
export default {
  name: "shareMenus",
  props:{
    // gameWayTitle: {
    //   type: String,
    //   default: () => 'GameWay',
    // },
    gameWayObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      gotop: false,
      shareMenus: [
        {
          src: require("@/assets/img/share_twitter.png"),
          name: "twitter"
        },
        // {
        //   src: require("@/assets/img/share_discord.png"),
        //   name: "Discord",
        //   flag: false
        // },
        {
          src: require("@/assets/img/share_telegram.png"),
          name: "telegram",
          flag: false
        },
        {
          src: require("@/assets/img/share_no1.png"),
          name: "wa",
          flag: false
        },
        {
          src: require("@/assets/img/share_facebook.png"),
          name: "facebook",
          flag: false
        },
        {
          src: require("@/assets/img/share_no2.png"),
          name: "copy",
          flag: false
        },
        {
          src: require("@/assets/img/share_top.png"),
          flag: true,
          name: 'goTop'
        }
      ]
    };
  },
  created(){
    // console.log(this.gameWayObj)
    //  window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    goBack(name) {
      // console.log(this.gameWayObj)
      let text = this.gameWayObj.title;
      let src = window.location.href;
      let { title,detail } = this.gameWayObj;
      // let imgTw = srcArr[0];
      let metaArr = [
              'twitter:url', 'https://gameway.fun',
              'twitter:site', '@GameWayFun',
              'twitter:title', 'gameway',
              'twitter:description', 'gameway',
              'twitter:card', 'summary_large_image',
              'twitter:image', 'https://slideshow-photo.oss-ap-southeast-1.aliyuncs.com/gameinfo/20211203/fa9c145dabfa4047bad246eae312d24b.jpg'
          ]
      // let text = window.location.search;
      // let title = this.getCaption(text,'=');
      // console.log(encodeURI(text));
      // window.open(url);
      // return
      let url = '';
      if (name){
        switch(name) {
          case 'twitter':
            // https://twitter.com/intent/tweet?text=Seeing%20red?%20FUD%20that!%20Here%E2%80%99s%20what%20you%20should%20have%20bought%20instead%20of%20Bitcoin%20last%20week%20https://cointelegraph.com/news/seeing-red-fud-that-here-s-what-you-should-have-bought-instead-of-bitcoin-last-week%20via%20@cointelegraph
              // url = `https://twitter.com/intent/tweet?text=${text}&url=${src}@GameWayFun`
              url = `https://twitter.com/intent/tweet?url=${src}@GameWayFun`
              this.shareOpen(url,title,src,metaArr);
              break;
          case 'Discord':
              // console.log('Discord')
              // url = `https://www.facebook.com/sharer/sharer.php?u=${src}`
              // this.shareOpen(url);
              break;
          case 'telegram':
            // https://t.me/share/url?url=https://cointelegraph.com/news/seeing-red-fud-that-here-s-what-you-should-have-bought-instead-of-bitcoin-last-week&text=Where%20Bitcoin%20leads,%20altcoins%20usually%20follow%20%E2%80%94%20but%20the%20smartest%20crypto%20traders%20manage%20to%20turn%20BTC%20dips%20into%20buying%20opportunities.
              url = `https://t.me/share/url?url=${src}%20&text=${text}`
              this.shareOpen(url);
              break;
          case 'wa':
              //https://wa.me/?text=Seeing%20red?%20FUD%20that!%20Here%27s%20what%20you%20should%20have%20bought%20instead%20of%20Bitcoin%20last%20week%20https://cointelegraph.com/news/seeing-red-fud-that-here-s-what-you-should-have-bought-instead-of-bitcoin-last-week
              url = `https://wa.me/?text=${text}%20${src}`
              this.shareOpen(url);
              break;
          case 'facebook':
              url = `https://www.facebook.com/sharer/sharer.php?u=${src}`
              this.shareOpen(url);
              break;  
          case 'copy':
              // console.log('粘贴网址')
              this.copy(src);
              // this.shareOpen(url);
              break;  
          default:
              toTop();
        } 
      }
   
    },
    shareOpen(url,title,src,metaArr){
      // if( metaArr){
      //   console.log(metaArr)
      //   let metaParams = metaArr.toString()
      //   // let metaParams = metaArr.toString()
      //   // 需要encode两次 因为浏览器会自动decode一次，另一次是服务端会decode
      //   metaParams = encodeURIComponent(encodeURIComponent(metaParams))
      //   // window.open(`https://twitter.com/share?text=${'gogogo'}&url=https://gameway.fun/proxyapi/gameway-website/noLogin/game-content/share/new?meta=${metaParams}`)
      //   // window.open(`https://twitter.com/share?url=https://gameway.fun/proxyapi/gameway-website/noLogin/game-content/share/new?meta=${metaParams}`)
      //   // let box = `https://gameway.fun/proxyapi/gameway-website/noLogin/game-content/share/new?meta=twitter:site,@GameWayFun,twitter:title,Wanna Know More about Radio Caca(RACA)? Check This!!,twitter:description,Wanna Know More about Radio Caca(RACA)? Check This!!,twitter:card,summary_large_image,twitter:image,https://slideshow-photo.oss-ap-southeast-1.aliyuncs.com/gameinfo/20211216/ca7ff58efe4c490eae581f613b58e1a1.png`;
      //   // window.open(`https://twitter.com/share?url=${box}`)
      //   window.open(`https://twitter.com/share?url=https://gameway.fun/share`)
      //   return
      // }
      // url = encodeURI(url)
    // var post_Str= url.replace(/\&/g, "%26");//"&"
      // console.log(url)
      window.open(url,'_blank');
    },
    // 截取字符串
    getCaption(obj,str){
        var index=obj.lastIndexOf(str);
        // console.log(index)
        obj=obj.substring(index+1,obj.length);
    //  console.log(obj);
        return obj;
    },
    copy(data) {
      let OrderNumber = data;
      let newInput = document.createElement("input");
      newInput.value = OrderNumber;
      document.body.appendChild(newInput);
      newInput.select();
      document.execCommand("Copy");
      newInput.remove();
      this.$message({
        message: "Link copied",
        type: "success",
      });
    },
    handleScroll() {

      let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
      scrolltop > 30 ? (this.gotop = true) : (this.gotop = false);
    }
  }
};
</script>
<style lang="less">
.stairs{
  position: fixed;
  /* width: 68px; */
  top: 250px;
  margin-left: -60px;
  /* height: 430px; */
  background: #4C4C50;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 8px 0px 0px 8px;
  padding: 10px 9px 0;
  .shareMenu{
    width: 40px;
    height: 40px;
    border: 1px solid #4C4C50;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 10px;
    cursor: pointer;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  } 
  &:hover{
    box-shadow: 0 2px 15px 0 rgb(0 0 0 / 40%);
 
  }
}
</style>