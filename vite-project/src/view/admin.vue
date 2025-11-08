<template>
  <el-container class="admin-container">
    <!-- 侧边栏 -->
    <el-aside width="220px" class="sidebar">
      <div class="sidebar-header">
        <h1>租赁管理</h1>
      </div>
      <el-menu
        default-active="dashboard"
        class="el-menu-vertical-demo"
        @select="handleMenuSelect"
        background-color="#2c3e50"
        text-color="#fff"
        active-text-color="#5da5fa"
        border-right="none"
      >
        <el-menu-item index="dashboard">
          <el-icon><PieChart /></el-icon>
          <span>数据概览</span>
        </el-menu-item>
        <el-menu-item index="users">
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="houses">
          <el-icon><Home /></el-icon>
          <span>房源管理</span>
        </el-menu-item>
        <el-menu-item index="messages">
          <el-icon><Chat /></el-icon>
          <span>留言管理</span>
        </el-menu-item>
        <!-- <el-menu-item index="orders">
          <el-icon><Document /></el-icon>
          <span>订单管理</span>
        </el-menu-item> -->
        <!-- <el-menu-item index="settings">
          <el-icon><Setting /></el-icon>
          <span>系统设置</span>
        </el-menu-item> -->
      </el-menu>
    </el-aside>

    <!-- 主内容区 -->
    <el-container>
      <!-- 顶部导航 -->
      <el-header class="header">
        <div class="header-title">{{ pageTitle }}</div>
        <div class="user-info">
          <span class="username">管理员</span>
          <el-button 
            type="danger"  
            @click="handleLogout"
            class="logout-btn"
          >
            退出登录
          </el-button>
        </div>
      </el-header>

      <!-- 页面内容 -->
      <el-main class="main-content">
        <dashboard-view v-if="currentPage === 'dashboard'" />
        <users-view v-if="currentPage === 'users'" />
        <houses-view v-if="currentPage === 'houses'" />
        <messages-view v-if="currentPage === 'messages'" />
        <orders-view v-if="currentPage === 'orders'" />
        <!-- <settings-view v-if="currentPage === 'settings'" /> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import DashboardView from '../components/DashboardView.vue';
import UsersView from '../components/UsersView.vue';
import HousesView from '../components/HousesView.vue';
import MessagesView from '../components/MessagesView.vue';
// import OrdersView from '../components/OrdersView.vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

// 当前页面状态
const currentPage = ref('dashboard');
const router = useRouter();
// 页面标题计算
const pageTitle = computed(() => {
  const titles = {
    dashboard: '数据概览',
    users: '用户管理',
    houses: '房源管理',
    messages: '留言管理',
  };
  return titles[currentPage.value];
});

// 菜单选择处理
const handleMenuSelect = (index) => {
  currentPage.value = index;
};

// 退出登录
const handleLogout = () => {
  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isLogin');
    router.push({name:'Home'})
    ElMessage.success('已退出登录');
  });
};
</script>

<style scoped>
.admin-container {
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  background-color: #2c3e50;
  color: #fff;
  overflow-y: auto;
}

.sidebar-header {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #34495e;
}

.sidebar-header h1 {
  font-size: 18px;
  margin: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 20px;
}

.header-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.username {
  color: #333;
}


.main-content {
  padding: 20px;
  background-color: #f5f7fa;
  overflow-y: auto;
  height: calc(100vh - 60px);
}
</style>