<template>
  <div class="footer">
    <!-- <div class="con"> -->
      <div class="menuList">
        <ul>
          <li v-for=" (item,i) in menuList" :key="i" @click="goBack(item.url)">
            <img :src="item.src" alt />
          </li>
        </ul>
        <p>© 2022 GameWay. All Rights Reserved.</p>
      </div>
      <!-- <div class="txt">
                    <ul class="list">
                        <li>
                            <router-link to="/">首页</router-link>
                        </li>
                        <li>
                            <router-link to="/case">客户案例</router-link>
                        </li>
                        <li>
                            <router-link to="/newslist1">新闻资讯</router-link>
                        </li>
                        <li>
                            <router-link to="/about">关于我们</router-link>
                        </li>
                        <li>
                            <router-link to="/contact">联系我们</router-link>
                        </li>
                    </ul>
                    <p class="beian">VALVTON © 2019-叁猿网络科技有限公司 {{beian_num}} 经营许可证编号：闽D1-20183078</p>
                    <div class="rx">叁猿网络科技全国咨询热线：400 - 000 - 0000</div>
                </div>
                <div class="ewm">
                    <img :src="wximg" alt="">
                    <p>微信公众号</p>
      </div>-->
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  name: "foot",
  data() {
    return {
      wximg: "",
      beian_num: "",
      menuList: [
        {
          src: require("@/assets/img/twitter.png"),
          url: "https://twitter.com/GameWayFun",
          name: "twitter"
        },
        {
          src: require("@/assets/img/Discord.png"),
          url: "http://discord.gg/R2zA9J75sx",
          name: "Discord"
        },
        {
          src: require("@/assets/img/telegram.png"),
          url: "https://t.me/GameWayFun",
          name: "telegram"
        },
        {
          src: require("@/assets/img/medium.png"),
          url: "https://medium.com/@gameway.fun",
          name: "medium"
        }
      ]
    };
  },
  methods: {
    goBack(url) {
      // console.log(url);
      window.open(url);
      // return ;
      // window.location.href = url;
      // window.open(url)
    }
  },
  mounted() {
    // this.getwximg();
  }
};
</script>
<style lang="less" scoped>
.footer {
  position: relative;
  bottom: 0;
  width: 100%;
  height: 200px;
  background-color: #2c2d35;
  display: flex;
  align-items: center;
  .menuList {
    width: 100%;
    // background-color: #2c2d35;
    // width: 1000px;
    // margin: 0 auto;
    ul {
      width: 430px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      li {
        cursor: pointer;
        img {
          width: 40px;
          height: 40px;
        }
      }
    }
    p{
      margin-top: 10px;
      color: #8e8e8e;
    }
  }
  .txt {
    width: 730px;
    display: flex;
    flex-direction: column;
    color: #fff;
    text-align: left;
    font-size: 16px;
    margin-top: 40px;
    float: left;
    .beian {
      margin-top: 30px;
    }
    .rx {
      margin-top: 30px;
      color: #647aff;
    }
    .list {
      color: #fff;
      li {
        position: relative;
        &:after {
          content: "";
          width: 2px;
          height: 15px;
          background-color: #fff;
          position: absolute;
          top: 4px;
          right: -15px;
        }
        &:nth-child(5):after {
          width: 0px;
        }
        float: left;
        margin-right: 30px;
        a {
          color: #fff;
          font-size: 16px;
        }
      }
    }
  }
  .ewm {
    margin-top: 40px;
    img {
      width: 65px;
    }
    p {
      font-size: 16px;
      color: #fff;
      margin-top: 15px;
    }
  }
}
</style>