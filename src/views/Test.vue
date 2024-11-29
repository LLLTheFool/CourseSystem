<template>
    <el-button plain @click="dialogTableVisible = true">
      Open a Table nested Dialog
    </el-button>
  
    <el-dialog v-model="dialogTableVisible" title="第一组" width="540">
      <el-table :data="gridData">
        <el-table-column property="date" label="学号" width="300" />
        <el-table-column property="name" label="姓名" width="200" />
      </el-table>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="dialogTableVisible = false"> 关闭</el-button>
        </div>
      </template>
      
    </el-dialog>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const dialogTableVisible = ref(false)
  
  const gridData = [
    {
      date: '20241129',
      name: '张三',
    },
    {
      date: '20241130',
      name: '张三',
    },
    {
      date: '20241201',
      name: '张三',
    },
    {
      date: '20241202',
      name: '张三',
    },
  ]
  </script>
  