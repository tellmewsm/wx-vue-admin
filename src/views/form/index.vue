<template>
<div>
  <div>
    <!-- 查询框 inline行内-->
    <el-form :inline="true" :model="others" class="demo-form-inline">
    <el-form-item label="是否生效" >
    <el-select v-model="others.status" placeholder="是否生效">
      <el-option label="Y" value="Y"></el-option>
      <el-option label="N" value="N"></el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="所属项目">
    <el-select v-model="others.project" placeholder="测试项目">
      <el-option label="user系统" value="user"></el-option>
      <el-option label="appadmin系统" value="appadmin"></el-option>
      <el-option label="basedata系统" value="basedata"></el-option>
    </el-select>
    </el-form-item>
    <el-form-item>
            <el-button type="primary"   @click="searchClick()">查询</el-button>
            <el-button  type="primary" @click="actioncases()">执行用例</el-button>
    </el-form-item>
    </el-form>
</div>
<div>
    <el-table
    :data="caseData"
    border
    height="700"
    style="width: 100%">
    <el-table-column
      fixed 
      prop="project"
      label="项目模块"
      width="90">
    </el-table-column>
      <el-table-column
      prop="status"
      label="生效"
      width="50">
    </el-table-column>
    <el-table-column
      prop="requesttype"
      label="请求方式"
      width="80">
    </el-table-column>
    <el-table-column
      prop="parametertype"
      label="参数方式"
      width="100">
    </el-table-column>
    <el-table-column
      prop="domain"
      label="域名地址"
      width="220">
    </el-table-column>
    <el-table-column
      prop="content"
      label="请求内容"
      width="650">
    </el-table-column>
    <el-table-column
      prop="result"
      label="检查点"
      width="100">
    </el-table-column>
    <el-table-column
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="deleteClick(scope.row.id)" type="danger" size="small">删除</el-button>
        <el-button   type="primary" size="small"  @click="dialogFormVisible = true , fetchonecase(scope.row.id)">编辑</el-button>
      </template>
    </el-table-column>
    </el-table>
    </div>
<!-- 对话框 -->
<el-dialog title="修改用例" :visible.sync="dialogFormVisible">
  <el-form :model="form">
  <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="域名地址">
    <el-input v-model="form.domain"></el-input>
  </el-form-item>
     <el-form-item label="所属项目">
    <el-select v-model="form.project" placeholder="请选择测试项目">
      <el-option label="user系统" value="user"></el-option>
      <el-option label="appadmin系统" value="appadmin"></el-option>
      <el-option label="basedata系统" value="basedata"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="请求方法">
    <el-select v-model="form.requesttype" placeholder="请选择http请求类型">
      <el-option label="POST" value="POST"></el-option>
      <el-option label="GET" value="GET"></el-option>
      <el-option label="DELETE" value="DELETE"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="是否生效" >
    <el-select v-model="form.status" placeholder="请选择是否生效">
      <el-option label="Y" value="Y"></el-option>
      <el-option label="N" value="N"></el-option>
    </el-select>
    </el-form-item>
  <el-form-item label="参数类型">
    <el-select v-model="form.parametertype" placeholder="请选择参数类型">
      <el-option label="Parameters" value="Parameters"></el-option>
      <el-option label="BodyData" value="BodyData"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="检查点">
    <el-input  v-model="form.result"></el-input>
  </el-form-item>
  <el-form-item label="请求内容">
    <el-input type="textarea" v-model="form.content"></el-input>
  </el-form-item>
</el-form>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false ,updateyongli()" >确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
import domain from '../domain.js'
export default {
  data() {
    return {
      caseData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        id: '',
        domain: '',
        project: '',
        requesttype: '',
        result: '',
        status: '',
        content: '',
        parametertype: ''
      },
      others: {
        project: '',
        status: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    deleteClick(id) {
      this.$ajax.delete(domain.testUrl + '/cases/id/' + id)
        .then((response) => {
          this.$notify({
            title: '删除',
            message: '删除成功',
            type: 'success'
          })
          this.fetchcases()
        })
    },
    actioncases() {
      this.$ajax.get(domain.testUrl + '/cases/do')
      this.$notify({
        title: '成功',
        message: '执行成功',
        type: 'success'
      })
    },
    fetchcases() {
      this.$ajax.get(domain.testUrl + '/cases')
        .then((response) => {
        //  console.log(response.data)
          this.caseData = response.data
        })
    },
    fetchonecase(id) {
      this.$ajax.get(domain.testUrl + '/cases/id?id=' + id)
        .then((response) => {
        //  console.log(response.data)
          this.form = response.data
        })
    },
    updateyongli() {
      this.$ajax({
        method: 'put',
        url: domain.testUrl + '/cases/update',
        // data用于 bodydata形式
        data: {
          id: this.form.id,
          domain: this.form.domain,
          project: this.form.project,
          requesttype: this.form.requesttype,
          result: this.form.result,
          status: this.form.status,
          parametertype: this.form.parametertype,
          content: this.form.content
        }
      }).then((response) => {
        this.fetchcases()
      })
    },
    searchClick() {
    }
  },
  created() {
    this.fetchcases()
  }
}
</script>

<style scoped>

</style>

