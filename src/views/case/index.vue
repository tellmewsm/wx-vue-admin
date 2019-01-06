<template>
<div>
  <!-- <el-steps v-model="form.step" :active=form.step finish-status="success" simple style="margin-top: 10px">
     <el-step title="HTTP设置" ></el-step>
     <el-step title="Thread设置" ></el-step>
     <el-step title="实时报告" ></el-step>
  </el-steps> -->
  <!-- <h4>HTTP请求</h4> -->
 <el-form ref="form" :model="form" label-width="90px" >
      <el-form-item label="域名地址" style="width:400px" required="required">
    <el-input v-model="form.Jdomain" placeholder="如：appindex-api.baoying188.com"></el-input>
  </el-form-item>
      <el-form-item label="请求地址" style="width:1000px" required="required">
    <el-input v-model="form.Jurl" placeholder="如：https://appindex-api.baoying188.com/appadmin/public/safeMobileHandler.do"></el-input>
  </el-form-item>
     <el-form-item label="请求协议" required="required">
    <el-select v-model="form.Jprotocol" placeholder="请选择协议" >
      <el-option label="http" value="http"></el-option>
      <el-option label="https" value="https"></el-option>
    </el-select>
  </el-form-item>
      <el-form-item label="请求方法" required="required">
    <el-select v-model="form.Jmethod" placeholder="请选择http请求类型" >
      <el-option label="POST" value="POST"></el-option>
      <el-option label="GET" value="GET"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="参数类型" required="required">
    <!-- <el-checkbox-group v-model="form.Jrequest" >
      <el-checkbox label="parameters" name="parameters"></el-checkbox>
      <el-checkbox :disabled="false" label="bodydata" name="bodydata"></el-checkbox>
    </el-checkbox-group> -->
    <el-radio v-model="form.Jrequest" label="parameters">parameters</el-radio>
    <el-radio v-model="form.Jrequest" label="bodydata">bodydata</el-radio>
  </el-form-item>
  <el-form-item label="请求内容" required="required"> 
    <el-input type="textarea" v-model="form.Jcontent" placeholder="request内容、body内容"></el-input>
  </el-form-item>
   <!-- <el-form-item label="检查内容" style="width:400px" required="required">
    <el-input v-model="form.Jcheck" placeholder="如：code:0"></el-input>
  </el-form-item> -->
  <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
<!-- <h4>线程设置</h4> -->
  <el-form-item label="总线程数" style="width:400px" required="required">
    <el-input v-model="form.Jthread" placeholder="最大线程数"></el-input>
  </el-form-item>
      <el-form-item label="ramp up" style="width:1000px" required="required">
    <el-input v-model="form.Jrampup" placeholder="多少秒启动完成"></el-input>
  </el-form-item>
  <el-form-item label="持续时间" style="width:400px" required="required">
    <el-input v-model="form.Jduration" placeholder="运行时间"></el-input>
  </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="actionyongli(form.Jmethod, form.Jurl, form.Jdomain, form.Jprotocol,
      form.Jduration, form.Jrampup, form.Jthread, form.Jrequest, form.Jcontent,form.Jcheck)">开始执行</el-button>
    <el-button type="primary" @click="resetForm();lookreport('HTTP', 'HTTP', '5s',form.Jduration)">实时报告</el-button>
  </el-form-item>
</el-form>
<!-- <h4>压测报告</h4> -->
<div>
<div v-if="show">
<iframe v-bind:src="report1" width="450" height="200" frameborder="0"></iframe>
<iframe v-bind:src="report2" width="450" height="200" frameborder="0"></iframe>
<iframe v-bind:src="report3" width="450" height="200" frameborder="0"></iframe>
</div>

<div v-if="show">
<iframe v-bind:src="report4" width="450" height="200" frameborder="0"></iframe>
<iframe v-bind:src="report5" width="450" height="200" frameborder="0"></iframe>
<iframe v-bind:src="report6" width="450" height="200" frameborder="0"></iframe>
</div>


<div v-if="show">
<iframe v-bind:src="report7" width="1350" height="300" frameborder="0"></iframe>
</div>
</div>
</div>

</template>

