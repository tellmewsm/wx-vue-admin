<template>
<div>
  <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="域名地址" required="required">
    <el-input v-model="form.domain"></el-input>
  </el-form-item>
     <el-form-item label="所属项目" required="required">
    <el-select v-model="form.project" placeholder="请选择测试项目">
      <el-option label="user系统" value="user"></el-option>
      <el-option label="appadmin系统" value="appadmin"></el-option>
      <el-option label="basedata系统" value="basedata"></el-option>
    </el-select>
  </el-form-item>
      <el-form-item label="请求方法" required="required">
    <el-select v-model="form.requesttype" placeholder="请选择http请求类型">
      <el-option label="POST" value="POST"></el-option>
      <el-option label="GET" value="GET"></el-option>
      <el-option label="DELETE" value="DELETE"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="是否生效" required="required">
    <el-checkbox-group v-model="form.status">
      <el-checkbox label="Y" name="Y"></el-checkbox>
      <el-checkbox label="N" name="N"></el-checkbox>
    </el-checkbox-group>
    </el-form-item>
  <el-form-item label="参数类型" required="required">
    <el-checkbox-group v-model="form.parametertype">
      <el-checkbox label="Parameters" name="Parameters"></el-checkbox>
      <el-checkbox label="BodyData" name="BodyData"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="检查点" required="required">
    <el-input  v-model="form.result"></el-input>
  </el-form-item>
  <el-form-item label="请求内容" required="required">
    <el-input type="textarea" v-model="form.content"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="addyongli">创建用例</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script>
import Alert from '@/views/Alert'
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
        status: [],
        content: '',
        parametertype: []
      }
    }
  },
  methods: {
    //  这种写法是一个json+外层
    addyongli() {
      // const newCase = {
      //   domain: this.form.domain,
      //   project: this.form.project,
      //   requesttype: this.form.requesttype,
      //   result: this.form.result,
      //   status: this.form.status[0],
      //   parametertype: this.form.parametertype[0],
      //   content: this.form.content
      // }
      this.$ajax({
        method: 'post',
        url: domain.testUrl + '/cases/add',
        // data用于 bodydata形式
        data: {
          domain: this.form.domain,
          project: this.form.project,
          requesttype: this.form.requesttype,
          result: this.form.result,
          status: this.form.status[0],
          parametertype: this.form.parametertype[0],
          content: this.form.content
        }
      }).then((response) => {
        this.$router.push({ path: '/form/index' })
      })
    }
  },
  components: {
    Alert
  }
}
</script>

<style scoped>

</style>

