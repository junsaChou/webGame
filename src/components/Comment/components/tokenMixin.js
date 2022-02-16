import { mapMutations,mapGetters } from 'vuex'
export const MixinToken = {
  name:'isTokenInfo',
  data(){
    return{

    }
  },
  computed: {
    ...mapGetters(['userInfoList']),
  },
  watch:{
    userInfoList:function(newVal,oldVal) {

    }
  },
  methods:{
    ...mapMutations([ "setFormVisible"]),
    // 是否存在登录
    isTokenInfo( newVal = this.userInfoList ){
      if(  newVal ){
        return true
      }else{
        this.$message({
            type: 'warning',
            message: 'Please sign in first'
        })
        this.setFormVisible(true)
        return false;
      }
    },
  }
}