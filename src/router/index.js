import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=> import('../views/Home.vue'),
    },
   
   
    {
      path: '/stumanagement',
      name: 'stumanagement',
      component: () => import('../views/stumanagement.vue'),
    },
    {
      path: '/groupInfo',
      name: 'groupInfo',
      component: () => import('../views/groupInfo.vue'),
    },
    {
      path: '/publishResources',
      name: 'publishResources',
      component: () => import('../views/publishResources.vue'),
    },
    {
      path: '/Infoimport',
      name: 'Infoimport',
      component: () => import('../views/InfoImport.vue')
    },
    {
      path: '/studentReport',
      name: 'studentReport',
      component: () => import('../views/studentReport.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginPage.vue')
    },
  ],
})

export default router
