import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import { RouterTabRoutes } from 'vue-router-tab'
// contentsLayout
import Frame from '../components/layout/Frame.vue'

// Asynchronous Loading Page Components
const importPage = view => () =>
  import(/* webpackChunkName: "p-[request]" */ `../views/${view}.vue`)

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/main',
    component: Frame,
    children: [
      ...RouterTabRoutes,
      {
        path: '/main',
        name: 'main',
        component: importPage('Home'),
        meta: {
          title: 'Home'
        }
      },
      {
        path: '/delivery',
        name: 'delivery',
        component: importPage('Delivery'),
        meta: {
          title: '배송'
        }
      },
      {
        path: '/deliveryscheduled',
        name: 'deliveryScheduled',
        component: importPage('DeliveryScheduled'),
        meta: {
          title: '배송예정'
        }
      },
      {
        path: '/Program',
        name: 'Program',
        component: importPage('Program'),
        meta: {
          title: '프로그램 정보'
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
