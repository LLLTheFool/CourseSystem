import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue';
import StudentGroup from '../views/StudentGroup.vue';
import StudentReport from '../views/StudentReport.vue';

import Test from '../views/Test.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage 
  },
  {
    path: '/studentGroup',
    name: 'StudentGroup',
    component: StudentGroup 
  },
  {
    path: '/studentReport',
    name: 'StudentReport',
    component: StudentReport
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  }
];

const router = createRouter({ 
  routes,
  history: createWebHistory()
});

export default router;
