<template>
  <div class="container" id="app" v-show="!(path === '/login')">
    <!-- 顶栏 -->
    <div class="box1">
      <img src="../components/icons/Logo.jpg" alt="Logo">
      <div class="title">课程管理系统</div>
      <el-button @click.prevent="GoToLogin">登录</el-button>
    </div>

    <div class="line"></div>

    <!-- 主体内容区域 -->
    <div class="box2">
      <!-- 新的顶部区域 -->
      <div class="title2">
  <!-- 选择框放在左侧 -->
            <select v-model="form.project" id="project" required>
              <option value="" disabled>请选择</option>
              <option value="项目1">项目1</option>
              <option value="项目2">项目2</option>
              <option value="项目3">项目3</option>
              <option value="项目4">项目4</option>
            </select>

            <!-- 中间的标题文本 -->
            <div>项目管理系统</div>
          </div>

      <div class="box3">

      <!-- 左侧导航栏 -->
      <div class="left">
        <el-button class="square" @click="GoToPublishResource">概述</el-button>
        <el-button class="square" @click="GoToWorkPackge">工作包</el-button>
        <el-button class="square" @click="GoToTeacherGroup">周报</el-button>
        <el-button class="square" @click="GoToTeacherReport">成员</el-button>
        <el-button class="square" @click="GoToStudentGroup">项目设置</el-button>
      </div>

      <!-- 右侧内容区域：表单 -->
      <div class="right">
        <div class="create">
          <el-button type="primary" @click="handleSelect">创建任务</el-button>
        </div>
        <div class="packge">
          <table class="form-table">
            <thead>
              <tr>
                <th>序号</th>
                <th>主题</th>
                <th>状态</th>
                <th>受理人</th>
                <th>优先级</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in tableData" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.subject }}</td>
                <td>{{ item.status }}</td>
                <td>{{ item.assignee }}</td>
                <td>{{ item.priority }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 表单 -->
        <div v-if="formVisible" class="form-container">
          <h3>新增任务 {{ formTitle }}</h3>
          <form @submit.prevent="submitForm">
            <div class="theme">
              <input v-model="form.subject" id="subject" type="text" placeholder="这里是主题（用户输入）" required />
            </div>
            <div class="descrip">
              <input v-model="form.description" id="description" type="text" placeholder="这里是描述（用户输入）" required />
            </div>

            <label for="gang">人员</label>
            <div class="form-group">
              <label for="responsible-person">受理人</label>
              <select v-model="form.responsiblePerson" id="responsible-person" required>
                <option value="" disabled>请选择</option>
                <option value="组员1">组员1</option>
                <option value="组员2">组员2</option>
                <option value="组员3">组员3</option>
                <option value="组员4">组员4</option>
              </select>
            </div>

            <div class="form-group">
              <label for="leader">负责人</label>
              <select v-model="form.leader" id="leader" required>
                <option value="" disabled>请选择</option>
                <option value="组员1">组员1</option>
                <option value="组员2">组员2</option>
                <option value="组员3">组员3</option>
                <option value="组员4">组员4</option>
              </select>
            </div>

            <label for="gang">详细信息</label>
            <div class="form-group">
              <label for="priority">优先级</label>
              <select v-model="form.priority" id="priority" required>
                <option value="" disabled>请选择优先级</option>
                <option value="低">低</option>
                <option value="普通">普通</option>
                <option value="高">高</option>
                <option value="立即">立即</option>
              </select>
            </div>

            <div class="date">
              <label for="description">日期</label>
              <textarea v-model="form.date" id="date" placeholder="用户输入" required></textarea>
            </div>

            <div class="form-buttons">
              <button type="submit">保存</button>
              <button type="button" @click="resetForm">取消</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  </div>

  <router-view />
</template>


<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';  // 引入 useRouter

export default {
  data() {
  return {
    value: '', // 用于绑定下拉框的值
    options: [],
    tableData: [],  // 存储表格数据
    formVisible: false,  // 控制表单显示
    formTitle: '',       // 表单标题
    form: {
      subject: '',       // 主题
      description: '',   // 描述
      priority: '',      // 优先级
      responsiblePerson: '', // 受理人
      leader: '', // 负责人
      date: ''           // 日期
    }
  };
},


  methods: {
    handleSelect() {
      this.formVisible = true; // 点击创建按钮时显示表单
    },
  // 处理文件选择事件
  handleFileChange(event) {
    const file = event.target.files[0]; // 获取选择的文件
    if (file) {
      console.log('选中的文件:', file.name);
      // 这里可以添加处理上传文件的逻辑
    }
  },
    // 获取路由实例
    router: useRouter(),

    // 跳转相关方法
    GoHome() {
      this.router.push({ name: 'Home' }); // 跳转到首页
    },
    GoToLogin() {
      this.router.push({ name: 'Login' }); // 跳转到登录页面
    },
    GoToStudentGroup() {
      this.router.push({ name: 'StudentGroup' }); // 跳转到学生分组页面
    },
    GoToStudentReport() {
      this.router.push({ name: 'StudentReport' }); // 跳转到学生汇报页面
    },
    GoToTeacherReport() {
      this.router.push({ name: 'TeacherReport' }); // 跳转到教师汇报页面
    },
    GoToTeacherGroup() {
      this.router.push({ name: 'TeacherGroup' }); // 跳转到教师分组页面
    },

    // 提交表单
    submitForm() {
  // 将表单数据添加到表格数据中
  this.tableData.push({
  subject: this.form.subject,
  status: '新增',       // 默认状态，可以根据需要修改
  assignee: this.form.responsiblePerson,  // 受理人
  leader: this.form.leader,  // 负责人
  priority: this.form.priority, // 优先级
  date: this.form.date     // 日期
});


  console.log('表格数据:', this.tableData);

  // 提交后重置表单并隐藏表单容器
  this.resetForm();
  this.formVisible = false;
},



    // 重置表单
    resetForm() {
  this.form = {
    subject: '',
    description: '',
    priority: '',
  };
  this.formVisible = false;  // 隐藏表单
},

  },
};
</script>

<style scoped>
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
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
  display: flex;
  flex-direction: column; /* 修改为垂直方向排列 */
}

