<template>
    <!-- :data="newsWrapList"
    class="seamless-warp" -->
  <vue-seamless-scroll
    :class-option="classOption"
    :data ="newsWrapListScroll"
  >
    <div class="new-box"  v-for="(itme,i) in newsWrapListScroll" :key="i"  @click="goUrl('/articledetails',itme.id,itme.title)">
        <h2 class="act-title">{{ itme.title }}</h2>
        <div class="new-date">
            <i class="el-icon-pie-chart"></i>
            <span> {{ itme.timeInfo }} </span>
        </div>
    </div>
  </vue-seamless-scroll>
</template>
 
<script>
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
    name: "vurScroll",
    props: {
        newsWrapListScroll: {
            type: Array,
            default: () => []
        }
    },
    data() {},
    components: {
        //组件
        vueSeamlessScroll
    },
    computed: {
        classOption() {
        return {
            step: 0.2, // 数值越大速度滚动越快
            limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
            hoverStop: true, // 是否开启鼠标悬停stop
            direction: 1, // 0向下 1向上 2向左 3向右
            openWatch: true, // 开启数据实时监控刷新dom
            singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
            singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
            waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
        };
        }
    }
};
</script>
 
 <style lang="less" scoped>
   .new-wrap{
        padding: 0 35px;
        height: 476px;
        overflow:hidden;
        .new-box{
            cursor: pointer;
            padding-top: 20px;
            border-bottom: 1px solid #fff;
        
            .act-title{
            height: 43px;
            font-weight: 400;
            word-break: break-word;
            font-size: 16px;
            line-height: 24px;
            color: #e8e8e8;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            }
            .new-date{
            padding-left: 8px;
            line-height: 26px;
            text-align: left;
            i{
                font-size: 13px;
                color: #ACACAC;
                margin-right: 10px;
            }
            span{
                font-size: 12px;
                color: #ACACAC;
                font-weight: 400;
            }
            }
        }
    }
 </style>

<style>
.seamless-warp {
  width: 100%;
  height: calc(100% - 16px);
  overflow: hidden;
}
</style>