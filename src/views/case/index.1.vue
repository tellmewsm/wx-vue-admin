<template>
<div>
<div v-if="show1">
<el-upload
  class="upload-demo"
  ref="upload"
  action="http://10.33.94.70:8081/WxTesting/uploadimg"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :auto-upload="false">
  <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="mini" type="success" @click="submitUpload">上传到服务器</el-button>
  <!-- <div slot="tip" class="el-upload__tip" >上传：Jmx测试文件</div> -->
</el-upload>
</div>
<div v-if="show1">
<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="测试用例"
      width="180">
      <template slot-scope="scope">
        <i  class="el-icon-d-arrow-right"></i>
        <el-button     
          type="text"
          @click="handleEdit(scope.$index, scope.row)">{{ scope.row.lJmx }}</el-button>
      </template>
    </el-table-column>
    <el-table-column
      label="测试用例上传时间"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.lCreatetime | formatDate}}</span>
      </template>
    </el-table-column>
        <el-table-column
      label="最后一次测试状态"
      width="180">
      <template slot-scope="scope">
        <el-button     
          type="text"
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">{{ scope.row.lStatus }}</el-button>
      </template>
    </el-table-column>
    <el-table-column
      label="测试类型"
      width="120">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.lTpye }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="最新报告"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.lUpdatetime }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="primary" :disabled="true" icon="el-icon-edit" round>编辑</el-button>
        <el-button size="mini" @click="actionjmx(scope.row.lJmx)"   type="success" icon="el-icon-check" round >执行</el-button>
        <el-button size="mini" @click="deleteClick(scope.row.lId)" type="danger" icon="el-icon-delete" :disabled="false"  round>删除</el-button>
        <el-button size="mini" type="warning" :disabled="scope.row.lStatus == '未执行'" @click="lookreport(scope.row.lJmx,scope.row.lUpdatetime);resetForm()" icon="l-icon-search" round >查看报告</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

</div>
<div v-if="show">
<el-button  @click="resetForm()"  size="mini" type="primary" icon="el-icon-back" round>返回</el-button>
</div>
<div v-if="show">
  <!-- <iframe v-for="item in lists" v-bind:src="item.report" width="1450" height="1350" frameborder=""></iframe> -->
  <iframe  v-bind:src="report" width="1450" height="1350" frameborder=""></iframe>
</div>

</div>
</template>

<script>
import domain from '../domain.js'
import { formatDate } from '@/api/date.js'
export default {
  data() {
    return {
      fileList: [],
      tableData: [],
      lists: [
        { report: '' }
      ],
      report: '',
      show: false,
      show1: true,
      show2: false
    }
  },
  filters: {
    formatDate(time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
      // 此处formatDate是一个函数，将其封装在common/js/date.js里面，便于全局使用
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
      // this.getLoadResult()
      this.$router.go(0)
      // location.reload()
      // this.$router.push({ path: '/case/index.1' })
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    handlePreview(file) {
      // console.log(file)
    },
    handleEdit(index, row) {
      // console.log(index, row)
    },
    handleDelete(index, row) {
      // console.log(index, row)
    },
    getLoadResult() {
      this.$ajax.get(domain.testUrl + '/api/loadresult')
        .then((response) => {
          // console.log(response.data)
          this.tableData = response.data
        })
    },
    actionjmx(lJmx) {
      alert('开始执行')
      this.$ajax.get(domain.testUrl + '/jmeter/doExecute/' + lJmx + '.jmx')
        .then((response) => {
          this.getLoadResult()
          alert('执行成功')
        })
    },
    lookreport(a, b) {
      // this.$router.push({ path: '/case/index.3' })
      // window.location.href = 'http://localhost:8081/WxTesting/reports/activity_20180820_161707/index.html'
      this.report = domain.testUrl + '/reports/' + a + b + '/index.html'
    },
    resetForm() {
      if (this.show) { this.show = false; this.show1 = true } else {
        this.show = true; this.show1 = false
      }
    },
    deleteClick(lId) {
      this.$ajax.delete(domain.testUrl + '/api/deleteresult/' + lId)
        .then((response) => {
          this.$notify({
            title: '删除',
            message: '删除成功',
            type: 'success'
          })
          this.getLoadResult()
        })
    }

  },
  created() {
    this.getLoadResult()
  }
}
</script>

<style scoped>
</style>

