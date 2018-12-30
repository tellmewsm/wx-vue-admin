<template>
<!-- <div>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div>
  </div> -->
  <div>
  <template>
  <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="60" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <!-- 修改icon引入可以下载第三方 -->
          <svg-icon icon-class="test3" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">工具类测试</div>
          <!-- <count-to class="card-panel-num" :startVal="0" :endVal="102400" :duration="2600"></count-to> -->
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="60" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="test" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">代码质量管理</div>
          <!-- <count-to class="card-panel-num" :startVal="0" :endVal="81212" :duration="3000"></count-to> -->
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="60" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="test1" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">接口测试</div>
          <!-- <count-to class="card-panel-num" :startVal="0" :endVal="9280" :duration="3200"></count-to> -->
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="60" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="test2" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">压力测试</div>
          <!-- <count-to class="card-panel-num" :startVal="0" :endVal="13600" :duration="3600"></count-to> -->
        </div>
      </div>
    </el-col>
  </el-row>
    <el-row >
      <el-col :xs="12" :sm="10" :lg="60" style="margin-bottom:30px;">
      <div @click="handleSetLineChartData('shoppings')">
       <todo-list></todo-list>
      </div>
    </el-col>
  </el-row>
</template>
</div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import TodoList from './TodoList'

export default {
  name: 'dashboard',
  components: {
    TodoList
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  methods: {
    handleSetLineChartData() {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
