<template>
    <div class="container" id="app" v-show="!(path === '/login')">
      <!-- 顶栏 -->
      <div class="box1">
        <img src="../components/icons/Logo.jpg">
        <div class="title">课程管理系统</div>
        <el-button @click.prevent="GoToLogin">登录</el-button>
      </div>
  
      <div class="line"></div>
  
      <!-- 主体内容区域 -->
      <div class="box2">
        <!-- 左侧导航栏 -->
        <div class="left">
          <el-button class="square" @click="GoHome">首页</el-button>
          <el-button class="square" @click="GoToStuResource">查看资源</el-button>
          <el-button class="square" @click="GoToStudentGroup">学生分组选择</el-button>
          <el-button class="square" @click="GoToStudentReport">学生汇报时间</el-button>
          <el-button class="square" @click="GoToProjectManagement">项目管理系统</el-button>
        </div>
  
        <!-- 右侧内容区域：组容器和加号按钮 -->
        <div class="right">
          <!-- 加号按钮 -->
          <button @click="addGroup" class="add-button">+</button>
  
          <!-- 动态生成的组信息容器 -->
          <div
            v-for="(group, index) in groups"
            :key="index"
            class="group-container"
            :class="{ joined: group.isJoined, created: group.isCreated }"
          >
            <div class="group-info">
              <!-- 组名和输入框放在同一行 -->
              <div class="row">
                <label>组名:</label>
                <input
                  type="text"
                  v-model="group.name"
                  placeholder=""
                  :disabled="group.isJoined"
                />
              </div>
  
              <!-- 组号和输入框放在同一行 -->
              <div class="row">
                <label>组号:</label>
                <input
                  type="text"
                  v-model="group.number"
                  placeholder=""
                  :disabled="group.isJoined"
                />
              </div>
  
              <!-- 人数和输入框放在同一行 -->
              <div class="row">
                <label>人数:</label>
                <input
                  type="number"
                  v-model="group.count"
                  placeholder=""
                  :disabled="group.isJoined"
                />
              </div>
  
              <!-- 创建/加入按钮 -->
              <button
                @click="group.isCreated ? joinGroup(group) : createGroup(group)"
                class="join-button"
                :disabled="group.isJoined"
              >
                {{ group.isJoined ? '已加入' : group.isCreated ? '加入' : '创建' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';  // 引入 useRouter
  
  // 获取路由实例
  const router = useRouter();
  
  // 跳转相关方法
  const GoHome = () => {
    router.push({ name: 'Home' }); // 跳转到首页
  };
  const GoToLogin = () => {
    router.push({ name: 'Login' }); // 跳转到登录页面
  };
  const GoToStudentGroup = () => {
    router.push({ name: 'StudentGroup' }); // 跳转到学生分组页面
  };
  const GoToStudentReport = () => {
    router.push({ name: 'StudentReport' }); // 跳转到学生汇报页面
  };
  const GoToStuResource = () => {
    router.push({ name: 'StuResource' }); // 跳转到学生资源页面
  };
  const GoToProjectManagement = () => {
    router.push({ name: 'ProjectManagement' }); // 跳转到项目管理系统页面
  };
  // 组操作
  const groups = ref([]);
  
  // 添加组
  const addGroup = () => {
    groups.value.push({
      name: '',
      number: '',
      count: 0,
      isJoined: false,
      isCreated: false,
    });
  };
  
  // 创建组
  const createGroup = (group) => {
    console.log("创建组:", group);
    group.isCreated = true;
  };
  
  // 加入组
  const joinGroup = (group) => {
    console.log("加入组:", group);
    group.isJoined = true;
  };
  </script>
  
  
  <style scoped>
  /* 容器样式 */
  .container {
    height: 100vh;
    width: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  .box1 {
    display: flex;
    align-items: center;
    height: 150px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
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
  
  /* 主体部分样式 */
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
    .square:active {
    background-color: blue; /* 将背景颜色设置为蓝色，你也可以替换为你想要的具体蓝色色值，比如 #008cba 等 */
    color: white; /* 可以按需设置文字颜色，让文字显示更清晰，这里设置为白色 */
}
    .square label{
        padding: 10px;
    }
  
  /* 右侧内容样式 */
  .right {
    flex: 1;
    padding: 30px;
    position: relative;
    border: 2px,solid,rgba(0,0,0,.1);
    background-color: white;
    margin-left: 20px;
  }
  
  /* 加号按钮样式 */
  .add-button {
    position: absolute;
    top: 0;
    right: 0;
    background-color: white;
    color: black;
    border: 1px solid black;
    font-size: 20px;
    width: 50px;
    height: 50px;
    padding: 0;
    cursor: pointer;
    z-index: 10;
  }
  
  /* 组容器样式 */
  .group-container {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    width: 100%;
    max-width: 180px;
    box-sizing: border-box;
    transition: transform 0.3s ease;
    position: absolute; /* 绝对定位，确保组容器可以自由定位 */
    top: 50px; /* 距离容器顶部50px */
    right: 40px; /* 距离容器右边20px */
  }
  
  .group-container.created {
    transform: translateX(-650%);
  }
  
  .group-info {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    height: 180px;
  }
  
  .row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  input {
    max-width: 100px;
    width: 100%;
    height: 25px;
  }
  
  /* 禁用输入框样式 */
  input:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
  
  /* 按钮样式 */
  button {
    padding: 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    
  }
  
  .join-button {
    background-color: #008cba;
    color: white;
    margin: 0 auto; /* 水平方向 margin 自动分配，实现水平居中 */
    width:75px;
    height: 35px;
  }
  
  .join-button:hover {
    background-color: #005f6b;
    margin: 0 auto; /* 水平方向 margin 自动分配，实现水平居中 */
    width:75px;

  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  