<script>
export default{
    data(){
        return{
          path:''
        }
    },
    mounted(){
      this.path = this.$route.path
      console.log(this.$route.path)
    },
    watch:{
      $route(to,from){
        this.path = to.path
      }
    },
    methods:{
        GoHome() {
            this.$router.push({ name: 'Home' }); // 跳转到登录页面
        },
        GoToLogin() {
            this.$router.push({ name: 'Login' }); // 跳转到登录页面
        },
        GoToStudentGroup(){
            this.$router.push({ name: 'StudentGroup' }); //
        },
        GoToStudentReport(){
            this.$router.push({ name: 'StudentReport' }); //
        },
        GoToTeacherReport(){
            this.$router.push({ name: 'TeacherReport' }); //
        },
        GoToTeacherGroup(){
            this.$router.push({ name: 'TeacherGroup' }); //
        },
        GoToWorkPackge(){
            this.$router.push({ name: 'WorkPackge' }); //
        },
    }
}
</script>


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
                <el-button class="square" @click="GoToPublishResource">资源发布</el-button>
                <el-button class="square" @click="GoToManageStudent">学生管理</el-button>
                <el-button class="square" @click="GoToStudentGroup">教师分组情况</el-button>
          <el-button class="square" @click="GoToStudentReport">教师汇报时间</el-button>
            </div>
            <div class="right">
                <label>主页</label>
                <div class="main">
                    
                </div>
            </div>
        </div>
    </div>
    <router-view />
</template>

<style scoped>
    .container{
        height: 100vh;
        width: 100%;
        padding: 0;
        display: flex;
        flex-direction: column;
        background-color: rgba(0,0,0,.05);
    }
    .box1{
        display: flex;
        align-items: center;
        height: 150px;
        border: 2px,solid,rgba(0,0,0,.1);
        background-color: white;
    }
    .box1 img{
        margin-left: 40px;
        height: 100px;
    }
    .title{
        width: 200px;
        margin-left: 20px;

        font-size: 30px;
        font-weight: bold;
    }
    .box1 button{
        width: 100px;
        height: 50px;
        background-color: rgba(80,0,0);
        border: none;

        font-size: 20px;
        font-weight: bold;
        color: white;
    }
    .box2{
        flex: 1;
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .left{
        background-color: white;
        border: 2px,solid,rgba(0,0,0,.1);
        margin-right: 20px;

        width: 200px;
    }
    .square{
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
    .square label{
        padding: 10px;
    }
    .right{
        flex: 1;
    }
    .right label{
        margin-left: 20px;
        font-size: 20px;
        font-weight: bold;
    }
    .main{
        border: 2px,solid,rgba(0,0,0,.1);
        background-color: white;

        margin-top: 20px;
        flex: 1;
        height: 700px;
    }
</style>