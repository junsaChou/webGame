<template>
  <div class="main con">
    <!-- 热门内容 -->
    <div class="content-game-sign">
      <section  class="company-activities">
        <div class="gw-sign-wrap">
          <div class="gw-sign">
            <div class="gw-sign-title">{{ isSign ? ' Welcome to register GameWay' : 'Find back my account' }}</div>
            <el-form ref="form" :model="form" :rules="rules" >
              <el-form-item prop="username" v-if="isSign">
                <el-input v-model="form.username"   auto-complete="off" placeholder="4~20,Numbers or Letters" prefix-icon="el-icon-s-custom"></el-input>
              </el-form-item>
              <el-form-item prop="email" class="email" >
                <el-input v-model="form.email"   auto-complete="off" placeholder="Email" prefix-icon="el-icon-message"></el-input>
              </el-form-item>
              <el-form-item class="gw-form-code" prop="code">
                <el-input v-model="form.code"   auto-complete="off" placeholder="Code"></el-input>
                <el-button @click="onYzm" :disabled ="getYzm>0">{{ getYzm>0?'Code alredy sent  ( '+getYzm+' seconds )':'Send me code'}} </el-button>
              </el-form-item>
              <el-form-item prop="password" >
                <el-input v-model="form.password"   auto-complete="off"  show-password placeholder="8 Letters Minimum"  prefix-icon="el-icon-unlock"  ></el-input> 
                <!-- suffix-icon="el-icon-view" -->
              </el-form-item>
              <el-form-item prop="repPassword" >
                <el-input v-model="form.repPassword"   auto-complete="off"  show-password placeholder="Repeat password"  prefix-icon="el-icon-unlock"  ></el-input>
              </el-form-item>
              <el-form-item >
                <el-button class="gw-form-sbmit"  @click.native="handleLogin" @keyup.enter.native="handleLogin" v-preventReClick>
                  {{ isSign ? 'SIGN UP NOW' : 'Confirm' }}</el-button>
              </el-form-item>
            </el-form>
            <div class="gw-sign-view" @click="goUrl('/signIn','find')" v-show="isSign">
              I have an account, sign in now 
            </div> 
          </div>
        </div>
      
      </section>
    </div>
       <!-- 分页栏 -->
  </div>
