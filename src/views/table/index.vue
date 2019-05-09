<template>
  <div>
    <el-input type="textarea"
              :autosize="{ minRows: 5, maxRows: 20}"
              placeholder="请输入需要加解密的内容"
              v-model="input">
    </el-input>
    <el-row>
      <el-button type="primary"
                 round
                 v-on:click="desdecrypt">DES解密</el-button>
      <el-button type="primary"
                 round
                 v-on:click="desencrypt">DES加密</el-button>
    </el-row>
    <div style="margin: 10px 0;"></div>
    <el-input type="textarea"
              :autosize="{ minRows: 5, maxRows: 20}"
              placeholder="加密解密输出内容地方"
              v-model="output">
    </el-input>
  </div>
</template> 

<script>
import domain from '../domain.js'
export default {
  data() {
    return {
      input: '',
      output: ''
    }
  },
  methods: {
    desdecrypt() {
      var _self = this
      this.$ajax({
        method: 'post',
        url: domain.testUrl + '/desDecode',
        // data用于 bodydata形式
        params: {
          request: _self.input
        }
      }).then(response => {
        // console.log(response)
        this.output = JSON.stringify(response.data)
      })
    },
    desencrypt() {
      var _self = this
      this.$ajax({
        method: 'post',
        url: domain.testUrl + '/desEncode',
        // data用于 bodydata形式
        params: {
          request: _self.input
        }
      })
        .then(response => {
          if (response.status === 200) {
            // console.log(response.data)
            this.output = JSON.stringify(response.data)
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
