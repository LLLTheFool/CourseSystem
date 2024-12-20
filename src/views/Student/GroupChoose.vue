<template>
    <top/>
    <div class="container0">
        <SidebarForStu/>
        <div class="container1">
            <div class="right">
          <!-- 加号按钮 -->
          <el-button class="add-button" @click="addGroup">+</el-button>
  
          <!-- 组列表 -->
          <div class="group-list">
            <!-- 已有的组（左侧） -->
            <div class="existing-groups">
              <div v-for="group in groups" 
                   :key="group.number" 
                   class="group-container"
                   :class="{ created: group.isCreated }">
                <div class="group-info">
                  <div class="row">
                    <label>组名:</label>
                    <span>{{ group.name }}</span>
                  </div>
                  <div class="row">
                    <label>组号:</label>
                    <span>{{ group.number }}</span>
                  </div>
                  <div class="row">
                    <label>人数:</label>
                    <span>{{ group.currentCount }}/{{ group.maxCount }}</span>
                  </div>
                  <button
                    class="join-button"
                    :disabled="group.isJoined || group.currentCount >= group.maxCount"
                    @click="joinGroup(group)"
                  >
                    {{ group.isJoined ? '已加入' : 
                       group.currentCount >= group.maxCount ? '已满' : '加入' }}
                  </button>
                </div>
              </div>
            </div>
  
            <!-- 新创建的组（右侧） -->
            <div v-if="newGroup" class="group-container new-group">
              <div class="group-info">
                <div class="row">
                  <label>组名:</label>
                  <input v-model="newGroup.name" placeholder="请输入组名"/>
                </div>
                <div class="row">
                  <label>组号:</label>
                  <span>{{ newGroup.number }}</span>
                </div>
                <div class="row">
                  <label>最大人数:</label>
                  <span>10</span>
                </div>
                <button
                  class="join-button"
                  @click="createGroup(newGroup)"
                  :disabled="!newGroup.name"
                >
                  创建
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import top from "../../components/topofstudent.vue"
import SidebarForStu from "../../components/SidebarForStu.vue";

const groups = ref([]);
const newGroup = ref(null);  // 新创建的组
const studentId = ref('123'); // 这里应该从登录信息或其他地方获取实际的学生ID

// 获取所有组信息
const fetchGroupInfo = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:4523/m2/5394050-5067403-default/246845626');
    console.log("获取到的组信息:", response.data);
    
    // 处理单个组对象的情况
    if (!Array.isArray(response.data)) {
      const group = response.data;
      groups.value = [{
        name: group.GroupName,
        number: group.GroupID,
        currentCount: 1,
        maxCount: group.GroupMemberNumber || 10,
        isJoined: false,
        isCreated: true
      }];
    } else {
      // 处理数组情况
      groups.value = response.data
        .map(group => ({
          name: group.GroupName,
          number: group.GroupID,
          currentCount: 1,
          maxCount: group.GroupMemberNumber || 10,
          isJoined: false,
          isCreated: true
        }))
        .sort((a, b) => a.number - b.number);
    }
  } catch (error) {
    console.error("获取组信息失败:", error);
  }
};

// 添加新组
const addGroup = () => {
  const maxGroupNumber = groups.value.length > 0 
    ? Math.max(...groups.value.map(g => Number(g.number))) 
    : 0;
    
  newGroup.value = {
    name: '',
    number: maxGroupNumber + 1,
    currentCount: 1,
    maxCount: 10,
    isJoined: false,
    isCreated: false
  };
};

// 创建组
const createGroup = async (group) => {
  try {
    if (!group.name) {
      console.error("请输入组名");
      return;
    }

    const response = await axios.post('http://127.0.0.1:4523/m1/5394050-5067403-default/group/add_group', {
      GroupName: group.name,
      GroupMaxMember: 10
    });
    
    if (response.data && response.data.message === "Creat Group successful!") {
      const createdGroup = {
        name: group.name,
        number: response.data.GroupID,
        currentCount: 1,
        maxCount: 10,
        isJoined: true,
        isCreated: true
      };
      
      groups.value.push(createdGroup);
      groups.value.sort((a, b) => a.number - b.number);
      
      newGroup.value = null;
      console.log("创建组成功:", response.data);
      
      await fetchGroupInfo();
    }
  } catch (error) {
    console.error("创建组失败:", error);
  }
};

// 加入组
const joinGroup = async (group) => {
  if (group.currentCount >= group.maxCount) {
    console.error("该组已满");
    return;
  }

  try {
    const response = await axios.post('http://127.0.0.1:4523/m1/5394050-5067403-default/group/join_group', {
      GroupID: group.number,    // 使用组号作为 GroupID
      StudentID: studentId.value // 传递学生ID
    });
    
    if (response.data && response.data.message === "Join Group successful!") {
      group.isJoined = true;
      group.currentCount++;
      console.log("加入组成功:", {
        groupId: group.number,
        studentId: studentId.value
      });
    }
  } catch (error) {
    console.error("加入组失败:", error);
  }
};

onMounted(() => {
  fetchGroupInfo();
});
</script>

<style scoped>
    .container0{
        width: 100%;
        display: flex;
    }
    .container1 {
  width: 1800px;
  border: 1px solid #999;
  padding: 5px;
}
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
    margin: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    width: 180px;
    box-sizing: border-box;
    transition: all 0.3s ease;  /* 添加过渡效果 */
  }
  
  /* 新创建的组容器样式 */
  .group-container.new-group {
    position: absolute;
    right: 50px;
    top: 100px;
  }
  
  /* 已创建的组容器样式 */
  .group-container.created {
    position: relative;
    background-color: #f0f8ff;
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
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 8px;
  }
  
  input:disabled {
    background-color: #f5f5f5;
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
  
  .group-list {
    display: flex;
    width: 100%;
    position: relative;
    padding-top: 60px;
  }
  
  .existing-groups {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding-left: 20px;
    flex: 1;
  }
  
  /* 修改输入框样式 */
  .row input {
    max-width: 100px;
    width: 100%;
    height: 25px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 8px;
    background-color: white;
  }
  
  .row input:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
  
  /* 添加只读文本样式 */
  .row span {
    padding: 4px 8px;
    background-color: #f5f5f5;
    border-radius: 4px;
    min-width: 60px;
    display: inline-block;
  }
  
  /* 确保右侧有足够空间放置新组 */
  .right {
    padding-right: 250px;  /* 为右侧新组预留空间 */
  }
  </style>
