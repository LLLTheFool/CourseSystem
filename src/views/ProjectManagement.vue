<template>
    <div class="container" id="app">
        <div class="box1">
            <!-- 项目选择下拉菜单 -->
            <el-select v-model="selectedProject" placeholder="请选择项目" class="project-select">
                <el-option label="项目1" value="project1"></el-option>
                <el-option label="项目2" value="project2"></el-option>
                <el-option label="项目3" value="project3"></el-option>
                <el-option label="项目4" value="project4"></el-option>
            </el-select>
            <div class="title">项目管理系统</div>
        </div>
        <div class="line"></div>
        <div class="box2">
            <div class="left">
                <!-- 侧边栏导航 -->
                <el-button class="square" @click="activeTab = 'overview'">项目概述</el-button>
                <el-button class="square" @click="activeTab = 'workPackages'">工作包</el-button>
                <el-button class="square" @click="activeTab = 'weeklyReports'">周报</el-button>
                <el-button class="square" @click="activeTab = 'members'">成员</el-button>
                <el-button class="square" @click="activeTab = 'projectSettings'">项目设置</el-button>
            </div>
            <div class="right">
                <label>{{ activeTab === 'weeklyReports' ? '周报' : activeTab }}</label>
                <div class="main">
                    <div class="main-content">
                        <!-- 根据 activeTab 动态显示内容 -->
                        <div v-if="activeTab === 'overview'" class="tab-content">
                            <h2>项目概述</h2>
                            <p>这里是项目概述的内容。</p>
                        </div>
                        <div v-else-if="activeTab === 'workPackages'" class="tab-content">
                            <h2>工作包</h2>
                            <p>这里是工作包的内容。</p>
                        </div>
                        <div v-else-if="activeTab === 'weeklyReports'" class="tab-content">
                            <!-- 上传周报的表单 -->
                            <div class="upload-form">
                                <el-input v-model="reportTitle" placeholder="请输入周报标题" class="report-title-input"></el-input>
                                <el-input v-model="reportDescription" placeholder="请输入周报描述" class="report-description-input"></el-input>
                                <el-upload
                                        class="upload-demo"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :file-list="fileList"
                                        list-type="text"
                                >
                                    <el-button type="primary">上传文件</el-button>
                                </el-upload>
                            </div>
                            <!-- 周报列表 -->
                            <div class="report-list">
                                <label>历史上传</label>
                                <div class="report-card" v-for="(report, index) in reports" :key="index">
                                    <div class="report-content">
                                        <h3>{{ report.title }}</h3>
                                        <p class="description">{{ report.description }}</p>
                                        <span class="file-type">文件类型: {{ report.fileType }}</span>
                                    </div>
                                    <el-button @click="viewReport(report.id)" class="view-details-btn">查看</el-button>
                                </div>
                            </div>
                        </div>
                        <div v-else-if="activeTab === 'members'" class="tab-content">
                            <h2>成员管理</h2>
                            <!-- 添加成员按钮 -->
                            <el-button type="primary" @click="dialogVisible = true">+ 成员</el-button>
                            <!-- 添加成员弹窗 -->
                            <el-dialog title="添加成员" :visible.sync="dialogVisible" width="50%" :append-to-body="false">
                                <el-tabs v-model="activeMemberTab">
                                    <el-tab-pane label="添加现有用户或组" name="existingUser">
                                        <el-select v-model="selectedUser" placeholder="请选择用户或组">
                                            <el-option label="用户1" value="user1"></el-option>
                                            <el-option label="用户2" value="user2"></el-option>
                                            <el-option label="组1" value="group1"></el-option>
                                        </el-select>
                                        <el-select v-model="selectedRole" placeholder="请选择角色">
                                            <el-option label="管理员" value="admin"></el-option>
                                            <el-option label="开发者" value="developer"></el-option>
                                            <el-option label="观察者" value="observer"></el-option>
                                        </el-select>
                                        <el-button type="primary" @click="addMember">添加</el-button>
                                    </el-tab-pane>
                                    <el-tab-pane label="将角色分配给新成员" name="newUser">
                                        <el-input v-model="newMemberName" placeholder="请输入新成员名称"></el-input>
                                        <el-select v-model="selectedRole" placeholder="请选择角色">
                                            <el-option label="管理员" value="admin"></el-option>
                                            <el-option label="开发者" value="developer"></el-option>
                                            <el-option label="观察者" value="observer"></el-option>
                                        </el-select>
                                        <el-button type="primary" @click="addMember">添加</el-button>
                                    </el-tab-pane>
                                </el-tabs>
                                <el-table :data="members" style="width: 100%; margin-top: 20px;">
                                    <el-table-column prop="name" label="名称" width="180"></el-table-column>
                                    <el-table-column prop="role" label="角色" width="180"></el-table-column>
                                    <el-table-column prop="group" label="组" width="180"></el-table-column>
                                    <el-table-column prop="status" label="状态"></el-table-column>
                                </el-table>
                            </el-dialog>
                        </div>
                        <div v-else-if="activeTab === 'projectSettings'" class="tab-content">
                            <h2>项目设置</h2>
                            <p>这里是项目设置的内容。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <router-view />
