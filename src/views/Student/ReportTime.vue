<template>
    <top />
    <div class="container0">
        <SidebarForStu />
        <div class="container1">
            <div class="right">
            <!-- 左侧按钮列 -->
            <div class="left-button">
              <button
                v-for="index in 14"
                :key="index"
                :class="{ active: activeButtonIndex === index - 1 }"
                @click="changeGroup(index)"
              >
                第{{ index }}周分享
              </button>
            </div>
  
            <!-- 右侧的大按钮容器 -->
            <div class="right-buttons-container">
              <div class="right-buttons-back" v-for="(button, index) in currentGroupButtons" :key="index">
                <div class="week-label">第{{ groupNumber }}周</div>
                <div class="order-label">顺序{{ index + 1 }}</div>
                <div class="choose-label">{{ button.selected ? button.username : '未选择' }}</div>
                <button
                  :class="{ 'right-buttons': true, selected: button.selected }"
                  :disabled="isAnyButtonSelected && !button.selected"
                  @click="toggleButtonSelection(index)"
                >
                  {{ button.selected ? '撤销' : '选择' }}
                </button>
              </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import top from "../../components/topofstudent.vue"
import SidebarForStu from "../../components/SidebarForStu.vue";
export default {
    components: {
        top,
        SidebarForStu
    }
}
import { ref, computed } from 'vue';
  
  const activeButtonIndex = ref(0); // 当前活跃的按钮索引
  const groupNumber = ref(1); // 当前组的周数
  const username = ref(''); // 用户名
  const stuid = ref(''); // 学号
  
  // 定义14组，每组5个按钮的状态
  const buttons = ref(
    Array.from({ length: 14 }, () =>
      Array.from({ length: 5 }, () => ({ selected: false, username: '' }))
    )
  );
  
  // 获取当前组的按钮
  const currentGroupButtons = computed(() => buttons.value[activeButtonIndex.value]);
  
  // 计算是否有按钮被选择
  const isAnyButtonSelected = computed(() => {
    return buttons.value.flat().some(button => button.selected);
  });
  
  // 切换组的函数
  function changeGroup(number) {
    activeButtonIndex.value = number - 1; // 更新当前按钮索引
    groupNumber.value = number; // 更新组的周数
  }
  
  // 切换按钮选择状态的函数
  function toggleButtonSelection(index) {
    const button = currentGroupButtons.value[index]; // 获取当前按钮
    if (button.selected) {
      // 如果按钮已被选择，取消选择
      button.selected = false;
      button.username = ''; // 清空用户名
    } else {
      // 如果按钮未被选择，检查是否已有选择
      if (!isAnyButtonSelected.value) {
        // 选择当前按钮
        button.selected = true;
        button.username = username.value; // 使用传入的用户名
      }
    }}

</script>

<style scoped>
 .container0{
        width: 100%;
        display: flex;
    }
.container1{
    width: 70%;
    border: 1px solid #999;
}
.right {
   
    display: flex;
    flex-direction: row; 
    padding: 20px;
    background-color: white;
    border: 2px solid rgba(0, 0, 0, .1);
    overflow-y: auto;
  }
  
   /* 左侧按钮样式 */
   .left-button button {
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 5px;
      margin-bottom: 10px;
      cursor: pointer;
      background-color: #f0f0f0;
      color: black;
      border: 1px solid #e0e0e0;
      transition: background-color 0.3s;
      min-width: 150px;
    }
    
    .left-button button:hover {
      background-color: #e0e0e0;
    }
    
    .left-button button.active {
      background-color: rgb(136, 183, 244);
      color: rgba(0, 0, 255, 0.906);
    }
    
  
    
    /* 左侧按钮列样式 */
    .left-button {
      display: flex;
      flex-direction: column;
      margin-right: 20px;
    }
    
    /* 右侧大按钮容器样式 */
    .right-buttons-container {
      display: flex;
      flex-wrap: nowrap;
      gap: 20px;
      overflow-x: auto;
    }
    
    /* 单个按钮方块样式 */
    .right-buttons-back {
      background-color: #f0f0f0;
      padding: 15px;
      border-radius: 10px;
      width: 220px;
      height: 300px;
      text-align: center;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;
    }
    
    .right-buttons-back:hover {
      transform: translateY(-5px);
    }
    
    /* 标签样式 */
    .week-label {
      font-size: 26px;
      font-weight: bold;
      margin-bottom: 15px;
      color: #333;
    }
    
    .order-label, .choose-label {
      font-size: 18px;
      margin-bottom: 15px;
      color: #555;
    }
    
    .choose-label {
      font-size: 20px;
      margin-bottom: 25px;
    }
    
    /* 大按钮样式 */
    .right-buttons {
      padding: 15px 20px;
      font-size: 16px;
      cursor: pointer;
      background-color: rgb(136, 183, 244);
      color: white;
      border: none;
      border-radius: 5px;
      transition: background-color 0.3s, transform 0.2s;
      width: 100%;
    }
    
    .right-buttons.selected {
      background-color: #dc3545;
      color: blue;
    }
    
    .right-buttons:not(.selected):hover {
      background-color: #648fbc;
    }
  </style>