<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <input class="new-todo"
             autocomplete="off"
             placeholder="Todo List"
             @keyup.enter="addTodo">
    </header>
    <!-- main section -->
    <section class="main"
             v-show="todos.length">
      <input class="toggle-all"
             id="toggle-all"
             type="checkbox"
             :checked="allChecked"
             @change="toggleAll({ done: !allChecked })">
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <todo @toggleTodo='toggleTodo'
              @editTodo='editTodo'
              @deleteTodo='deleteTodo'
              v-for="(todo, index) in filteredTodos"
              :key="index"
              :todo="todo"></todo>
      </ul>
    </section>
    <!-- footer -->
    <footer class="footer"
            v-show="todos.length">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('item') }} left
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters"
            :key="key">
          <a :class="{ selected: visibility === key }"
             @click.prevent="visibility = key">{{ key | capitalize }}</a>
        </li>
      </ul>
      <!-- <button class="clear-completed" v-show="todos.length > remaining" @click="clearCompleted">
        Clear completed
      </button> -->
    </footer>
  </section>
</template>

<script>
import Todo from './Todo.vue'

const STORAGE_KEY = 'todos'
const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}
const defalutList = [
  { text: 'Https接口测试、结果入库', done: true },
  { text: 'jmeter压力测试，支持jmx上传', done: true },
  { text: 'Grafana监控性能指标、实时监控', done: true },
  { text: 'mysql数据入库，引用redis', done: true },
  { text: 'easy mock登录改成spring本地接口', done: true },
  { text: 'jmx压测脚本模版，自定义并生成', done: false },
  { text: 'jmeter集群压力测试开发', done: false },
  { text: '中间件、创建docker镜像', done: false }
]
export default {
  components: { Todo },
  data() {
    return {
      visibility: 'all',
      filters,
      // todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || defalutList
      todos: defalutList
    }
  },
  computed: {
    allChecked() {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining() {
      return this.todos.filter(todo => !todo.done).length
    }
  },
  methods: {
    setLocalStorgae() {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    addTodo(e) {
      const text = e.target.value
      if (text.trim()) {
        this.todos.push({
          text,
          done: false
        })
        this.setLocalStorgae()
      }
      e.target.value = ''
    },
    toggleTodo(val) {
      val.done = !val.done
      this.setLocalStorgae()
    },
    deleteTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
      this.setLocalStorgae()
    },
    editTodo({ todo, value }) {
      todo.text = value
      this.setLocalStorgae()
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.done)
      this.setLocalStorgae()
    },
    toggleAll({ done }) {
      this.todos.forEach(todo => {
        todo.done = done
        this.setLocalStorgae()
      })
    }
  },
  filters: {
    pluralize: (n, w) => n === 1 ? w : w + 's',
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
