<template>
  <div>

    <!-- <h4>脚本属性</h4> -->
    <div>
      <el-form ref="form"
               :model="form"
               label-width="80px"
               class="demo-form-inline"
               :inline="true">
        <el-form-item label="脚本名称"
                      required="required">
          <el-select v-model="value"
                     placeholder="请选择jmx项目">
            <el-option v-for="item in options"
                       :key="item.lJmx"
                       :label="item.lJmx"
                       :value="item.lJmx"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用默认"
                      required="required">
          <el-select v-model="form.application"
                     placeholder="请选择application名称">
            <el-option label="application"
                       value="application"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间间隔"
                      required="required">
          <el-select v-model="form.time"
                     placeholder="刷新时间间隔">
            <el-option label="5s"
                       value="5s"></el-option>
            <el-option label="10s"
                       value="10s"></el-option>
            <el-option label="30s"
                       value="30s"></el-option>
            <el-option label="1m"
                       value="1m"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="线程名"
                      required="required">
          <!-- <el-select v-model="form.transaction" placeholder="请选择线程名">
      <el-option label="7101" value="7101"></el-option>
    </el-select> -->
          <el-form-item required="required">
            <el-input v-model="form.transaction"
                      placeholder="如：输入7101"></el-input>
          </el-form-item>
        </el-form-item>
        <el-button size="medium"
                   type="primary"
                   @click="actionjmx(value)"
                   plain>执行脚本</el-button>
        <el-button size="medium"
                   type="primary"
                   @click="resetForm();lookreport(form.application, form.transaction,form.time)"
                   plain>性能指标</el-button>
      </el-form>
    </div>

    <!-- 负载机性能 -->
    <div>
      <el-form ref="form"
               :model="machine"
               label-width="80px"
               class="demo-form-inline"
               :inline="true">
        <el-form-item label="负载机器"
                      required="required">
          <el-select v-model="machine.host"
                     placeholder="负载机hostname">
            <el-option label="localhost.localdomain"
                       value="localhost.localdomain"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间间隔"
                      required="required">
          <el-select v-model="machine.time"
                     placeholder="刷新时间间隔">
            <el-option label="5s"
                       value="5s"></el-option>
            <el-option label="10s"
                       value="10s"></el-option>
            <el-option label="30s"
                       value="30s"></el-option>
            <el-option label="1m"
                       value="1m"></el-option>
          </el-select>
        </el-form-item>
        <el-button size="medium"
                   type="primary"
                   @click="watchjvm();lookmachine(machine.host,machine.time)"
                   plain>负载机器服务器指标</el-button>
      </el-form>
    </div>

    <!-- <h4>监控属性</h4> -->
    <div>
      <el-form ref="form"
               :model="machine"
               label-width="80px"
               class="demo-form-inline"
               :inline="true">
        <el-form-item label="服务器名"
                      required="required">
          <!-- <el-select v-model="machine.host" placeholder="请选择服务器名">
      <el-option label="user-test-ay" value="user-test-ay"></el-option>
    </el-select> -->
          <el-form-item required="required">
            <el-input v-model="machine.host1"
                      placeholder="输入服务器hostname"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="时间间隔"
                      required="required">
          <el-select v-model="machine.time1"
                     placeholder="刷新时间间隔">
            <el-option label="5s"
                       value="5s"></el-option>
            <el-option label="10s"
                       value="10s"></el-option>
            <el-option label="30s"
                       value="30s"></el-option>
            <el-option label="1m"
                       value="1m"></el-option>
          </el-select>
        </el-form-item>
        <el-button size="medium"
                   type="primary"
                   @click="watchjvm();lookmachine(machine.host1,machine.time1)"
                   plain>被测项目服务器指标</el-button>
      </el-form>
    </div>

    <!-- <h4>接口性能</h4> -->

    <div v-if="show">
      <iframe v-bind:src="report1"
              width="450"
              height="200"
              frameborder="0"></iframe>
      <iframe v-bind:src="report2"
              width="450"
              height="200"
              frameborder="0"></iframe>
      <iframe v-bind:src="report3"
              width="450"
              height="200"
              frameborder="0"></iframe>
    </div>

    <div v-if="show">
      <iframe v-bind:src="report4"
              width="450"
              height="200"
              frameborder="0"></iframe>
      <iframe v-bind:src="report5"
              width="450"
              height="200"
              frameborder="0"></iframe>
      <iframe v-bind:src="report6"
              width="450"
              height="200"
              frameborder="0"></iframe>
    </div>

    <div v-if="show">
      <iframe v-bind:src="report7"
              width="1350"
              height="300"
              frameborder="0"></iframe>
    </div>

    <!-- <h4>服务器性能</h4> -->

    <div v-if="show1">
      <iframe v-bind:src="machine1"
              width="135"
              height="120"
              frameborder="0"></iframe>
      <iframe v-bind:src="machine2"
              width="135"
              height="120"
              frameborder="0"></iframe>
      <iframe v-bind:src="machine3"
              width="135"
              height="120"
              frameborder="0"></iframe>
      <iframe v-bind:src="machine4"
              width="135"
              height="120"
              frameborder="0"></iframe>
      <iframe v-bind:src="machine5"
              width="135"
              height="120"
              frameborder="0"></iframe>
      <iframe v-bind:src="machine6"
              width="135"
              height="120"
              frameborder="0"></iframe>
      <iframe v-bind:src="machine7"
              width="135"
              height="120"
              frameborder="0"></iframe>
      <iframe v-bind:src="machine8"
              width="135"
              height="120"
              frameborder="0"></iframe>
      <iframe v-bind:src="machine9"
              width="135"
              height="120"
              frameborder="0"></iframe>
      <iframe v-bind:src="machine10"
              width="135"
              height="120"
              frameborder="0"></iframe>
    </div>

    <div v-if="show1">
      <iframe v-bind:src="machine11"
              width="1350"
              height="200"
              frameborder="0"></iframe>
    </div>

    <div v-if="show1">
      <iframe v-bind:src="machine12"
              width="675"
              height="200"
              frameborder="0"></iframe>
      <iframe v-bind:src="machine13"
              width="675"
              height="200"
              frameborder="0"></iframe>
    </div>

    <div v-if="show1">
      <iframe v-bind:src="machine14"
              width="1350"
              height="200"
              frameborder="0"></iframe>
    </div>

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
        parametertype: [],
        application: '',
        transaction: '',
        time: ''
      },
      show: false,
      show1: false,
      options: [],
      value: '',
      machine: {
        host: '',
        time: '',
        host1: '',
        time1: ''
      }
    }
  },
  methods: {
    actionjmx(lJmx) {
      if (lJmx === '') {
        alert('请选择脚本')
        return false
      } else {
        alert('开始执行')
        this.$ajax.get(domain.testUrl + '/jmeter/doExecute/' + lJmx + '.jmx')
          .then((response) => {
            console.log('执行成功')
            alert('执行成功')
          })
      }
    },
    getLoadResult() {
      this.$ajax.get(domain.testUrl + '/api/loadresult')
        .then((response) => {
          this.options = response.data
        })
    },
    resetForm() {
      if (this.show) { this.show = false } else {
        this.show = true
      }
    },
    watchjvm() {
      if (this.show1) { this.show1 = false } else {
        this.show1 = true
      }
    },
    lookreport(application, transaction, time) {
      if (application === '' || transaction === '' || time === '') {
        alert('请完善内容')
        return false
      } else {
        this.report1 = domain.testUrljmeter + '?refresh=' + time + '&orgId=1&panelId=26&var-data_source=Jmeter&var-application=' + application + '&var-transaction=' + transaction + '&var-measurement_name=jmeter&var-send_interval=5&theme=light'
        this.report2 = domain.testUrljmeter + '?refresh=' + time + '&orgId=1&panelId=29&var-data_source=Jmeter&var-application=' + application + '&var-transaction=' + transaction + '&var-measurement_name=jmeter&var-send_interval=5&theme=light'
        this.report3 = domain.testUrljmeter + '?refresh=' + time + '&orgId=1&panelId=28&var-data_source=Jmeter&var-application=' + application + '&var-transaction=' + transaction + '&var-measurement_name=jmeter&var-send_interval=5&theme=light'

        this.report4 = domain.testUrljmeter + '?refresh=' + time + '&orgId=1&panelId=37&var-data_source=Jmeter&var-application=' + application + '&var-transaction=' + transaction + '&var-measurement_name=jmeter&var-send_interval=5&theme=light'
        this.report5 = domain.testUrljmeter + '?refresh=' + time + '&orgId=1&panelId=4&var-data_source=Jmeter&var-application=' + application + '&var-transaction=' + transaction + '&var-measurement_name=jmeter&var-send_interval=5&theme=light'
        this.report6 = domain.testUrljmeter + '?refresh=' + time + '&orgId=1&panelId=2&var-data_source=Jmeter&var-application=' + application + '&var-transaction=' + transaction + '&var-measurement_name=jmeter&var-send_interval=5&theme=light'

        this.report7 = domain.testUrljmeter + '?refresh=' + time + '&orgId=1&panelId=39&var-data_source=Jmeter&var-application=' + application + '&var-transaction=' + transaction + '&var-measurement_name=jmeter&var-send_interval=5&theme=light'
      }
    },

    lookmachine(host, time) {
      if (host === '' || time === '') {
        alert('请完善内容')
        return false
      } else {
        this.machine1 = domain.testUrljvm + '?refresh=' + time + '&orgId=1&panelId=61858&var-datasource=telegraf&var-inter=%24__auto_interval_inter&var-server=' + host + '&var-mountpoint=All&var-cpu=All&var-disk=All&var-netif=All&theme=light'
        this.machine2 = domain.testUrljvm + '?refresh=' + time + '&orgId=1&panelId=61859&var-datasource=telegraf&var-inter=%24__auto_interval_inter&var-server=' + host + '&var-mountpoint=All&var-cpu=All&var-disk=All&var-netif=All&theme=light'
        this.machine3 = domain.testUrljvm + '?refresh=' + time + '&orgId=1&panelId=61862&var-datasource=telegraf&var-inter=%24__auto_interval_inter&var-server=' + host + '&var-mountpoint=All&var-cpu=All&var-disk=All&var-netif=All&theme=light'
        this.machine4 = domain.testUrljvm + '?refresh=' + time + '&orgId=1&panelId=61864&var-datasource=telegraf&var-inter=%24__auto_interval_inter&var-server=' + host + '&var-mountpoint=All&var-cpu=All&var-disk=All&var-netif=All&theme=light'
        this.machine5 = domain.testUrljvm + '?refresh=' + time + '&orgId=1&panelId=61865&var-datasource=telegraf&var-inter=%24__auto_interval_inter&var-server=' + host + '&var-mountpoint=All&var-cpu=All&var-disk=All&var-netif=All&theme=light'
        this.machine6 = domain.testUrljvm + '?refresh=' + time + '&orgId=1&panelId=61861&var-datasource=telegraf&var-inter=%24__auto_interval_inter&var-server=' + host + '&var-mountpoint=All&var-cpu=All&var-disk=All&var-netif=All&theme=light'
        this.machine7 = domain.testUrljvm + '?refresh=' + time + '&orgId=1&panelId=61860&var-datasource=telegraf&var-inter=%24__auto_interval_inter&var-server=' + host + '&var-mountpoint=All&var-cpu=All&var-disk=All&var-netif=All&theme=light'
        this.machine8 = domain.testUrljvm + '?refresh=' + time + '&orgId=1&panelId=61863&var-datasource=telegraf&var-inter=%24__auto_interval_inter&var-server=' + host + '&var-mountpoint=All&var-cpu=All&var-disk=All&var-netif=All&theme=light'
        this.machine9 = domain.testUrljvm + '?refresh=' + time + '&orgId=1&panelId=61866&var-datasource=telegraf&var-inter=%24__auto_interval_inter&var-server=' + host + '&var-mountpoint=All&var-cpu=All&var-disk=All&var-netif=All&theme=light'
        this.machine10 = domain.testUrljvm + '?refresh=' + time + '&orgId=1&panelId=61867&var-datasource=telegraf&var-inter=%24__auto_interval_inter&var-server=' + host + '&var-mountpoint=All&var-cpu=All&var-disk=All&var-netif=All&theme=light'

        this.machine11 = domain.testUrljvm + '?refresh=' + time + '&orgId=1&panelId=28239&var-datasource=telegraf&var-inter=%24__auto_interval_inter&var-server=' + host + '&var-mountpoint=All&var-cpu=All&var-disk=All&var-netif=All&theme=light'

        this.machine12 = domain.testUrljvm + '?refresh=' + time + '&orgId=1&panelId=54694&var-datasource=telegraf&var-inter=%24__auto_interval_inter&var-server=' + host + '&var-mountpoint=All&var-cpu=All&var-disk=All&var-netif=All&theme=light'
        this.machine13 = domain.testUrljvm + '?refresh=' + time + '&orgId=1&panelId=61852&var-datasource=telegraf&var-inter=%24__auto_interval_inter&var-server=' + host + '&var-mountpoint=All&var-cpu=All&var-disk=All&var-netif=All&theme=light'

        this.machine14 = domain.testUrljvm + '?refresh=' + time + '&orgId=1&panelId=12054&var-datasource=telegraf&var-inter=%24__auto_interval_inter&var-server=' + host + '&var-mountpoint=All&var-cpu=All&var-disk=All&var-netif=All&theme=light'
      }
    }

  },
  components: {
    Alert
  },
  created() {
    this.getLoadResult()
  }
}
</script>

<style scoped>
h4 {
  background-color: #678;
  color: rgb(226, 217, 235);
}
</style>

