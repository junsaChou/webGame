<template>
  <div class="main con">
    <!-- 热门内容 -->
    <div class="content-game-create">
      <section  class="company-activities">
        <div class="gw-create-wrap">
          <div class="create-head">
            <div class="head-banner">
              <img :src="userInfo.backgroundUrl+'?x-oss-process=image/auto-orient,1/quality,q_70/format,webp'" v-if="userInfo.backgroundUrl"  alt="">
            </div>
            <div class="head-info">
              <div class="imgBox">
                <img :src="userInfo.imageUrl ? userInfo.imageUrl+'?x-oss-process=image/auto-orient,1/quality,q_70/format,webp'  : logoImg" class="imgScale" alt="">1688
              </div>
              <div class="head-info-rit">
                <div class="name-box">
                  <span>{{ userInfo.username}}</span>
                  <button @click="detailInfo.dialogVisible = true">Edit Profile</button>
                </div>
                <div  class="gw-label" v-if ="userInfo.label=='author' &&userInfo.label" > 
                   <button>{{ 'Columnist'  }}</button>
                </div>
                <div class="head-detail">
                  {{ form.introduction }}
                  <!-- Three people, there must be my teacher Yan. Choose the good ones and follow them and change the bad ones. -->
                </div>
              </div>
            </div>
          </div>
          <div class="gw-create-form">
            <!-- :rules="rules" -->
            <el-form ref="form" :model="form"  >
              <el-form-item prop="email" label="Email">
                <el-input v-model="form.email"  disabled ></el-input>
              </el-form-item>
              <el-form-item prop="wallet" label="Wallet(BEP20)" class="pr" >
                <el-input style="opacity: 0;" v-model="form.wallet" placeholder="-" disabled></el-input>
                <span class="paCorpur" @click="open('Please enter wallet address(BEP20):','wallet',form.wallet)">{{walletStr}}</span>
              </el-form-item>
              <el-form-item prop="twitter" label="Twitter"  class="pr">
                <el-input v-model="form.twitter" placeholder="-" disabled></el-input>
                <span class="paCorpur" @click="open('Please enter Twitter ID :','twitter',form.twitter)"></span>
              </el-form-item>
              <el-form-item prop="gender" label="Gender">
                <el-select v-model="form.gender"  @change="onChangeString"  placeholder="-">
                  <el-option
                    v-for="item in genderOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
              </el-select>
              </el-form-item>
              <el-form-item prop="countries" label="Region">
                <el-select v-model="form.countries"  @change="onChangeString"  placeholder="-">
                  <el-option
                    v-for="item in getAllCountryOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select> 
              </el-form-item>
              <el-form-item prop="birthday" label="Birthday" class="birthdayForm" >
                <!-- <el-input v-model="form.birthday"  ></el-input>   format=` ${formatMonth(MM)},dd,yyyy`-->
                 <el-date-picker
                    v-model="form.birthday"
                    @change="onChangeString" 
                    type="date"
                    format="MM,dd,yyyy"
                    value-format="yyyy-MM-dd"
                    placeholder="Select date">
                  </el-date-picker>
                  <el-input class="dateFormat"  v-model="dateFormat"  ></el-input>
              </el-form-item>
              <el-form-item prop="Password" label="Password" class="password" >
                <el-input v-model="form.Password"  ></el-input>
                <span class="reset" @click="goUrl('/signIn','find')">Reset</span>
              </el-form-item>
            </el-form>
          </div>
          <!-- v-if ="userInfo.label=='author' &&userInfo.label" -->
          <div class="gw-create-game" >
            <div  class="gw-create-game-title">Contents</div>
            <div class="gw-create-game-list">
              <!-- v-if="recommenBoxListFlag" -->
               <recommenCom :recommenBoxData="recommenBoxList" :recommenFlag = recommenBoxListFlag  v-if="recommenBoxListFlag"  ></recommenCom>
            </div>
          </div>
        </div>

      </section>
    </div>
       <!-- 分页栏 -->
    <dialogUser :uploadInfo ="detailInfo" @func="closeDialog" v-if="detailInfo"></dialogUser>
    <!-- 选择日期 -->
  </div>
