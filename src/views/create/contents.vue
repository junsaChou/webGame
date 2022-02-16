<template>
  <div class="main con">
    <!-- 热门内容 -->
    <div class="content-game-about">
      <section class="company-activities">
     
        <div class="gw-about-wrap">
          <div class="control-btns">
            <button @click="handleCreate">New Content +</button>
          </div>
          <!-- 表格栏 -->
          <el-table
            ref="multipleTable"
            v-loading="listLoading"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            size="medium"
          >
            <!-- <el-table-column type="selection" width="60" /> -->
            <el-table-column
              show-overflow-tooltip
              prop="title"

              label="Title"
              align="center"
            />
            <el-table-column show-overflow-tooltip label="Create Time" align="center" >
              <template slot-scope="scope">
                <span>{{scope.row.releaseTime | formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="gameName" label="Related Game" align="center" />
            <el-table-column show-overflow-tooltip label="Status"  align="center">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.auditStatus == 1 ? 'info' : scope.row.auditStatus == 2 ? 'success' :  scope.row.auditStatus == 3 ? 'warning' : 'danger'"
                >{{ scope.row.auditStatus == 1 ? 'Reviewing' : scope.row.auditStatus == 2 ? 'Published' : scope.row.auditStatus == 3 ? 'Failed' : 'Removed' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="rejectedReason"
              label="Remarks"
              width="250"
              align="center"
            />
            <el-table-column label="Operation" fixed="right" align="center" width="250">
              <template slot-scope="scope">
                <el-button type="primary" @click="handleEdit(scope.$index,scope.row)">Edit</el-button>
                <el-button type="info" @click="goArticledetails(scope.row)">Preview</el-button>
                <el-button type="danger" @click="handleDelete(scope.$index,scope.row)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </section>
    </div>
    <!-- 分页栏 -->
     <!-- 新增/编辑 弹出栏 -->
    <el-dialog
      :photo-title="formVisibleList.photoTitle"
      :visible.sync="formVisibleList.formVisible"
      :close-on-click-modal="false"
      width="60%"
      class="dialog-form"
      :before-close="handleClose"
    >
      <el-form ref="dialogForm" :model="dialogForm" :rules="formRules" label-width="110px">
        <el-form-item label="Title" prop="title" >
          <el-input v-model="dialogForm.title" maxlength="150" />
        </el-form-item>
        <el-form-item label="Related game" prop="gameId">
          <el-select v-model="dialogForm.gameId"  placeholder="Please select">
            <el-option
              v-for="item in gameInfoOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="Classification" prop="classify">
          <el-select v-model="dialogForm.classify"  placeholder="Please select">
            <el-option
              v-for="item in gameTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item> -->
        <el-form-item >
            <Editor ref="editors" :content="dialogForm.content" :richText.sync="richText"  />
        </el-form-item>
        <div class="footer-item" style="text-align:right;">
          <el-button @click="cancleForm">Cancel</el-button>
          <el-button
            type="primary"
            :disabled="isSubmit"
            @click="submitForm('dialogForm',formVisibleList.isCreate)"
          >Confirm</el-button>
          <!-- <el-button type="primary" v-else :disabled="isSubmit" @click="submitForm('dialogForm')">确 定</el-button> -->
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
//列表 新增 编辑 删除
import { apiGetAuthorContent,apiWebGameInsert,apiWebGamEedit,apiWebGamDelete } from "@/api/changeUser";
import validatorForm from "../../assets/js/validatorForm";
import Editor from '@/components/Editor';
import { getCurrentTime } from '@/utils/config'
import { _isMobile } from '@/utils'
import { mapGetters } from 'vuex'
import { myScrollBtm,myMixinApi } from '@/utils/uploadMixin'
export default {
  name: "signIn",
  components: {Editor },
  mixins:[ myScrollBtm,myMixinApi],
  data() {
    return {
      tableData:[
      ],
      page: {
        current: 1,
        size: 10
      },
      pageCount: 0,
      total: 0,
      listLoading: false,
      dialogForm: {
        title: '',//标题
        releaseTime: getCurrentTime(),//发布时间
        gameId: null, //关联游戏
        content: '',
        // classify:null,
        id:null
      },
      formVisibleList: {
        formVisible: false,
        photoTitle: "Edit",
        isCreate: false
      },
      formRules: {
        title: { required: true, message: "Please enter a title", trigger: "blur" },
        gameId:{ required: true, message: "Please select an related game", trigger: "blur" },
        content:{ required: true, message: "Please enter article details", trigger: "blur" },
        // classify:{ required: true, message: "Please select Classification", trigger: "blur" },
        releaseTime:{ required: true, message: "Please select the publishing time", trigger: "blur" }
      },
      richText:'',//编辑器更新的值
      isSubmit: false,
      userInfo:{},
      gameInfoOptions:[],//关联游戏
      gameTypeOptions:[] //分类
    };
  },
  methods: {
    handleClose() {
      this.cancleForm();
    },
    cancleForm() {
      const that = this;
      this.$refs.editors.clearTxt();
      Object.keys(that.dialogForm).forEach(key => {
        that.dialogForm[key] = null;
      });
      that.dialogForm.releaseTime = getCurrentTime();
      this.formVisibleList.formVisible = false;
    },
    goArticledetails(row) {
      //预览
      // console.log(row)
      // return
      const address = `https://gameway.fun/articledetails?id=${row.id}&address=${row.gameName}`;
      window.open(address);
    },
    handleCreate() {
      // 创建banner 轮播图
      this.formVisibleList.formVisible = true;
      this.formVisibleList.photoTitle = "Create";
      this.formVisibleList.isCreate = true;
     
    },
    // 编辑数据
    handleEdit(index, row) {
        this.formVisibleList.isCreate = false;
      let { title, gameId,content,id } = row;
      if ( typeof(releaseTime) == 'number' ){
         releaseTime = this.$options.filters['FormatDate'](releaseTime);
      }
      if ( gameId == null ) {
        gameId = 'Unrelated'
      }
      this.dialogForm =  { title, gameId,content, id };
      this.dialogForm.releaseTime =  getCurrentTime();
      this.formVisibleList.formVisible = true;
      this.formVisibleList.title = "Edit";
    },
    // 删除数据
    handleDelete(index, row) {
      this.$confirm("This operation will delete the selected data. Do you want to continue？", "", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(() => {
          this.deleteApi(row.id);
          // 此处可添加--删除接口
          // 删除成功调用fetchData方法更新列表
          this.$message({
            type: "success",
            message: "Delete successfully!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete Canceled"
          });
        });
    },
    deleteApi(id) {
      apiWebGamDelete({ id })
        .then(res => {
          if (res.code === 200) {
            this.PostFetchData(); // 重新请求接口
          } else {
            this.$message({
              type: "warning",
              message: res.message
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.listLoading = false;
        });
    },
    PostFetchData() {
        this.listLoading = true;
        // 获取审核数据列表接口
        let data = {...this.page,authorId:this.userInfo.uid}
        // let data = { ...this.listQuery,...this.page }
        apiGetAuthorContent( data )
        .then(res => {
            if (res.code === 200) {
            this.total = res.data.total
            this.pageCount = this.total % this.page.size;
            this.tableData = res.data.records;
            if ( this.page.current != 1 ){
              let newListScroll = JSON.parse(JSON.stringify(this.tableData))
              this.tableData = [ ...newListScroll, ...this.tableData]
            }
            this.listLoading = false;
            }
        })
        .catch(error => {
            console.log(error);
            this.listLoading = false;
        });
    },
    submitForm(formName, isCreate) {
  
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = this.dialogForm;
          data.content = this.$refs.editors.getContent();
          if (data.gameId == 'Unrelated')   data.gameId =null;
          data.auditStatus = 1;
          if (isCreate) {
            data["id"] = null;
            apiWebGameInsert(data) // 创建
              .then(res => {
                if (res.code === 200) {
                  this.PostFetchData();
                  this.cancleForm();
                }
              })
              .catch(error => {
                console.log(error);
                this.listLoading = false;
              });
          } else {
            data.auditStatus = 1;
            apiWebGamEedit(data) // 编辑
              .then(res => {
                if (res.code === 200) {
                  this.PostFetchData();
                  this.cancleForm(); // 清空表单
                }
              })
              .catch(error => {
                this.listLoading = false;
              });
          }
        } else {
          this.isSubmit = false;
          return false;
        }
      });
    },
    isToken( newVal){
       if( newVal!=null & newVal != undefined  ){
              this.userInfo = JSON.parse(this.userInfoList)
              this.PostFetchData();
              this.getGameInfoList();
              // this.getGameTypeApi();
      }else{
         this.userInfo = {}
        this.$router.push({ path: '/' });
      }
    }
  },
  mounted() {
    // this.setBodyBackGround();
      if ( _isMobile()){
        this.$message({
          type: "warning",
          message: 'Please access the new content function through PC'
        });
         this.$router.push({ path: '/' });
        }
  },
  watch: {
    'userInfoList':function(newVal,oldVal) {
      this.isToken(newVal);
    }
  },
  beforeDestroy() {
    // this.clearBodyBackGround();
  },
  computed: {
    ...mapGetters(['userInfoList']),
  },
  created(){
     this.isToken( this.userInfoList );
  },
};
</script>
<style lang="less" scope>

.main {
  // min-height: calc( 100vh - 200px);
  .content-game-about {
    position: relative;
    /* 一维排版 */
    display: flex;
    justify-content: center;
    flex-direction: column;
    .company-activities {
      margin-top: 120px;
      width: 100%;
      .gw-about-wrap {
        .control-btns{
          text-align: left;
          margin-bottom: 10px;
          button{
            font-size: 20px;
            color: #fff;
            padding: 14px 11px;
            background: linear-gradient(268deg, #EE8A22 0%, #ECB639 100%);
            border: none;
            border-radius: 8px;
            cursor: pointer;
          }
        }
        .el-table, .el-table__header-wrapper th.el-table__cell,.el-table th.el-table__cell.is-leaf{
          background-color: #000!important;
        }
        .el-table,.el-table tr,.el-table th.el-table__cell,.el-table__body tr.hover-row>td.el-table__cell{
          background: #3D3D41;
        }
        .el-table .has-gutter tr{
          background: #000;
        }
        .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .el-table--border::after, .el-table--group::after, .el-table::before,.el-table__fixed-right::before, .el-table__fixed::before {
            background-color: rgba(255, 255, 255, 0.1);
        }
        .el-table {
          color: #fff;
          font-size: 16px;
          thead{
            color: #fff;
          }
          .hover-row {
              // background-color: #707070 ;
            
          }
        }
        
      }
    }

  }
}
.el-dialog{
  background: #3D3D41;
  .footer-item{
    display: flex;
    flex-flow: row-reverse;
    .el-button--primary {
      margin-right: 10px;
      background: linear-gradient( 268deg, #EE8A22 0%, #ECB639 100%);
      border: none;
    }
  }
}

form{
  // margin: 0 auto;
  // width: 100%;
  .el-form-item{
    .el-form-item__label{
      color: #BBB;
    }
    .el-form-item__content{
      text-align: left;
      .el-input{
        width: 300px;
      }
      .el-input__inner{
        background-color: transparent;
        border: 1px solid #707070;
        color: #fff;
      }
    }
  }
}

.w-e-text-container .placeholder{
  line-height: 40px;
}
@import "../../assets/css/common.less";
</style>