<template>
  <div>
  <el-card>
    <template #header>
      <div class="card-header">
        <el-button 
          type="primary" 
          size="larger" 
          @click="showAddUserDialog = true"
        >
          添加用户<el-icon><Plus /></el-icon> 
        </el-button>
      </div>
    </template>
    <div class="search-bar">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索用户名"
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
    
    <el-table :data="filteredUsers" border style="width: 100%; margin-top: 15px;">
      <el-table-column prop="username" label="用户名" />
      <el-table-column label="密码" >
        <template #default>***</template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template #default="scope">
          <el-button 
            size="small" 
            @click="handleViewDetail(scope.row)"
          >
            详情
          </el-button>
          <el-button 
            type="primary" 
            size="small" 
            @click="() => { showEditDialog = true; currentUser = { ...scope.row }; }"
          >
            编辑
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
  </el-card>

  <el-dialog 
    title="编辑个人资料" 
    v-model="showEditDialog" 
    width="500px"
  >
    <el-form :model="currentUser" label-width="100px">
      <el-form-item label="用户名" prop="username">
        {{ currentUser.username }}
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="currentUser.password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="showEditDialog = false">取消</el-button>
      <el-button type="primary" @click="handleEdit(currentUser)">保存</el-button>
    </template>
  </el-dialog>

  <!-- 添加用户弹窗 -->
<el-dialog 
  title="添加新用户" 
  v-model="showAddUserDialog" 
  width="500px"
>
  <el-form :model="newUser" label-width="100px" ref="addUserForm">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="newUser.username" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="newUser.password" placeholder="请输入密码" />
    </el-form-item>
  </el-form>
  <template #footer>
    <el-button @click="handleAddCancel()">取消</el-button>
    <el-button type="primary" @click="handleAddSubmit(newUser)">添加</el-button>
  </template>
</el-dialog>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import axios from 'axios';

const showAddUserDialog = ref(false)
const newUser = ref({
  username: '',
  password: ''
});
const users = ref([]);
const showEditDialog = ref(false);
// 搜索关键词
const searchKeyword = ref('');
const currentUser = ref({}); 

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    return String(user.username).includes(searchKeyword.value);
  });
});

const handleSearch = () => {
};

const handleViewDetail = (user) => {
  ElMessageBox.alert(`
    <p>用户名: ${user.username}</p>
    <p>密码：${user.password}</p>
  `, '用户详情', {
    dangerouslyUseHTMLString: true
  });
};

const handleEdit = (user)=>{
  
  axios.post('http://localhost:3000/editUser',{
    username:user.username,
    password:user.password
  }).then(res => {
    if (res.data.success) {
        ElMessage.success(res.data.message || '编辑成功');
        // users.value = users.value.filter(u => u.username !== user.username);
        showEditDialog.value = false;
        fetchUsers()
      } else {
        ElMessage.error(res.data.message || '编辑失败');
        showEditDialog.value = false;
        fetchUsers()
      }
  }).catch(err => {
    showEditDialog.value = false
    console.error('请求失败:', err);
    ElMessage.error('网络错误，无法加载用户数据');
  });
}

const handleDelete = (user)=>{
  axios.post('http://localhost:3000/deleteUser',{
    username:user.username
  }
  ).then(res => {
     if (res.data.success) {
        ElMessage.success(res.data.message || '删除成功');
        users.value = users.value.filter(u => u.username !== user.username);
      } else {
        ElMessage.error(res.data.message || '删除失败');
      }
  }).catch(err => {
    console.error('请求失败:', err);
    ElMessage.error('网络错误，无法加载用户数据');
  });
}

const addUserForm = ref(null);

// 取消添加（重置表单）
const handleAddCancel = () => {
  addUserForm.value.resetFields();
  showAddUserDialog.value = false;
};

const handleAddSubmit = (user) => {
  axios.post('http://localhost:3000/register',{
    username:user.username,
    password:user.password
  }).then(res => {
    if(res.data.success){
      ElMessage.success('添加成功');
      showAddUserDialog.value = false;
      handleAddCancel()
      fetchUsers()
    }else{
      ElMessage.error('添加失败')
      fetchUsers()
    }
  }).catch(err => {
    console.log(err)
  })
}

const fetchUsers = () => {
  axios.get('http://localhost:3000/info')
    .then(res => {
      console.log('接口返回:', res.data);
      if (res.data.success) {
        users.value = res.data.data; 
      } else {
        ElMessage.warning(res.data.message || '获取数据失败');
      }
    })
    .catch(err => {
      console.error('请求失败:', err);
      ElMessage.error('网络错误，无法加载用户数据');
    });
};

fetchUsers()
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
}
</style>