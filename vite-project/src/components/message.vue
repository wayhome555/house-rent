<template>
<section id="message">
  <div class="message-board">
    <h2 class="section-title">留言板</h2>
    <div class="container">
      <div class="post-area">
        <el-form ref="formRef" :model="form" label-width="80px">
          <el-form-item label="留言内容">
            <el-input
              v-model="form.content"
              maxlength="100"
              style="width: 700px ; padding-right: 30px;"
              placeholder="请在此输入留言"
              show-word-limit
              type="textarea"
            />
            <el-button type="primary" @click="submitMessage(form)" size="larger">发布留言</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 留言列表区域 -->
      <div class="message-list">
        <div v-if="messages.length === 0" class="empty-tip">暂无留言，快来发布第一条吧～</div>
        <div 
          v-else 
          class="message-item" 
          v-for="(msg,index) in messages" 
          :key="index"
        >
          <div class="message-header">
            <span class="nickname">{{ msg.nickname }}</span>
            <div class="header-right">
              <span class="time">{{ formatISOTime(msg.time) }}</span>
            </div>
          </div>
          <div class="message-content">
          <span class="content-text">{{ msg.content }}</span>
          <div class="like-container">
          </div>  
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
import { ref, reactive , inject,computed } from 'vue';
import { ElMessage } from 'element-plus';
import like from '../components/like.vue'
import axios from 'axios'

const userInfo = inject('userInfo')
const form = reactive({
  nickname: userInfo.value || "游客",
  content: '',
});

const messages = ref([]);

function formatISOTime(isoString, locale = 'zh-CN', options = {}) {
  const date = new Date(isoString);
  const defaultOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC' // 如果你想显示原始 UTC 时间；若要本地时间，可设为 undefined 或删除
  };

  // 合并用户传入的选项
  const finalOptions = { ...defaultOptions, ...options };

  return new Intl.DateTimeFormat(locale, finalOptions).format(date);
}
// console.log(typeof(formatTime(new Date())))

const submitMessage = (form)=>{
  if (!form.content) {
    ElMessage.warning('请填写昵称和留言内容');
    return;
  }
  axios.post('http://localhost:3000/addMessage',{
    nickname:form.nickname,
    content:form.content
  }).then(res => {
    if(res.data.success){
      ElMessage.success('留言成功');
      form.content = ''; // 清空输入框
      fetchMessage()
    }else{
      ElMessage.error('留言失败')
      fetchMessage()
    }
  }).catch(err => {
    console.log(err)
  })
}

const fetchMessage = () => {
  axios.get('http://localhost:3000/message')
  .then(res => {
    console.log(res.data)
    messages.value = res.data.data
  }).catch(err => {
    console.log(err)
  })
};

fetchMessage()
</script>

<style scoped>
.message-board {
  background-color: #f1f5f9;
  padding: 60px 20px; 

}

.container {
  max-width: 1000px; 
  width: 100%;
  margin: 0 auto; 
}


.section-title {
  font-size: 2rem; 
  margin-bottom: 30px; 
  text-align: center;
  color: #5da5fa;
  position: relative;
  font-weight: 600;
}

.section-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background-color: #5da5fa;
  margin: 12px auto; 
  border-radius: 2px;
}

.post-area {
  margin-bottom: 30px;
  background: #fff; 
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.message-list {
  margin-bottom: 60px;
  height: 500px; 
  overflow-y: auto;
  border: 1px solid #eee;
  padding: 10px;
}

.list-title {
  font-size: 1.5rem;
  margin-bottom: 25px;
  color: #5da5fa;
  border-bottom: 2px solid #5da5fa;
  padding-bottom: 10px;
  font-weight: 500;
  text-align: center;
}

.message-item {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 25px; 
  margin-bottom: 20px;
  background: #fff; 
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03); 
  transition: box-shadow 0.3s ease; 
}

.message-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); 
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px; 
}

.nickname {
  font-weight: 600;
  color: #409EFF;
  font-size: 1.05rem;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 15px; 
}

.time {
  color: #999;
  font-size: 0.9rem;
}

.delete-btn {
  color: #F56C6C;
}

.message-content {
  line-height: 1.8; 
  margin-bottom: 15px;
  color: #444; 
  font-size: 1rem;
  display: flex; /* 启用flex布局 */
  justify-content: space-between; /* 两端对齐 */
  align-items: center; /* 垂直居中对齐 */
}

.content-text {
  flex: 1; /* 让内容区域占满剩余空间 */
  margin-right: 15px; /* 与点赞组件保持距离 */
}

.like-container {
  /* 可根据需要调整点赞组件的位置 */
  white-space: nowrap; /* 防止点赞组件换行 */
}

.empty-tip {
  text-align: center;
  color: #999;
  padding: 40px 0; 
  background: #fff;
  border-radius: 8px;
  border: 1px dashed #eee;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .message-board {
    padding: 20px 15px; 
  }

  .post-area {
    padding: 20px 15px; 
  }

  .message-item {
    padding: 20px 15px; 
  }

  .section-title {
    font-size: 1.8rem; 
  }

  .list-title {
    font-size: 1.3rem; 
  }

  .message-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .header-right {
    width: 100%;
    justify-content: space-between;
  }
}

.like-container {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  user-select: none;
  /* padding: 4px 6px; */
  border-radius: 4px;
}

.heart {
  font-size: 18px;
  color: #999;
  transition: color 0.2s ease;
}

.heart.liked {
  color: #e91e63; /* Material Design 的 pink-500 */
}

.count {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}
</style>