<script>
import domain from '../domain.js'
export default {
  data() {
    return {
      form: {
        Jdomain: '',
        Jurl: '',
        Jprotocol: '',
        Jmethod: '',
        Jrequest: '',
        Jcontent: '',
        Jthread: '',
        Jrampup: '',
        Jduration: '',
        Jcheck: '',
        step: ''
      },
      show: false
    }
  },
  methods: {
    // || 或者
    actionyongli(Jmethod, Jurl, Jdomain, Jprotocol,
      Jduration, Jrampup, Jthread, Jrequest, Jcontent, Jcheck) {
      if (Jmethod === '' || Jurl === '' || Jdomain === '' || Jprotocol === '' || Jduration === '' ||
      Jrampup === '' || Jthread === '' || Jrequest === '' || Jcontent === '') {
        console.log('Jmethod=' + Jmethod, 'Jurl =' + Jurl, 'Jdomain =' + Jdomain, 'Jprotocol =' + Jprotocol,
          'Jduration =' + Jduration, 'Jrampup =' + Jrampup, 'Jthread =' + Jthread, 'Jcontent =' + Jcontent, 'Jrequest =' + Jrequest)
        alert('输入框不能存在为空')
        return false
      } else {
        alert('开始执行')
        if (Jrequest === 'parameters') {
          this.$ajax.get(domain.testUrl + '/jmeter/PExecute?' + 'Jrequest=' + '&jmx=vue_p.jmx&' + 'Jprotocol=' + Jprotocol + '&Jthread=' + Jthread + '&Jrampup=' + Jrampup + '&Jduration=' + Jduration + '&Jdomain=' + Jdomain + '&Jurl=' + Jurl + '&Jmethod=' + Jmethod + '&Jcontent=' + Jcontent)
            .then((response) => {
              alert('执行成功')
            })
        } else {
          this.$ajax.get(domain.testUrl + '/jmeter/PExecute?' + 'Jrequest=' + '&jmx=vue_b.jmx&' + 'Jprotocol=' + Jprotocol + '&Jthread=' + Jthread + '&Jrampup=' + Jrampup + '&Jduration=' + Jduration + '&Jdomain=' + Jdomain + '&Jurl=' + Jurl + '&Jmethod=' + Jmethod + '&Jcontent=' + Jcontent)
            .then((response) => {
              alert('执行成功')
            })
        }
      }
    },
    lookreport(application, transaction, time, to) {
      if (to === '') {
        alert('持续时间不能存在为空')
        return false
      } else {
        var timestamp = new Date().getTime()
        var timestamp1 = timestamp + to * 900
        this.report1 = domain.testUrljmeter + '?refresh=' + time + '&from=' + timestamp + '&to=' + timestamp1 + '&orgId=1&panelId=26&var-data_source=Jmeter&var-application=' + application + '&var-transaction=' + transaction + '&var-measurement_name=jmeter&var-send_interval=5&theme=light'
        this.report2 = domain.testUrljmeter + '?refresh=' + time + '&from=' + timestamp + '&to=' + timestamp1 + '&orgId=1&panelId=29&var-data_source=Jmeter&var-application=' + application + '&var-transaction=' + transaction + '&var-measurement_name=jmeter&var-send_interval=5&theme=light'
        this.report3 = domain.testUrljmeter + '?refresh=' + time + '&from=' + timestamp + '&to=' + timestamp1 + '&orgId=1&panelId=28&var-data_source=Jmeter&var-application=' + application + '&var-transaction=' + transaction + '&var-measurement_name=jmeter&var-send_interval=5&theme=light'

        this.report4 = domain.testUrljmeter + '?refresh=' + time + '&from=' + timestamp + '&to=' + timestamp1 + '&orgId=1&panelId=37&var-data_source=Jmeter&var-application=' + application + '&var-transaction=' + transaction + '&var-measurement_name=jmeter&var-send_interval=5&theme=light'
        this.report5 = domain.testUrljmeter + '?refresh=' + time + '&from=' + timestamp + '&to=' + timestamp1 + '&orgId=1&panelId=4&var-data_source=Jmeter&var-application=' + application + '&var-transaction=' + transaction + '&var-measurement_name=jmeter&var-send_interval=5&theme=light'
        this.report6 = domain.testUrljmeter + '?refresh=' + time + '&from=' + timestamp + '&to=' + timestamp1 + '&orgId=1&panelId=2&var-data_source=Jmeter&var-application=' + application + '&var-transaction=' + transaction + '&var-measurement_name=jmeter&var-send_interval=5&theme=light'

        this.report7 = domain.testUrljmeter + '?refresh=' + time + '&from=' + timestamp + '&to=' + timestamp1 + '&orgId=1&panelId=39&var-data_source=Jmeter&var-application=' + application + '&var-transaction=' + transaction + '&var-measurement_name=jmeter&var-send_interval=5&theme=light'
      }
    },
    resetForm() {
      if (this.show) { this.show = false } else {
        this.show = true
      }
    },
    next() {
      if (this.form.step++ > 2) this.form.step = 0
    }
  }
}
</script>

<style scoped>
/* .el-select .el-input {
    width: 500px;
  } */
.input-with-select .el-input-group__prepend {
    background-color: #678;
  }
  h4{
background-color:#678;
color:rgb(226, 217, 235)
}
</style>

