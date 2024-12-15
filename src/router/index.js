import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue';
import StudentGroup from '../views/studentGroup.vue';
import StudentReport from '../views/studentReport.vue';
import TeacherGroup from '../views/teacherGroup.vue'
import TeacherReport from '../views/teacherReport.vue' 
import Test from '../views/Test.vue'
import TeacherResource from '../views/teacher_resource.vue';
import StuResource from '../views/stuCheckResource.vue';
import ProjectManagement from "@/views/ProjectManagement.vue";
import WorkPackge from '../views/WorkPackge.vue'

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
    path: '/teachergroup', 
    name: 'TeacherGroup',
    component: TeacherGroup 
  },
  {
    path: '/teacherreport',
    name: 'TeacherReport',
    component: TeacherReport
  },
  {
    path: '/teacherresource',
    name: 'TeacherResource',
    component: TeacherResource
  },
  {
    path: '/sturesource',
    name: 'StuResource',
    component: StuResource
  },
  {
    path: '/project-management/:tab?',
    name: 'ProjectManagement',
    component: ProjectManagement,
    props: true
  },
  {
    path: '/workpackge',
    name: 'WorkPackge',
    component: WorkPackge
  }
];

const router = createRouter({ 
  routes,
  history: createWebHistory()
});

export default router;
