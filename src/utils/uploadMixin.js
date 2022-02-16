import * as imageConversion from 'image-conversion'
import {  apiPostFile } from "@/api/apilist";
// 获取所有分类
import { apiWebGameInfoList,apiGetAllCountry,apiGameContentTypeList } from '../api/changeUser'
export const myMixin = {
    data(){
        return{

        }
    },
    methods:{
        beforeUploadFile(file) {
            return new Promise((resolve, reject) => {
                const isLt2M = file.size / 1024 / 1024 < 0.6 // 判定图片大小是否小于4MB
                if (isLt2M) {
                resolve(file)
                }
                // 压缩到400KB,这里的400就是要压缩的大小,可自定义
                imageConversion.compressAccurately(file, 400).then(res => {
                resolve(res)
                })
            })
        },
            // 文件上传失败时的钩子
        handleError(err, file, fileList) {
            this.$message.error(err.msg)
        },
           // 文件超出个数限制时的钩子
        exceedFile(files, fileList) {
            this.$notify.warning({
            photoTitle: '警告',
            message: `只能选择 ${
                this.limitNum
            } 个文件，当前共选择了 ${files.length + fileList.length} 个`
            })
        },
          // 文件上传失败时的钩子
        handleError(err, file, fileList) {
            this.$refs.upload.clearFiles()// 清楚上次上传记录
            this.$message.error(err.msg)
        },
        uploadFile(item) {
          // console.log( '2')
            const fileObj = item.file
            // this.handleSuccess(fileObj)
            // return
            const form = new FormData()
            form.append('file', fileObj)
            apiPostFile(form, { type: 1 })
              .then(res => {
                if (res.code === 200) {
                  this.handleSuccess(res.data)
                } else {
                  this.handleError(res.data)
                }
              })
              .catch(error => {
                console.log(error)
                this.listLoading = false
              })
        },
        uploadFileLogo(item) {
            const fileObj = item.file
            // this.handleSuccess(fileObj,'logo')
            // return
            const form = new FormData()
            form.append('file', fileObj)
            apiPostFile(form, { type: 1 })
              .then(res => {
                if (res.code === 200) {
                  this.handleSuccessLogo(res.data)
                } else {
                  this.handleError(res.data)
                }
              })
              .catch(error => {
                console.log(error)
                this.listLoading = false
              })
          },
    }
}
export const myScrollBtm = {
  data(){
      return{

      }
  },
  methods:{
      scrollBottom() {
          this.loading = false
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          let clientHeight = document.documentElement.clientHeight;
          let scrollHeight = document.documentElement.scrollHeight;
          let bottomOfWindow = scrollTop + clientHeight >= scrollHeight-50
          if (scrollTop!=0&&bottomOfWindow  && this.finished == false && this.pageCount != this.page.current ) {
            this.page.current = this.page.current + 1;
            this.PostFetchData();
            
          }
      }
  },
  mounted() {
      window.addEventListener('scroll', this.scrollBottom)
  },
}
export const myMixinApi = {
  data(){
    return{

    }
  },
  methods:{
    getGameInfoList(){//关联游戏
      apiWebGameInfoList()
      .then(res => {
        if (res.code === 200) {
         let gameData = res.data;
         this.options = [];
         let arrData = [];
          gameData.forEach((item,i)=>{
            arrData[i] = { label:item.name,value:item.id }
          })
          this.gameInfoOptions = [{ value:'Unrelated', label:"Unrelated"},...arrData ];
        }
      })
    },
    getGameTypeApi(){ //获取所有分类
      apiGameContentTypeList()
      .then(res => {
        if (res.code === 200) {
          let gameData = res.data;
          this.options = [];
          let arrData = [];
           gameData.forEach((item,i)=>{
             arrData[i] = { label:item.type,value:item.id }
           })
           this.gameTypeOptions = [...arrData ];
         }
      })
      .catch(error => {
        console.log(error);
      });
    },
    getAllCountryApi(){//所有国家
      apiGetAllCountry()
      .then(res => {
        if (res.code === 200) {
         let gameData = res.data;
         this.options = [];
         let arrData = [];
          gameData.forEach((item,i)=>{
            arrData[i] = { label:item,value:item }
          })
          this.getAllCountryOptions = [...arrData ];
        }
      })
    } 
  }
}