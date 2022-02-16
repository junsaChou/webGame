<template>
    <el-dialog
      title=""
      class="dialogNews"
      :visible.sync="newsInfo.dialogVisible"
      width="40%"
      :before-close="handleClose">
        <div class="newImg"></div>
        <div class="newsBox">
          <h2 class="title">{{newsInfo.title}}</h2>
        </div>
      <span>{{ newsInfo.timeInfo }}</span>
    </el-dialog>
</template>
<script>
export default {
  name: "dialogNews",
  props:{
    // gameWayTitle: {
    //   type: String,
    //   default: () => 'GameWay',
    // },
    newsInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
    };
  },
  methods: {
    // handleClose(){
    //   this.newsInfo.dialogVisible = false;
    // },
    handleClose() {
      // func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
      this.$emit('func', false)
    },
  }
};
</script>
<style lang="less">

</style>