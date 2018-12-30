<template>
<div>
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
  <el-form-item>
    <el-button type="primary" @click="updateyongli">创建用例</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script>
import domain from '../domain.js'
export default {
  data() {
    return {
      form: {
        alert: '',
        domain: '',
        project: '',
        requesttype: '',
        result: '',
        status: '',
        content: '',
        parametertype: ''
      }
    }
  },
  methods: {
    fetchonecase(id) {
      this.$ajax.get(domain.testUrl + '/cases/id?id=' + id)
        .then((response) => {
          console.log(response.data)
          this.form = response.data
        })
    },
    updateyongli(id) {
      this.$ajax({
        method: 'put',
        url: domain.testUrl + '/cases/update' + id,
        // data用于 bodydata形式
        data: {
          domain: this.form.domain,
          project: this.form.project,
          requesttype: this.form.requesttype,
          result: this.form.result,
          status: this.form.status,
          parametertype: this.form.parametertype,
          content: this.form.content
        }
      }).then((response) => {
        this.$router.push({ path: '/form/index' })
      })
    }
  },
  created() {
    this.fetchonecase()
  }
}
</script>

<style scoped>

</style>

