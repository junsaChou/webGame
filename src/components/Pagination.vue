<template>
  <div class="pagination-wrapper">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-sizes="pageSizes"
      :page-size.sync="pageSize"
      :pager-count="7"
      :total="total"
      :layout="layout"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: {
      type: Number,
      default: 1,
      required: true
    },
    limit: {
      type: Number,
      default: 10,
      required: true
    },
    background: {
      type: Boolean,
      default: true
    },
    pageSizes: {
      type: Array,
      default: () => [10, 15, 20, 50]
    },
    total: {
      type: Number,
      default: 0,
      required: true
    },
    layout: {
      type: String,
      // default: 'total, prev, pager, next, sizes, jumper'
       default: 'prev, pager, next,sizes'
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) { // 当前的 key名不一致
      this.$emit('pagination', { page: this.currentPage, limit: val })
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
    }
  }
}
</script>

<style lang="less">
.el-pagination.is-background .el-pager li:not(.disabled).active{
  background: linear-gradient(90deg, #ECB639 0%, #EE8A22 100%);
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #606266;
}
.pagination-wrapper{
  margin: 5px auto 30px;
  .el-pagination{
    .btn-prev{
      width: 50px;
      height: 40px;
      line-height: 40px;
      .el-icon{
        font-size: 18px;
      }
    }
    .btn-next{
      width: 50px;
      height: 40px;
      line-height: 40px;
       .el-icon{
          font-size: 18px;
        }
    }
    .el-pager {
      li{
        width: 40px;
        height: 40px;
        line-height: 40px;
       
      }
    }
    .el-pagination__sizes{
      display: none;
    }
  }
}
</style>
