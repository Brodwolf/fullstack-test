import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import PageStructure from '../views/PageStructure.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'page-structure',
    component: PageStructure,
    children: [
      {
        path: '/users',
        name: 'user',
        component: () => import('@/views/users/UsersView.vue')
      },
      {
        path: '/users/:userId',
        name: 'user-view',
        component: () => import('@/views/users/ViewUser.vue')
      },
      {
        path: '/contacts',
        name: 'dashboard',
        component: () => import('@/views/contact/ContactView.vue')
      },
      {
        alias: '/',
        path: '/home',
        name: 'default',
        component: () => import('@/views/DefaultView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
