<template>
<div>
  <!-- :slot-scope="scope" -->
  <el-table
    :data="tableData2"
    style="width: 100%"
    height="750"
    border
    :row-class-name="tableRowClassName">
    <el-table-column
      label="详情"
      fixed
      type="expand"
      width="80">
      <!-- 箭头下拉 -->
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="请求内容">
            <span>{{ props.row.rRequest }}</span>
          </el-form-item>
          <el-form-item label="响应结果">
            <span>{{ props.row.rResponse }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      prop="rDate"
      label="创建日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="rCaseid"
      label="用例编号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="rHeaders"
      label="域名地址"
      width="560">
    </el-table-column>
    <el-table-column
      prop="rStatuscode"
      label="响应码"
      width="200">
    </el-table-column>
    <el-table-column
      prop="rTime"
      label="响应时间"
      width="150">
    </el-table-column>
    <el-table-column
      prop="rCheck"
      label="检查结果"
      width="100"
      :filters="[{ text: '成功', value: '成功' }, { text: '失败', value: '失败' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.rCheck === '成功' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.rCheck}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button @click="deleteresult(scope.row.id)"  type="danger" size="small"  >删除记录</el-button>
      </template>
    </el-table-column>

  </el-table>
  </div>
</template>


<script>
import domain from '../domain.js'
export default {
  data() {
    return {
      tableData2: []
    }
  },
  methods: {
    deleteresult() {
      // this.fetchresults()
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.rCheck === '成功1') {
        return 'success-row'
      } else if (row.rCheck === '失败') {
        return 'warning-row'
      }
      return ''
    },
    fetchresults() {
      this.$ajax.get(domain.testUrl + '/result')
        .then((response) => {
          // console.log(response.data)
          this.tableData2 = response.data
        })
    },
    filterTag(value, row) {
      return row.rCheck === value
    }
  },
  created() {
    this.fetchresults()
  }
}
</script>

<style>
  .el-table .warning-row {
    background: #fcccc3;
  }

  .el-table .success-row {
    background: rgb(228, 204, 216);
  }

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
    /* 100% 上下显示，由于数据太多 */
  }

</style>

