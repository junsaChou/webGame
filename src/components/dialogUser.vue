<template>
    <el-dialog
      title=""
      class="dialogUser"
      :visible.sync="uploadInfo.dialogVisible"
      width="600px"
      :before-close="handleClose">
        <div class="dialogHead">
          <div class="name">{{ 'Edit Profile' }}</div>
          <button @click="submit">Save</button>
        </div>
        <div class="create-head">
            <div class="head-banner">
              <img :src="form.backgroundUrl" v-if="form.backgroundUrl!='' && form.backgroundUrl"  alt="">
              <el-upload
                ref="upload"
                action="ssjs"
                :limit="1"
                :auto-upload="true"
                :before-upload="beforeUploadFile"
                :on-exceed="exceedFile"
                :on-success="handleSuccess"
                :on-error="handleError"
                :http-request="uploadFile"
              >
                <i class="el-icon-camera avatar-uploader-icon" />
              </el-upload>
              <div class="close" v-if="form.backgroundUrl!='' && form.backgroundUrl">
                <i class="el-icon-close" @click="remove('banner')"></i>
              </div>
            </div>
            <div class="head-info">
              <div class="imgBox">
                <img :src="form.imageUrl ? form.imageUrl  :logoImg" class="imgScale" alt="">
                   <el-upload
                    ref="uploadLogo"
                    action="ssjs"
                    :limit="1"
                    :auto-upload="true"
                    :before-upload="beforeUploadFile"
                    :on-exceed="exceedFile"
                    :on-success="handleSuccessLogo"
                    :on-error="handleError"
                    :http-request="uploadFileLogo"
                  >
  
                    <i class="el-icon-camera avatar-uploader-icon" />
                  </el-upload>
                  <div class="close">
                    <i class="el-icon-close"></i>
                  </div>
              </div>
              <div class="head-info-rit">
                <div class="name-box">
                  <span>{{ form.username }}</span>
                </div>
              </div>
            </div>
            <div class="head-detail">
               <el-input
                  type="textarea"
                  autosize
                  maxlength="120"
                  placeholder="Bio"
                  v-model="form.introduction">
                </el-input>
              </div>
          </div>
    </el-dialog>
</template>
<script>
import { myMixin } from '@/utils/uploadMixin'
import { apiChangUserInfo } from "@/api/changeUser";
import { mapMutations } from 'vuex'
export default {
  name: "dialogUser",
  mixins:[ myMixin],
  props:{
    // gameWayTitle: {
    //   type: String,
    //   default: () => 'GameWay',
    // },
    uploadInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form:{
      },
      logoImg: require("@/assets/img/avatar.png"),
      bannerImg: 'https://slideshow-photo.oss-ap-southeast-1.aliyuncs.com/gameslideshow/20211229/69592da91a5f45848c2e2513037755c6.png?w',
      textarea2: '',
      imageUrl: '', //上传图片的地址
      // fileList: []
    };
  },
  created(){
    if( this.uploadInfo ){
      let { introduction,backgroundUrl,imageUrl } = this.uploadInfo;
      this.form = this.uploadInfo;
    }
  },
  methods: {
    ...mapMutations([ "setUserInfo" ]),
    remove(name){

      this.form.backgroundUrl = '';
      this.submit('flag');
    },
    submit(flag){
      let data = Object.assign( {},this.form)
      // return
      apiChangUserInfo( data )
        .then(res => {
          if (res.code === 200) {
            let userInfo = res.data;
            userInfo['uid'] = userInfo.id;
            this.setUserInfo(JSON.stringify( res.data))
            if ( flag == 'flag' ){
              return
            }
            this.handleClose();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSuccess(res, file) {
      this.form.backgroundUrl = res
      this.$message({
        message: 'Picture uploaded successfully',
        type: 'success'
      })
      this.$refs.upload.clearFiles()// 清楚上次上传记录
    },
    handleSuccessLogo(res) {
      this.form.imageUrl = res
      this.$message({
        message: 'Picture uploaded successfully',
        type: 'success'
      })
      this.$refs.uploadLogo.clearFiles()// 清楚上次上传记录
    },
    handleClose() {
      // func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
      this.uploadInfo.dialogVisible = false;
      this.$emit('func', false)
    },
  }
};
</script>
<style lang="less">
  .dialogUser{
    .el-dialog__headerbtn{
      width: 50px;
      right: 0;
      left: 10px;
      z-index: 100;
      &:hover .el-dialog__close{
        color: #ecb639;
      }
    }
    .dialogHead{
      position: absolute;
      padding-left: 48px;
      width: 85%;
      display: flex;
      justify-content: space-between;
      top: 20px ;
      .name{
        font-size: 18px;
        color: #fff;
      }
      button{
        cursor: pointer;
        font-size: 14px;
        color: #fff;
        padding:6px 22px;
        background: #505050;        
        border: none;
        border-radius: 4px;
        &:hover{
            background: linear-gradient(90deg,#ecb639,#ee8a22);
            color: #fff;
        }
      }
    }
    .create-head{     
   
        .head-banner{
          background-color: #999;
          width: 100%;
          height: 180px;
          border-radius: 5px;
          overflow: hidden;
          position: relative;  
          img{
            width: 100%;
            object-fit: cover;
            height: 100%;
          }
          .el-upload{
            position: absolute;
            width: 100px;
            right: 50%;
            top: 20%;
            height: 100px;
            display: flex;
            align-items: center;
            padding-left: 24%;
            box-sizing: border-box;
            // justify-content: center;
            // line-height: 180px;
            i{
              color: #C1C1C1;
              font-size: 20px;
            }
          }
          .close{
            position: absolute;
            // height: 100px;
            right: 35%;
            top: 40%;
            width: 50px;
            height: 50px;
            color: #C1C1C1;
            font-size: 20px;
            cursor: pointer;
          }
        }
   
        .head-info{
          padding:12px 0 14px 40px;
          display: flex;
          .imgBox{
            position: relative;
            z-index: 20;
            margin-top: -70px;
            width: 110px;
            height: 110px;
            overflow: hidden;
            border-radius: 50%;
            border:2px solid #fff;
            box-sizing: border-box;
            cursor: pointer;
            .el-upload{
              position: absolute;
              width: 100%;
              left: 0;
              top: 0;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              // line-height: 180px;
              i{
                color: #C1C1C1;
                font-size: 20px;
              }
            }
          }
          .head-info-rit{
            padding-left: 22px;
            display: flex;
            flex-direction: column;
            .name-box{
              display: flex;
              justify-content: space-between;
              span{
                line-height: 22px;
                font-size: 20px;
                color: #fff;
              }
            }
          
          }
        }
        .head-detail{
          .el-textarea__inner{
            padding: 19px;
            font-size: 16px;
            line-height: 22px;
            background: rgba(155, 155, 157, 0.21);
            border: 1px solid transparent;
            color: #fff;
            min-height: 160px;
          }
        }
      }
  }
</style>