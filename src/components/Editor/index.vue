<template>
  <div class="editor-wrapper">
    <div ref="editorEle" class="editor-container" />
  </div>
</template>

<script>
import E from 'wangeditor'
import i18next from 'i18next'
import { apiPostFile } from "../../api/apilist";
import * as imageConversion from 'image-conversion'
export default {
  name: 'Editor',
  props: {
    content: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
         // 富文本更新的值
    richText: {
      type: String, 
      default: "" 
    }
  },
  data() {
    return {
      editor: null,
      menuItem: [
            "head",
            "bold",
            "fontSize",
            "fontName",
            "italic",
            "underline",
            "indent",
            "lineHeight",
            "foreColor",
            "backColor",
            "link",
            "list",
            "justify",
            "image",
            // "video"
        ]
    }
  },
  watch: {
    content:function(newVal,oldVal) {
      if ( newVal != "" ){
        this.editor.txt.html(newVal)
        this.$emit("update:rich-text", newVal);
      }
      console.log(newVal)
  
    }
  },
  mounted() {
    this.initEditor();
    return
    this.editor = new E(this.$refs.editorEle)
    this.editor.customConfig.onchange = (html) => {
      this.$emit('input', html)
    }
    // this.editor.customConfig.uploadImgServer = '/gameway-gamenews/file/upload';
    // this.editor.customConfig.uploadImgHeaders = {
    //   'Authorization' : 'Bearer ' + getToken(),
    //   'content-type': 'multipart/form-data'
    // }
    // // this.editor.customConfig.uploadFileName = '你自定义的文件名'
    // // 下面是最重要的的方法
    // this.editor.customConfig.uploadImgHooks = {
    //   before: function(xhr, editor, files) {
    //     // 图片上传之前触发
    //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

    //     // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
    //     // return {
    //     //     prevent: true,
    //     //     msg: '放弃上传'
    //     // }
    //   },
    //   success: function(xhr, editor, result) {
    //     // 图片上传并返回结果，图片插入成功之后触发
    //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
    //     this.imgUrl = Object.values(result.data).toString()
    //   },
    //   fail: function(xhr, editor, result) {
    //     // 图片上传并返回结果，但图片插入错误时触发
    //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
    //   },
    //   error: function(xhr, editor) {
    //     // 图片上传出错时触发
    //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
    //   },
    //   timeout: function(xhr, editor) {
    //     // 图片上传超时时触发
    //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
    //   },

    //   // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
    //   // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
    //   customInsert: function(insertImg, result, editor) {
    //     // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
    //     // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

    //     // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
    //     // result.data就是服务器返回的图片名字和链接
    //     const url = Object.values(result.data)
    //     // 在这里转成JSON格式
    //     JSON.stringify(url)
    //     insertImg(url)
    //     // result 必须是一个 JSON 格式字符串！！！否则报错
    //   }
    // }
    this.editor.customConfig.uploadImgMaxLength = 5 // 限制一次最多上传 5 张图片 */ 
    this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024 /* 将图片大小限制为 3M 默认为5M / 
    /* 自定义图片上传（支持跨域和非跨域上传，简单操作）*/ 
    this.editor.customConfig.customUploadImg = async (files, insert) => { 
        // let file = files[0];
        // const isLt2M = file.size / 1024 / 1024 < 0.6 // 判定图片大小是否小于4MB
        // if (!isLt2M) {
        //     imageConversion.compressAccurately(file, 400).then(res => {
        //       file = res;
        //   })
        // }
        // let formData = new FormData() 
        // // formData.append('file', files[0]) 
        // formData.append('file', file) 
        // let data = await apiPostFile(formData, { type: 2 }) 
       
        // insert(data.data)
        let file = files[0];
        let formData = new FormData() 
        const isLt2M = file.size / 1024 / 1024 < 0.6 // 判定图片大小是否小于4MB
        if (!isLt2M) {
            imageConversion.compressAccurately(file, 400).then(res => {
              let files = new window.File([res], file.name, {type: res.type})
              formData.append('file', files) 
              apiPostFile(formData, { type: 2 })
                .then(data=>{
                    insert(data.data)
                }) 
          })
        }else{
            formData.append('file', file) 
            let data = await apiPostFile(formData, { type: 2 }) 
          
            insert(data.data)
        }
      
    }
    // 创建富文本实例
    this.editor.create()
    this.editor.txt.html(this.content)
  },
  methods: {
    initEditor(){
      // 获取编辑器dom节点
            // this.editor = new E(this.$refs.editorEle)
            const editor =new E(this.$refs.editorEle)
            // 选择语言
            editor.config.lang = 'en'
            editor.i18next = i18next 
            // 配置编辑器
            editor.config.showLinkImg = false; /* 隐藏插入网络图片的功能 */
            editor.config.onchangeTimeout = 400; /* 配置触发 onchange 的时间频率，默认为 200ms */
            editor.config.uploadImgMaxLength = 1; /* 限制一次最多能传几张图片 */
            // editor.config.showFullScreen = false; /* 配置全屏功能按钮是否展示 */
            editor.config.menus = [...this.menuItem]; /* 自定义系统菜单 */
            // editor.config.uploadImgMaxSize = 5 * 1024 * 1024 /* 限制图片大小 */;
            editor.config.customAlert = err => {
                Message.error(err);
            };
            // 监控变化，同步更新数据
            editor.config.onchange = newHtml => {
                // 异步更新组件富文本值的变化
                this.$emit("update:rich-text", newHtml);
            };
            // 自定义上传图片
            editor.config.customUploadImg = (files, insert) => {
                /**
                 * files
                 * insert：插入图片到富文本
                 * 返回结果为生成的图片URL地址
                 *  */
                // 此方法为自己封赚改写的阿里云图片OSS直传插件。
                    let file = files[0];
                    let formData = new FormData() 
                    const isLt2M = file.size / 1024 / 1024 < 0.6 // 判定图片大小是否小于4MB
                    if (!isLt2M) {
                        imageConversion.compressAccurately(file, 400).then(res => {
                          let files = new window.File([res], file.name, {type: res.type})
                          formData.append('file', files) 
                          apiPostFile(formData, { type: 2 })
                            .then(data=>{
                                insert(data.data)
                            }) 
                      })
                    }else{
                        formData.append('file', file) 
                        apiPostFile(formData, { type: 2 })
                          .then(data=>{
                              insert(data.data)
                          }) 
                      
                        // insert(data.data)
                    }
                
            };
            // 创建编辑器
            editor.create();
            this.editor = editor;
            this.editor.txt.html(this.content)
    },
    clearTxt(){
      this.editor.txt.clear();
    },
    getContent() {
      return this.editor.txt.html()
    },
    createData( value) { // 新建或者编辑回显
      this.$nextTick(() => { // 使用 this.$nextTick 获取焦点
         this.editor.txt.html(value) // 向富文本中插入回显的数据
      })
    },

  }
}
</script>

<style lang="less">
.editor-wrapper {
  .editor-container {
    text-align: left;
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 12px 0;
    .w-e-toolbar {
      padding: 5px;
      border: none !important;
    }
    .w-e-text-container {
      min-height: 450px !important;
      border: none !important;
      overflow:inherit;
      .w-e-text {
        padding: 10px;
        overflow-y: auto;
      }
    }
    .w-e-tooltip{
      // margin-top: -50px;
    }
  }
}
</style>
