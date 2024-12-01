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
                <el-button class="square" @click="GoToStudentGroup">学生分组情况</el-button>
                <el-button class="square" @click="GoToStudentReport">学生汇报时间</el-button>
                <el-button class="square" @click="GoToTeacherReport">汇报时间（学生端）</el-button>
                <el-button class="square" @click="GoToTeacherGroup">分组选择（学生端）</el-button>
            </div>
            <div class="right">
                <el-button @click="dialogTableVisible = true">第1组</el-button>
                <el-button @click="dialogTableVisible = true">第2组</el-button>
                <el-button @click="dialogTableVisible = true">第3组</el-button>
                <el-button @click="dialogTableVisible = true">第4组</el-button>
                <el-button @click="dialogTableVisible = true">第5组</el-button>
                <el-button @click="dialogTableVisible = true">第6组</el-button>
            </div>
        </div>
    </div>


    <el-dialog v-model="dialogTableVisible" width="540">
      <el-table :data="gridData">
        <el-table-column property="id" label="学号" width="300" />
        <el-table-column property="name" label="姓名" width="200" />
      </el-table>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="dialogTableVisible = false">关闭</el-button>
        </div>
      </template>
    </el-dialog>
    <router-view />
</template>

<script>
export default{
    data(){
        return{
            path:'',
            dialogTableVisible:false,
            gridData : [
                {
                    id: '20241129',
                    name: '张三',
                },
                {
                    id: '20241130',
                    name: '张三',
                },
                {
                    id: '20241201',
                    name: '张三',
                },
                {
                    id: '20241202',
                    name: '张三',
                },
            ]
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
    }
}
</script>

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
        text-align: left;

    }
    .right{
        border: 2px,solid,rgba(0,0,0,.1);
        background-color: white;

        flex: 1;
        padding: 30px;

        display: grid;
        grid-template-columns: repeat(6,200px);
    }
    .right button{
        height: 150px;
        width: 150px;
        background-color: white;
        font-size: 30px;
        font-weight: bold;
    }
</style>