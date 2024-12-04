<template>
  <div class="box2">
    <div class="left">
      <RouterLink to="/" class="square">首页</RouterLink>
      <RouterLink to="/stumanagement" class="square">学生管理</RouterLink>
      <RouterLink to="/publishResources" class="square">资源发布</RouterLink>
      <RouterLink to="/groupInfo" class="square">学生分组情况</RouterLink>
      <RouterLink to="/studentReport" class="square">学生汇报时间</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.box2 {
  width: 15%;
  height: 80vh;
  flex: 1;
  margin-top:0px;
  display: flex;
  justify-content: flex-start;  /* 水平排列 */
}

.left {
  background-color: white;
  border: 2px solid rgba(0, 0, 0, .1);
  margin-right: 20px;
  width: 200px;
  display: flex;
  flex-direction: column;  /* 垂直排列 */
  gap: 10px;  /* 按钮之间的间距 */
  padding: 20px;  /* 内边距 */
  align-items: stretch;  /* 按钮宽度拉伸 */
}

.square {
  display: inline-block;
  width: 80%;
  padding: 12px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;  /* 文字居中 */
  border-radius: 12px; /* 圆角效果 */
  color: #333;
  background-color: #f0f0f0; /* 按钮背景 */
  transition: background-color 0.3s ease, color 0.3s ease;
  text-decoration: none;  /* 去掉链接的下划线 */
}

.square:hover {
  background-color: #409eff; /* 悬停时的背景色 */
  color: white; /* 悬停时的文字颜色 */
}
</style>
