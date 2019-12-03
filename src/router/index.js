import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Table from '../views/Table.vue'
import RecordsDetail from '../views/Detail.vue'

import * as firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/table',
    name: 'table',
    component: Table,
    meta: {requiresAuth: true}
  },
  {
    path: '/add/',
    name: 'add',
    component: RecordsDetail,
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: RecordsDetail,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) =>{
  const  requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if(requiresAuth && !isAuthenticated ){
    next('/login')
  }else{
    next()
  }
})

export default router
