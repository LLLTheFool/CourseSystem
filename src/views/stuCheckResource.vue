<template>
    <div class="container" id="app" v-show="!(path === '/login')">
        <div class="box1">
            <img src="../components/icons/Logo.jpg">
            <div class="title">课程管理系统</div>
            <el-button @click.prevent="GoToLogin">登录</el-button>
        </div>
        <div class="line"></div>
        <div class="box2">
            <div class="left">
                <el-button class="square" @click="GoHome">首页</el-button>
                <el-button class="square" @click="GoToPublishResource">查看资源</el-button>
                <el-button class="square" @click="GoToStudentGroup">学生分组情况</el-button>
                <el-button class="square" @click="GoToStudentReport">学生汇报时间</el-button>
                <el-button class="square" @click="GoToProjectManagement">项目管理系统</el-button>
            </div>
            <div class="right">
                <div class="main">
                    <div class="main-content">
                        <div class="resources">
                            <h2 class="resources-title">课堂资源</h2>
                            <div class="resource-card">
                                <div class="resource-content">
                                    <h3>课程大纲</h3>
                                    <p class="description">请下载并查看课程大纲，了解课程结构和学习目标。</p>
                                    <span class="file-type">文件类型: PDF</span>
                                </div>
                                <el-button @click="downloadResource('course-outline')" class="view-details-btn">下载</el-button>
                            </div>
                            <div class="resource-card">
                                <div class="resource-content">
                                    <h3>实验指导</h3>
                                    <p class="description">请下载实验指导文件，按照步骤完成实验。</p>
                                    <span class="file-type">文件类型: Word</span>
                                </div>
                                <el-button @click="downloadResource('experiment-guide')" class="view-details-btn">下载</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <router-view />
</template>

<script>

import { useRouter } from 'vue-router';
// 获取路由实例
const router = useRouter();
export default {
    data() {
        return {
            path: ''
        }
    },
    mounted() {
        this.path = this.$route.path
        console.log(this.$route.path)
    },
    watch: {
        $route(to, from) {
            this.path = to.path
        }
    },
    methods: {
        GoHome() {
            this.$router.push({ name: 'Home' }); // 跳转到登录页面
        },
        GoToLogin() {
            this.$router.push({ name: 'Login' }); // 跳转到登录页面
        },
        GoToStudentGroup() {
            this.$router.push({ name: 'StudentGroup' }); //
        },
        GoToStudentReport() {
            this.$router.push({ name: 'StudentReport' }); //
        },
        GoToTeacherReport() {
            this.$router.push({ name: 'TeacherReport' }); //
        },
        GoToTeacherGroup() {
            this.$router.push({ name: 'TeacherGroup' }); //
        },
        GoToProjectManagement() {
            this.$router.push({ name: 'ProjectManagement' }); // 跳转到项目管理系统页面
        },
        downloadResource(resourceId) {
            // 这里可以添加下载资源的逻辑
            console.log(`下载资源: ${resourceId}`);
        }
    }
}
</script>

<style scoped>
.container {
    height: 100vh;
    width: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0,.05);
}
.box1 {
    display: flex;
    align-items: center;
    height: 150px;
    border: 2px solid rgba(0, 0, 0,.1);
    background-color: white;
}
.box1 img {
    margin-left: 40px;
    height: 100px;
}
.title {
    width: 200px;
    margin-left: 20px;
    font-size: 30px;
    font-weight: bold;
}
.box1 button {
    width: 100px;
    height: 50px;
    background-color: rgba(80, 0, 0);
    border: none;
    font-size: 20px;
    font-weight: bold;
    color: white;
}
.box2 {
    flex: 1;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.left {
    background-color: white;
    border: 2px solid rgba(0, 0, 0,.1);
    width: 200px;
}
.square {
    height: 45px;
    width: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    border: 0;
    border-radius: 0;
    font-size: 20px;
    font-weight: bold;
}
.square label {
    padding: 10px;
}
.right {
    flex: 1;
    padding: 20px;
}
.right label {
    margin-left: 20px;
    font-size: 20px;
    font-weight: bold;
}
.main {
    border: 2px solid rgba(0, 0, 0,.1);
    background-color: white;
    margin-top: 20px;
    flex: 1;
    height: 700px;
}
.resources {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
}
.resources-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
    border-bottom: 2px solid #ccc;
    padding-bottom: 10px;
}
.resource-card {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.resource-content {
    flex: 1;
}
.resource-card h3 {
    margin: 0 0 10px;
    font-size: 24px;
}
.resource-card p {
    margin: 0 0 10px;
    font-size: 16px;
}
.resource-card .description {
    font-size: 16px;
    color: #555;
    margin-bottom: 10px;
}
.resource-card .file-type {
    font-size: 14px;
    color: #888;
}
.view-details-btn {
    margin-left: 20px;
}
</style>