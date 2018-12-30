import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [

  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '加密测试', icon: 'list' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'DES加解密', icon: 'password' }
      },
      {
        path: 'index2',
        name: 'Tree',
        component: () => import('@/views/tree/index2'),
        meta: { title: 'AES加解密', icon: 'lock' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    //  路径错误跳转
    redirect: '/form/index',
    name: 'Form',
    meta: { title: '接口测试', icon: 'component' },
    children: [
      {
        path: 'add',
        name: 'xinjian',
        component: () => import('@/views/form/add'),
        meta: { title: '新建用例', icon: 'edit' }
      },
      {
        path: 'index',
        name: 'jktest',
        component: () => import('@/views/form/index'),
        meta: { title: '用例管理', icon: 'list' }
      },
      {
        path: 'index2',
        name: 'ylgl',
        component: () => import('@/views/form/index2'),
        meta: { title: '测试报告', icon: 'bug' }
      },
      {
        path: 'interresult',
        name: 'interresult',
        component: () => import('@/views/chart/interresult'),
        meta: { title: '测试图表', icon: 'bug' }
      }
    ]
  },
  {
    path: '/case',
    component: Layout,
    redirect: '/case/index',
    name: 'case',
    meta: { title: '性能测试', icon: 'people' },
    children: [{
      path: 'index',
      name: 'loadtest1',
      component: () => import('@/views/case/index'),
      meta: { title: '手动压测', icon: 'guide' }
    },
    {
      path: 'index.1',
      name: 'loadtest2',
      component: () => import('@/views/case/index.1'),
      meta: { title: '上传测试', icon: 'tree' }
    },
    {
      path: 'index.2',
      name: 'loadtest3',
      component: () => import('@/views/case/index.2'),
      meta: { title: '实时压测', icon: 'chart' }
    }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
  base: '/wx/'
})

