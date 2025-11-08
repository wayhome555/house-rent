<template>
  <el-card>
    <!-- 搜索框 -->
    <div class="search-bar">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索留言"
        style="width: 300px"
        clearable
      />
      <el-button 
        type="primary" 
        @click="handleSearch"
        style="margin-left: 10px"
      >
        搜索
      </el-button>
    </div>

    <!-- 留言表格 -->
    <el-table :data="filteredMessages" border style="width: 100%; margin-top: 15px;">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="nickname" label="用户名" />
      <el-table-column prop="content" label="留言内容" />
      <el-table-column prop="time" label="时间" />
      <el-table-column label="操作" width="250">
        <template #default="scope">
          <el-button 
            size="small" 
            @click="handleViewDetail(scope.row)"
          >
            详情
          </el-button>
          <el-button 
            type="danger" 
            size="small" 
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
          
        </template>
      </el-table-column>
    </el-table>

    <!-- 空状态 -->
    <el-empty 
      v-if="filteredMessages.length === 0"
      description="暂无留言数据"
      style="margin: 40px 0"
    />
  </el-card>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios'

// 留言数据
const messages = ref([]);

// 搜索条件
const searchKeyword = ref('');

const filteredMessages = computed(() => {
  return messages.value.filter(msg => 
    msg.content.includes(searchKeyword.value)
  );
});

// 搜索处理
const handleSearch = () => {};

// 删除留言
const handleDelete = (message) => {
  axios.post('http://localhost:3000/deleteMessage',{
    id:message.id
  }).then(res => {
    if (res.data.success) {
        ElMessage.success(res.data.message || '删除成功');
        messages.value = messages.value.filter(u => u.id !== message.id);
      } else {
        ElMessage.error(res.data.message || '删除失败');
      }
  }).catch(err => {
    console.log(err)
  })
};

const handleViewDetail = (user) => {
  ElMessageBox.alert(`
    <p>用户名: ${user.username}</p>
    <p>留言：${user.content}</p>
    <p>时间：${user.time}</p>
  `, '留言详情', {
    dangerouslyUseHTMLString: true
  });
};

const fetchMessage = () => {
  axios.get('http://localhost:3000/message')
  .then(res => {
    messages.value = res.data.data
    console.log(res.data)
  }).catch(err => {
    console.log(err)
  })
}

fetchMessage()
</script>

<style scoped>
.card-header {
  font-size: 16px;
  font-weight: bold;
}
.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
}
</style>