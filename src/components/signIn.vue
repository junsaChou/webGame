<template>
  <div class="gw-sign-form">
     <el-form ref="form" :model="form" :rules="rules" >
        <el-form-item prop="username" >
          <el-input v-model="form.username"   auto-complete="off" placeholder="Email or Username" prefix-icon="el-icon-s-custom"></el-input>
        </el-form-item>
        <el-form-item prop="password" >
          <el-input v-model="form.password"  @keyup.enter.native="handleLogin" auto-complete="off" placeholder="Password" prefix-icon="el-icon-unlock" show-password></el-input>
        </el-form-item>
        <el-form-item prop="validateCode" v-if="1>2">
           <div class="content-google">
          <google-recaptcha ref="recaptcha" :sitekey="key" @getValidateCode='getValidateCode' v-model="form.validateCode"></google-recaptcha>
        </div>
        </el-form-item>
        <el-form-item >
          <el-button class="gw-form-sbmit"  @click.native="handleLogin" @keyup.enter.native="handleLogin" v-preventReClick>SIGN IN</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
import validatorForm from '../assets/js/validatorForm'
// 登录
import { apiLogin,apiSendEmail,apiResetPwd,apiSecurity,apiClickId } from "@/api/sign";
import { getToken } from '@/utils/cookie'
import GoogleRecaptcha from './GoogleRecaptcha'
import { mapMutations } from "vuex";
export default {
  name: "signIn",
  props: {
    authFlag:{
        type: Boolean,
        default: () => false,
    }
  },
  components:{
    GoogleRecaptcha
  },
  data(){
    var checkCode = (rule, value, callback) => {
      if (value == false) {
        callback(new Error('请进行人机验证'));
      } else {
        callback();
      }
    } 
    return{
      form:{
        username: '',
        password: '',
        validateCode: false
      },
      key: '6LdEjHEdAAAAAPYL8_D4Cr7h1eT7A5IPVjPYw9ec',
      rules: {
        username: [
          { required: true, trigger: 'blur', message: 'Please input Email or Username' },
          // { validator: validatorForm.validateGwUserEmail,trigger: "blur" }
        ],
        email: [
          { required: true, trigger: 'blur', message: 'Please input Email' },
          { validator: validatorForm.validateGwEmail,trigger: "blur" }
        ],
        password: [
          { required: true, trigger: 'blur', message: 'Please input password' },
          // { validator: validatorForm.validateGwPwd,trigger: "blur" }
        ],
        validateCode: [
          { validator: checkCode, trigger: 'change' }
        ]
      },
      getYzm: 0,
      isSign:true
    }
  },
  watch:{
    authFlag:function(newVal,oldVal) {
      if( newVal == false ){
       this.cancelForm()
      } 
    }
  },
  mounted () {
    if( this.authFlag & this.authFlag == false ){
       this.cancelForm()
    }
  },
  methods: {
    ...mapMutations([ "setUserInfo","setToken","setFormVisible",'getFormVisible','setSendEmail' ]),
    handleLogin() {
      if (getToken() ){
        this.$router.push('/')
        location.reload()
        return
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          let { username,password } = this.form;
          let params = {
            username,
            password,
            platformType : 1
          }
          apiLogin(params)
            .then(res => {
              if (res.code == '200') {
                let { access_token,userInfo } = res.data;
                this.setToken( access_token)
                this.setSendEmail( userInfo.sendEmail)
                this.setUserInfo(JSON.stringify( userInfo))
             
                this.setFormVisible(false)
                  this.form = {
                    username: '',
                    password: '',
                    validateCode: false
                  }
                 this.$message({
                  type: 'success',
                  message: 'Sign in successful'
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
            .catch(() => {
              this.loading = false
            })
        }
      })
    },
    cancelForm(){
      this.form = {
        username: '',
        password: '',
        validateCode: false
      }
      this.$refs.form.clearValidate()
    },
    getValidateCode(value) {
      // console.log(value);
       
       this.form.validateCode = value
    },
  }
};
</script>

<style lang="less" scoped>

.gw-sign-form{
  width: 100%;
  /deep/form{
    // width: 395px;
    width: 100%;
    margin: 0 auto;
    .gw-form-code{
      .el-form-item__content{
        display: grid;
        grid-template-columns:0 1fr 40% 0;
      
        .el-input{
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        }
        .el-button{
          font-size: 16px;
          background: #fff;
          color: #000;
          line-height: 20px;
          white-space: normal;
          padding: 0 12px;
        }
      }
    }
    .el-form-item__content{
        .el-form-item__error{
          padding-left: 80px;
        }
        .el-input__inner{
          background: rgba(243, 243, 243, 0.21);
          border: none;
          border-bottom: 1px solid #fff;
          // border:1px solid  rgba(243, 243, 243, 0.21);
        }
        .el-input,.el-button{
            box-sizing: border-box;
            height: 40px;
            line-height: 40px;
          input{
            height: 100%;
            line-height: 100%;
            padding-left: 80px;
            color: #fff;
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
          border: 1px solid transparent;
          box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.16);
          font-size: 20px;
          width: 100%;
          font-weight: bold;
          margin-top: 20px;
          color: #fff;
          line-height: initial;
        }
    }
  }
}
</style>
<style lang="less">
.el-dialog{
  .el-dialog__header{
    //  display: none;
      .el-dialog__close{
        font-size: 28px;
        color: #fff;
      }
  }
  .el-dialog-body{
    background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.31) 100%);
  }
}
.el-popup-parent--hidden{
  // padding: 0!important;
}  
</style>
 