.title2 {
  background-color: white;  /* 给 title2 添加背景色 */
  padding: 5px;
  display: flex;
 
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  border: 1px solid black;
}

.title2 > div {
  flex-grow: 1;  /* 使标题区域占据剩余空间 */
  text-align: center;  /* 使标题文字居中 */
}

.title2 select {
  margin-right: 20px;      /* 选择框和标题之间的间距 */
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 5px;
  width: 200px;
}

.box3{
  flex: 1;
  display: flex;
  flex-direction: row; /* 修改为垂直方向排列 */
}
/* 左侧导航栏 */
.left {
  background-color: white;
  border: 2px solid rgba(0, 0, 0, 0.1);
  margin-right: 20px;
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
  justify-content: center;
}

/* 右侧内容区域 */
.right {
  flex: 1;
  padding: 30px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  background-color: white;
}

.create {
  position: absolute;  /* 使用绝对定位 */
  right: 30px;  
      
}
.create  button{
  position: absolute;  /* 使用绝对定位 */
  right: 30px;  
  width: 100px;
  height: 40px;
}

.form-container {
  position: absolute; /* 使用绝对定位 */
  top: 36%;  /* 根据需要调整位置 */
  left: 25%;
  transform: translateX(-50%);  /* 使其居中 */
  border: 1px solid black;
  padding: 10px;
  border-radius: 8px;
  width: 300px;
  background-color: white;  /* 设置明确的背景色 */
  z-index: 10;  /* 确保在其他元素之上 */
}


form div {
  margin-bottom: 10px;
}

form label {
  display: block;
  font-weight: bold;
}

form input,
form textarea,
form select {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  margin-top: 5px;
}

/* 保证表单容器有相对定位 */
form {
  position: relative;  /* 为了让按钮容器相对表单定位 */
  padding-bottom: 60px; /* 留出足够的空间来放置按钮 */
}

/* 按钮容器定位 */
.form-buttons {
  position: absolute;  /* 使用绝对定位 */
  bottom: 20px;         /* 离表单底部20px */
  right: 10px;          /* 离表单右侧20px */
  display: flex;        /* 水平排列按钮 */
  gap: 10px;            /* 按钮之间的间距 */
}

/* 按钮样式 */
form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  min-width: 70px;  /* 设置按钮最小宽度，确保按钮不因内容过短而显得太小 */
}

form button:hover {
  background-color: #0056b3;
}

/* 设置取消按钮的样式 */
form button[type="button"] {
  background-color: #ccc;  /* 设置取消按钮的背景颜色 */
}

form button[type="button"]:hover {
  background-color: #999;  /* 设置取消按钮的 hover 状态 */
}


/* 样式：让“负责人”和选择框在同一行显示 */
.form-group {
  display: flex;        /* 使用 flexbox 布局 */
  align-items: center;  /* 垂直居中对齐 */
  margin-bottom: 15px;   /* 给表单项添加底部间距 */
}

.form-group label {
  font-weight: bold;     /* 设置 label 字体加粗 */
  margin-right: 10px;    /* 给 label 和 select 之间添加间距 */
}

.form-group select {
  flex: 1;               /* 让 select 填满剩余空间 */
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
}


.theme {
  display: flex;             /* 使用 flexbox 布局 */
  justify-content: center;   /* 水平居中 */
  margin-bottom: 15px;       /* 给每个输入框底部添加间距 */
}

/* 输入框样式 */
.theme input {
  width: 90%;                /* 输入框宽度 80%，可以根据需要调整 */
  padding: 10px;             /* 内边距 */
  font-size: 16px;           /* 字体大小 */
  border: 1px solid black;   /* 边框 */
  border-radius: 5px;
}
.descrip {
  display: flex;             /* 使用 flexbox 布局 */
  justify-content: center;   /* 水平居中 */
  margin-bottom: 15px;       /* 给每个输入框底部添加间距 */
}

/* 输入框样式 */
.descrip input {
  height: 60px;
  width: 90%;                /* 输入框宽度 80%，可以根据需要调整 */
  padding: 10px;             /* 内边距 */
  font-size: 16px;           /* 字体大小 */
  border: 1px solid black;   /* 边框 */
  border-radius: 5px;
  padding-top: 0;                   /* 去掉顶部内边距，确保文字贴近顶部 */
  text-align: left;                 /* 确保文字左对齐 */
}
/* 让日期标签和输入框在同一行 */
.date {
  display: flex;               /* 使用 flexbox 布局 */
  align-items: center;         /* 垂直居中对齐 */
  margin-bottom: 15px;         /* 给每个输入框底部添加间距 */
}

/* 日期标签样式 */
.date label {
  font-weight: bold;
  margin-right: 23px;          /* 给标签和输入框之间添加一点间距 */
}

/* 输入框样式 */
.date textarea {
  height: 20px;
  width: 74%;                  /* 控制输入框宽度，70% 可以根据需要调整 */
  padding: 10px;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 5px;
  resize: none;   
}

form label[for="gang"] {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  border-bottom: 2px solid #000;  /* 添加下边框 */
  padding-bottom: 5px;  /* 让文字和横线之间有间距 */
  margin-top: 15px;     /* 给标签上方添加间距 */
}
.form-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 50px;
}

.form-table th, .form-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.form-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

</style>
