import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue';
import StudentGroup from '../views/StudentGroup.vue';
import StudentReport from '../views/StudentReport.vue';
import gc from '../views/TeacherGroup.vue'
import rs from '../views/TeacherReport.vue' 
import Test from '../views/Test.vue'
import TeacherResource from '../views/teacher_resource.vue';

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
  },
  {
    path: '/teachergroup', // 路由路径
    name: 'TeacherGroup',
    component: gc // 组件对应路由
  },
  {
    path: '/teacherreport', // 路由路径
    name: 'TeacherReport',
    component: rs // 组件对应路由
  },
  {
    path: '/teacherresource',
    name: 'TeacherResource',
    component: TeacherResource
  }
];

const router = createRouter({ 
  routes,
  history: createWebHistory()
});

export default router;
