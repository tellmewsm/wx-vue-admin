<template>
  <div>
    <el-input
    type="textarea"
    :autosize="{ minRows: 5, maxRows: 20}"
    placeholder="请输入需要加解密的内容"
    v-model="inputcontent">
  </el-input>
  <el-row>
    <el-button type="primary" plain v-on:click="decryptMsg">AES解密</el-button>
    <el-button type="primary" v-on:click="encryptMsg">AES加密</el-button>
  </el-row>
  <div style="margin: 10px 0;"></div>
  <el-input 
  type="textarea"
  :autosize="{ minRows: 5, maxRows: 20}"
  placeholder="加密解密输出内容地方"
  v-model="outputcontent">
</el-input>
</div>
</template>

<script>
import domain from '../domain.js'
export default {
  data() {
    return {
      inputcontent: '',
      outputcontent: ''
    }
  },
  methods: {
    decryptMsg() {
      var _self = this
      this.$ajax({
        method: 'post',
        url: domain.testUrl + '/aesDecode',
        // data用于 bodydata形式
        params: {
          request: _self.inputcontent
        }
      }).then(response => {
        // console.log(response.data)
        this.outputcontent = JSON.stringify(response.data)
      })
    },
    encryptMsg() {
      var _self = this
      this.$ajax({
        method: 'post',
        url: domain.testUrl + '/aesEncode',
        // data用于 bodydata形式
        params: {
          request: _self.inputcontent
        }
      })
        .then(response => {
          if (response.status === 200) {
            // console.log(response.data)
            this.outputcontent = JSON.stringify(response.data)
          } else {
            // 由后端抛出的错误
            alert(response.data.message)
          }
        })
        .catch(function(error) {
          // 由网络或者服务器抛出的错误
          alert(error.toString())
        })
    }
  }
}
</script>

