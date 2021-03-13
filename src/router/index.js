import Vue from 'vue'
import VueRouter from 'vue-router'
import toyApp from '../views/toy-app.vue'
import toyDetails from '../views/toy-details.vue'
import toyEdit from '../views/toy-edit.vue'
import dashboard from '../views/dashboard.vue'
import toyBranches from '../views/toy-branches.vue'
import login from '../views/login.vue'
import reviewEdit from'@/views/review-edit.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/toy',
    name: 'toy',
    component: toyApp
  },
  {
    path: '/details/:toyId',
    name: 'details',
    component: toyDetails
  },
  {
    path: '/details/review/:toyId',
    name: 'review',
    component: reviewEdit
  },
  {
    path: '/edit/:toyId?',
    name: 'edit',
    component: toyEdit
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard
  },
  {
    path: '/branches',
    name: 'branches',
    component: toyBranches
  }
]

const router = new VueRouter({
  routes
})

export default router