</template>
<script>
// 点赞  找回密码
import { apiRegister,apiSendEmail,apiResetPwd,apiSecurity,apiClickId } from "@/api/sign";
import validatorForm from '../../assets/js/validatorForm'
import {  mapMutations } from "vuex";
export default {
  name: "signUp",
  components: {
    
  },
  data() {
    var validatePass2 = (rule, value, callback) => {//验证 二次密码
        if (value === '') {
          callback(new Error('Please enter the password again'));
        } else if (value !== this.form.password) {
          callback(new Error('The two passwords are inconsistent!'));
        } else {
          callback();
        }
    };
    return {
      recommenBoxList:[],
      form:{
        username: null,
        email: null,
        code: null,
        password: null,
        repPassword: null
      },
      rules: {
        username: [
          { required: true, trigger: 'blur', message: 'Please input 4~20,Numbers or Letters' },
          { validator: validatorForm.validateGwUser,trigger: "blur" }
        ],
        email: [
          { required: true, trigger: 'blur', message: 'Please input Email' },
          { validator: validatorForm.validateGwEmail,trigger: "blur" }
        ],
        code: [
          { required: true, trigger: 'blur', message: 'Please input code' },
          { validator: validatorForm.validateGwCode,trigger: "blur" }
        ],
        password: [
          { required: true, trigger: 'blur', message: 'Please input password' },
          { validator: validatorForm.validateGwPwd,trigger: "blur" }
        ],
        repPassword: [
          // { required: true, trigger: 'blur', message: 'The two passwords are inconsistent' }
          { validator: validatePass2, trigger: 'blur' }
        ],
      },
      getYzm: 0,
      isSign:true
    };
  },
  methods: {
    ...mapMutations([ "setFormVisible"]),
    // 添加body图片
    // setBodyBackGround () {
    //       document.getElementById('app').className = 'filter-app'
    // },
    //   // 清除背景图
    // clearBodyBackGround () {
    //       document.getElementById('app').className = ''
    // },
    // goUrl(to,id, address) {
    //   this.$router.push({ path: to, query: { id, address } });
    // },
    getNewsData() {
      let data = {...this.page,type:2,webSite:1,auditStatus:2}
      apiGameContentList(data)
        .then(res => {
          if (res.code === 200) {
            this.total = res.data.total
            this.pageCount = this.total % this.page.size;
            let contentGameData = res.data.records;
            contentGameData.forEach((i,k) => {
              if(i.content.length > 10){
                let src = imgRegSrc(i,true)
                contentGameData[k] = {...i,...src };
              }
           
            })
            let newListScroll = JSON.parse(JSON.stringify(this.newsList))
            this.newsList = [ ...newListScroll, ...contentGameData];
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onYzm() {
      let email = this.form.email;
      // let gwEmailReg =  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      let gwEmailReg  = /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])|(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])|(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])).{6,}|(?:(?=.*[A-Z])(?=.*[a-z])|(?=.*[A-Z])(?=.*[0-9])|(?=.*[A-Z])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*[0-9])|(?=.*[a-z])(?=.*[^A-Za-z0-9])|(?=.*[0-9])(?=.*[^A-Za-z0-9])|).{4,40}$/
      if ( !gwEmailReg.test(email) ){
         this.$message({
            type: 'warning',
            message: 'Please enter the correct email format'
          })
          return
      }
      if (this.getYzm) return;
      this.getYzm = 60;
      let timer = setInterval(() => {
        this.getYzm -= 1;
        if (this.getYzm == 0) clearInterval(timer);
      }, 1000);
      apiSendEmail({targetEmail:email })
        .then(res => {
          if (res.code === 200) {
             this.$message({
                  type: 'success',
                  message: 'Verification code sent successfully'
                })
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleLogin() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // console.log(this.form)
          // return
          let params = this.form;
          this.loading = true
          if( this.isSign ){
            apiRegister(params)
            .then(res => {
              if (res.code === 200) {
                this.cancleForm();
                 this.$message({
                  type: 'success',
                  message: 'Congratulations, registration is successful'
                })
                // return false;
              } else {
                this.$message({
                  type: 'error',
                  message: res.message
                })
                
              }
              this.loading = false
            })
            .catch((err) => {
              console.log(err)
              this.loading = false
            })
       
          }else{
            apiResetPwd(params)
            .then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: 'Password reset complete'
                })
                this.cancleForm();
                // return false;
              } else {
                this.$message({
                  type: 'error',
                  message: res.message
                })
              }
              this.loading = false
            })
            .catch((err) => {
              console.log(err)
              this.loading = false
            })
          }
        }
      })
    },
    cancleForm() {
      this.goUrl('/');
      this.setFormVisible(true)
      this.cancleClose();
    },
    cancleClose(){
        Object.keys(this.form).forEach(key => {
        this.form[key] = null;
      });
    },
    goUrl(to,isSign){
      this.$router.push({path: to, query: {isSign}})
    },
  },
  watch: {
    '$route.query.isSign':function(newVal,oldVal) {
      
      if(newVal != oldVal){
        if (newVal == 'find'){
          this.isSign = false
        }else{
          this.isSign = true
        }
         this.cancleClose();
      }
    }
  },
  mounted() {
  if (this.$route.query.isSign == 'find'){
      this.isSign = false
  }else{
    this.isSign = true
  }
    this.cancleClose();
    // this.setBodyBackGround();
  },
  beforeDestroy(){
    // this.clearBodyBackGround();
  },
  created(){
    // this.getNewsData();
  },
};
</script>
<style lang="less" >
.main{
  .content-game-sign {
    /* 一维排版 */
    display: flex;
    justify-content: center;
    flex-direction: column;
    .company-activities {
      margin-top: 120px;
      width: 100%;
      .gw-sign-wrap{
        margin: 50px auto;
        padding:50px 72px 44px;
        width: 540px;
        box-sizing: border-box;
        position: relative;
         &::after{
          position: absolute;
          right: 0;
          bottom: -2%;
          content: "";
          height: 10%;
          width:  2px;
          background-color: #fff;
        }
        &::before{
          position: absolute;
          left: -2%;
          top: 0;
          content: "";
          height: 2px;
          width: 10%;
          background-color: #fff;
        }
      }
      .gw-sign{
        width: 100%;
        &::after{
          position: absolute;
          right: -2%;
          bottom: 0;
          content: "";
          width: 10%;
          height: 2px;
          background-color: #fff;
        }
        &::before{
          position: absolute;
          left: 0;
          top: -2%;
          content: "";
          width: 2px;
          height: 10%;
          background-color: #fff;
        }
        .gw-sign-title{
          font-size: 26px;
          color: #fff;
          font-weight: 400;
          line-height: 40px;
          margin-bottom: 20px;
        }
        .gw-sign-view{
          cursor: pointer;
          font-size: 16px;
          line-height: 22px;
          color: #fff;
          text-align: left;
          margin-top: 10px;
        }
        form{
          // width: 395px;
          width: 100%;
          margin: 0 auto;
          .el-form-item{
            margin-bottom: 30px;
          }
          .email{
            .el-input__prefix,.el-input__suffix{
                  .el-input__icon{
                    top: 3px!important;
                  }
                }
          }
          .gw-form-code{
            .el-form-item__content{
              display: grid;
              grid-template-columns:0 1fr 40% 0;
           
              .el-input{
                // box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  
                // margin-right: -2px;
                // border-left: none;
              }
              .el-button{
                margin-left: -2px;
                position: relative;
                z-index: 2;
                font-size: 16px;
                background: #fff;
                color: #000;
                line-height: 20px;
                white-space: normal;
                padding: 0 12px;
              }
              .is-disabled{
                border-color: #EBEEF5;
                color: #C0C4CC;
              }
            }
         
          }
          .el-form-item__content{
              .el-form-item__error{
                padding-left: 80px;
              }
              .el-input__inner{
                background: rgba(243, 243, 243, 0.21);
                border:1px solid  rgba(243, 243, 243, 0.21);
              }
              .el-input,.el-button{
                  box-sizing: border-box;
                  height: 40px;
                  line-height: 40px;
                  
                input{
                  height: 100%;
                  line-height: 100%;
                  padding-left: 60px;
                  color: #fff;
                  border: none;
                }
                input::-webkit-input-placeholder {
                  color: #fff;
                }
                input::-moz-input-placeholder {
                  color: #fff;
                }
                input::-ms-input-placeholder {
                  color: #fff;
                }
                .el-input__prefix,.el-input__suffix{
                  line-height: 40px;
                  cursor: pointer;
                  .el-input__icon{
                    width: 32px;
                    font-size: 20px;
                    position: relative;
                    top: 2px;
                    color:#fff;
                    line-height: 100%;
                  }
                }
                .el-input__prefix{
                  left: 13px;
                }
                .el-input__suffix{
                  right: 13px;
                }
              }
              .gw-form-sbmit{
                background: linear-gradient(270deg, #EE8A22 0%, #ECB639 100%);
                // border: 1px solid transparent;
                border: none;
                // box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.16);
                font-size: 20px;
                width: 100%;
                margin-top: 20px;
                font-weight: bold;
                color: #fff;
                line-height: initial;
              }
          }
        
        }
      }
    }
  
  }
}
@import '../../assets/css/common.less'; 
</style>