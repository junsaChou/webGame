<template>

  <div id="app">
     <!--头部导航-->
     <banner></banner>
     <router-view></router-view>
    <foot></foot>
  </div>
</template>
<script>
import banner from './components/banner'
import foot from "@/components/foot";
export default {
  name: 'App',
  components:{
    banner,
    foot
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