</template>
<script>
import { apiChangUserInfo,apiGetAuthorContent } from "@/api/changeUser";
import validatorForm from '../../assets/js/validatorForm'
import recommenCom from "@/components/recommend";
import dialogUser from "@/components/dialogUser";
import { mapGetters,mapMutations } from 'vuex'
import { myMixinApi } from '@/utils/uploadMixin'
import { formatMonth,_isMobile } from '@/utils'
export default {
  name: "create",
  components: {
    recommenCom,
    dialogUser,
  },
  mixins:[ myMixinApi ],
  data() {
    return {
      logoImg: require("@/assets/img/avatar.png"),
      bannerImg: require("@/assets/img/game10.png"),
      // bannerImg: 'https://slideshow-photo.oss-ap-southeast-1.aliyuncs.com/gameslideshow/20211229/69592da91a5f45848c2e2513037755c6.png?w',
      form:{
        email: '12345678@Gmail.com',
        gender: '',
        countries: '',
        wallet: '-',
        twitter: '-',
        birthday: '',
        introduction:'Three people, there must be my teacher Yan. Choose the good ones and follow them and change the bad ones.',
        Password: '***********'
      
      },
      walletStr:'-',//获取展示钱包的字符串
      page: {
        current: 1,
        size: 50
      },
      total: 0,
      userInfo: {},
      detailInfo:{
        dialogVisible: false
      },
      genderOptions:[
        { label:'Male',value:'Male'},
        { label:'Female',value: 'Female'},
        // { label:'-',value: '-'}
      ],
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
        ]
      },
      recommenBoxList: [
      ],
      recommenBoxListFlag: false,
      dateFormat:'-',//时间格式的展示
      getAllCountryOptions:[],//所有国家
      isCalendarBOxShow: false
    };
  },
  computed: {
    ...mapGetters(['userInfoList']),
  },
  watch: {
    'userInfoList':function(newVal,oldVal) {
      if( newVal!=null & newVal != undefined  ){
          this.userInfo = JSON.parse(this.userInfoList)
          this.pushForm(this.userInfo)
          this.getAuthorContent();
      }
    }
  },
  methods: {
    ...mapMutations([ "setUserInfo" ]),
    closeDialog(data){
       this.detailInfo.dialogVisible = data;
       
    },
    getAuthorContent() {
        // 获取审核数据列表接口
        let data = {...this.page,authorId:this.userInfo.uid,auditStatus:2}
        // let data = { ...this.listQuery,...this.page }
        apiGetAuthorContent( data )
        .then(res => {
            if (res.code === 200) {
            this.total = res.data.total
            this.recommenBoxList = res.data.records;
            this.recommenBoxListFlag = true;
            }
        })
        .catch(error => {
            console.log(error);
            this.listLoading = false;
        });
    },
    goUrl(to,isSign){
      // this.gwSignReg.formVisible = false;
      this.$router.push({path: to, query: {isSign}})
    },
    pushForm(data){
      let { email,birthday,gender,introduction,countries,backgroundUrl,imageUrl,username,uid,id,wallet,twitter} = data;
      // wallet!='' ?  this.walletStr = wallet.substring(1,wallet.length-1) :  this.walletStr ='';
      // console.log(  wallet.substring(0,4)+'******'+ wallet.substring(wallet.length-5,wallet.length-1)  )
      wallet&&wallet.length>10 ?  this.walletStr  = wallet.substring(0,4)+'******'+ wallet.substring(wallet.length-5,wallet.length-1) : this.walletStr = '-';
      this.form = { email,birthday,gender,introduction,countries,Password:'********',id:uid,wallet,twitter };
      this.detailInfo = { ...this.detailInfo,introduction,backgroundUrl,imageUrl,username,id:uid }
      this.onChangeString('flag');
    },
    onChangeString(flag){
      let {birthday } = this.form
      if ( birthday && birthday!='' ){
        let dateStr = birthday.split('-');
        this.dateFormat =  formatMonth(dateStr[1])+' '+dateStr[2]+','+dateStr[0]
      }else{
        this.dateFormat = '-';
      }
      if( flag != 'flag' ){
        this.submit()
      }
    },
    submit(){
      let data = Object.assign( {},this.form)
      apiChangUserInfo( data )
        .then(res => {
          if (res.code === 200) {
            let userInfo = res.data;
            userInfo['uid'] = userInfo.id;
            this.setUserInfo(JSON.stringify( userInfo))
            this.pushForm(userInfo)

          //  this.handleClose();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    open(hint,key,val) {
        this.$prompt(hint, '', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          inputValue: val,
        }).then(({ value,action }) => {
          // console.log( value)
          this.form[key] = value;
          this.submit()
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '取消输入'
          // });       
        });
    }
  },
  mounted() {
  },
  created(){
    if( this.userInfoList != undefined & this.userInfoList != null   ){
        this.userInfo = JSON.parse(this.userInfoList)
        this.pushForm(this.userInfo)
        this.getAuthorContent();
        this.getAllCountryApi();
    }else{
      this.goUrl('/')
    }

  },
};
</script>
<style lang="less" scope>
.el-popper{
  .popper__arrow{
    left: 50%!important;
  }
} 
/* 日期形式 */
.el-date-picker__header .el-date-picker__header-label:nth-child(3){
    margin-right: -50px;
}
.el-date-picker__header .el-date-picker__header-label:nth-child(4){
  margin-left: -50px;
}
.el-date-table td.current:not(.disabled) span{
   background: linear-gradient(268deg, #EE8A22 0%, #ECB639 100%);
   border-radius: inherit;
}
.el-date-table td.available:hover,.el-select-dropdown__item.selected,.el-date-table td.today span,.el-date-picker__header-label.active, .el-date-picker__header-label:hover,.el-picker-panel__icon-btn:hover  {
  color: #EE8A22;
}
.el-date-editor  .el-input__suffix{
  display: none;
}
// .el-date-editor  .el-input__prefix{
//   right: 5px;
//   left: none;
// }
.pr{
  position: relative;
  .el-input__inner{
    padding-left: 0;
  }
  .paCorpur{
    // width: 100px;
    width: 100%;
    height: 100%;
    position: absolute;
    color: #fff;
    text-align: center;
    font-size: 18px;
    padding-right: 15px;
    box-sizing: border-box;
    // left: 35%;
    left: 0;
    // top: 15%;
    cursor: pointer;
  }
}

.main{
  .content-game-create {
    position: relative;
    /* 一维排版 */
    display: flex;
    justify-content: center;
    flex-direction: column;
    .company-activities {
      margin-top: 120px;
      margin-bottom: 40px;
      width: 100%;
      .gw-create-wrap{
        margin: 0px auto;
        // padding:0px 72px 0px;
        box-sizing: border-box;
        display: grid;
        grid-template-columns:  100%;
        row-gap: 34px;
        .create-head, .gw-create-form{          
          border-radius: 8px;
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
          overflow: hidden;
          background: #4C4C50;
          .head-banner{
            background-color: #999;
            width: 100%;
            height: 240px;
            overflow: hidden;
            border-radius: 8px;
            img{
              width: 100%;
              object-fit: cover;
              height: 100%;
            }
          }
          .head-info{
            display: grid;
            grid-template-columns: 140px 1fr;
            column-gap: 34px;
            padding:12px 0 14px 104px;
            .imgBox{
              margin-top: -70px;
              width: 140px;
              height: 140px;
              overflow: hidden;
              border-radius: 50%;
              border:4px solid #fff;
              box-sizing: border-box;
              cursor: pointer;
              img{
                object-fit: cover;
              }
              &:hover img{
                -moz-animation:rotate 1s infinite linear;
                -webkit-animation:rotate 1s infinite linear;
                animation:rotate 1s infinite linear;
              }
            }
            .head-info-rit{
              padding-right: 20px;
              display: flex;
              flex-direction: column;
              .name-box{
                display: flex;
                justify-content: space-between;
                span{
                  line-height: 32px;
                  font-size: 20px;
                  color: #fff;
                }
                button{
                  // cursor: pointer;
                  font-size: 14px;
                  color: #bbb;
                  padding:8px 20px;
                  background-color: transparent;
                  border: 1px solid #707070;
                  border-radius: 20px;
                  &:hover{
                    background: linear-gradient(90deg, #ecb639 0%, #ee8a22 100%);
                    color: #fff;
                    // font-weight: bold;
                  }
                }
              }
              .gw-label{
                margin: 9px 0 15px;
                text-align: left;
                button{
                  cursor: pointer;
                  font-size: 14px;
                  color: #bbb;
                  padding:3px 6px;
                  background-color: transparent;
                  border: 1px solid #e8e8e8;
                  border-radius: 4px;
                }
              }
              .head-detail{
                width: 80%;
                text-align: left;
                font-size: 16px;
                color: #bbb;
                line-height: 20px;
              }
            }
          }
        }
        .gw-create-game{
          .gw-create-game-title{
            font-size: 18px;
            color: #fff;
            line-height: 40px;
            padding-left: 20px;
            background: #4C4C50;
            box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.16);
            text-align: left;
            border-radius: 6px;
          }
          .gw-create-game-list{
            padding: 20px;
            .gameRecommen{
              max-height: none;
              width: auto;
              background: transparent;
              box-shadow: 0 0 0 0 transparent;
              padding: 0;
              .headWrap{
                display: none;
              }
              .recommenWrap{
                max-height: none;
                display: grid;
                // overflow: ;
                overflow-y: Visible;
                grid-template-columns: repeat(4,240px);
                // column-gap: 5%;
                justify-content: space-between;
                row-gap: 20px;
                .createContent{
                  height: 135px;
                }
                .recommenBox{
                  border-radius: 8px;
                  padding: 0;
                  background: #4C4C50;
                  // background: linear-gradient(180deg, rgba(76, 76, 80, 0) 0%, rgba(76, 76, 80, 0.79) 100%);
                  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                  .imgScaleBox{
                    width: 100%;
                    height: 135px;
                  }
                  .act-pr{
                    width: 100%;
                    top: 0;
                    height: 100%;
                  }
                }
                // overflow-y: s;
              }
            }
          }
        }
      }
    }
  
  }
}
  .gw-create-form{
    width: 100%;
    box-sizing: border-box;
    padding: 24px 25% 40px 270px;
    form{
      // margin: 0 auto;
      width: 100%;
      .el-form-item{
        display: flex;
        // display: grid;
        // grid-template-columns:0 40% 1fr 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        margin: 0;
        padding: 9px 0;
        .el-form-item__label{
          color: #BBB;
          font-size: 18px;
          line-height: 32px;
          text-align: left;
          width: 40%;
        }
        .el-form-item__content{
          flex: 1;
          .el-input__inner{
            background-color: transparent;
            border: none;
            color: #fff;
            text-align: center;
            font-size: 18px;
          }
          .dateFormat{
            position: absolute;
            left: 0;
            cursor: pointer;
            width: 97%;
            z-index: 0;
          }
          .el-input__prefix{
            left: auto;
            right: -20px;
          }
          .el-date-editor{
            z-index: 1;
            .el-input__inner{
              opacity: 0;
            }
          }
          .reset{
            position: absolute;
            // left: 85%;
            right: 13%;
            font-size: 14px;
            // margin-left: -30px;
            // left: ;
            color: #BBBBBB;
            cursor: pointer;
       
            &:hover{
              color: #ee8a22 ;
            }
          }
        }
      }
      .password {
        .el-input{
          position: relative;
          top: 6px;
        }
      }
    }
    .gameFiWrap{
      position: absolute;
    }
  }
  @-moz-keyframes rotate{
    0%{
      -moz-transform:rotate(0deg);
      }
      100%{
        -moz-transform:rotate(360deg);
      }
  }
  @-webkit-keyframes rotate{
    0%{
      -webkit-transform:rotate(0deg);
      }
      100%{
        -webkit-transform:rotate(360deg);
      }
  }
@import '../../assets/css/common.less'; 
</style>