</template>

<script>
export default {
    data() {
        return {
            selectedProject: 'project1', // 默认选择项目1
            activeTab: 'weeklyReports', // 默认显示周报内容
            reportTitle: '',
            reportDescription: '',
            fileList: [],
            reports: [
                { id: 1, title: '第一周周报', description: '这是第一周的实验报告', fileType: 'Word' },
                { id: 2, title: '第二周周报', description: '这是第二周的实验报告', fileType: 'PDF' },
                { id: 3, title: '第三周周报', description: '这是第三周的实验报告', fileType: 'PPT' },
            ],
            dialogVisible: false, // 控制弹窗显示
            activeMemberTab: 'existingUser', // 默认选择“添加现有用户或组”
            selectedUser: '', // 选中的用户或组
            newMemberName: '', // 新成员名称
            selectedRole: '', // 选中的角色
            members: [
                { name: '用户1', role: '管理员', group: '组1', status: '活跃' },
                { name: '用户2', role: '开发者', group: '组2', status: '活跃' },
            ],
        }
    },
    methods: {
        // 文件预览
        handlePreview(file) {
            console.log('预览文件:', file);
        },
        // 文件移除
        handleRemove(file, fileList) {
            console.log('移除文件:', file, fileList);
        },
        // 查看周报
        viewReport(reportId) {
            console.log(`查看周报: ${reportId}`);
        },
        // 添加成员
        addMember() {
            console.log('点击按钮');
            this.dialogVisible = true;
            console.log('dialogVisible:', this.dialogVisible); // 检查值是否为 true
            this.dialogVisible = true; // 确保点击按钮时，dialogVisible 被设置为 true
            if (this.activeMemberTab === 'existingUser') {
                // 添加现有用户或组
                this.members.push({
                    name: this.selectedUser,
                    role: this.selectedRole,
                    group: '组1',
                    status: '活跃',
                });
            } else if (this.activeMemberTab === 'newUser') {
                // 添加新成员
                this.members.push({
                    name: this.newMemberName,
                    role: this.selectedRole,
                    group: '组1',
                    status: '活跃',
                });
            }
            this.dialogVisible = false; // 关闭弹窗
        },
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
    height: 200px;
    border: 2px solid rgba(0, 0, 0,.1);
    background-color: white;
    justify-content: space-between;
    padding:   20px;
}
.project-select {
    width: 200px;
}
.title {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    flex: 1;
}
.box2 {
    flex: 1;
    margin-top: 20px;
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
.tab-content {
    padding: 20px;
}
.upload-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}
.report-title-input, .report-description-input {
    width: 50%;
}
.report-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.report-card {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.report-content {
    flex: 1;
}
.report-card h3 {
    margin: 0 0 10px;
    font-size: 24px;
}
.report-card p {
    margin: 0 0 10px;
    font-size: 16px;
}
.report-card .description {
    font-size: 16px;
    color: #555;
    margin-bottom: 10px;
}
.report-card .file-type {
    font-size: 14px;
    color: #888;
}
.view-details-btn {
    margin-left: 20px;
}
.el-dialog {
    z-index: 2000; /* 确保弹窗的 z-index 足够高 */
}
</style>