<template>
    <div>
    <navbar />
    <div style="padding-top:20px ;padding-bottom: 20px;">
      
  <el-card class="profile-card">
    <!-- 个人信息头部 -->
    <div class="profile-header">
      <el-avatar :size="100" class="avatar">
        <img src="../assets/user.webp" alt="" />
      </el-avatar>
      <div class="user-basic">
        <h2 class="username">{{ userInfo.name }}</h2>
        <el-button 
          type="primary" 
           @click="() => { 
            showEditDialog = true; 
            currentUser = { username: userInfo.name, password: '' }; 
          }"
          class="edit-btn"
        >
        修改密码
        </el-button>
        <el-button 
          type="danger"  
          @click="out()"
          class="edit-btn"
        >
        退出登录
        </el-button>
      </div>
    </div>

    <!-- 我的订单/房源标签页 -->
    <el-tabs v-model="activeTab" class="profile-tabs" style="margin-top: 20px;">
      <el-tab-pane 
        label="我的房源" 
        name="myHouses"
      >
    <el-table 
      :data="myHouses" 
      border 
      style="width: 100%; margin-top: 15px;"
      row-key="id"
    >
      <el-table-column prop="id" label="ID" width="50"/>
      <el-table-column prop="title" label="房源标题"/>
      <el-table-column prop="address" label="详细地址" />
      <el-table-column prop="area" label="建筑面积(㎡)"/>
      <el-table-column prop="floor" label="楼层"/>
      <el-table-column prop="orientation" label="朝向"/>
      <el-table-column prop="phone" label="电话"/>
      <el-table-column prop="rent" label="租金(元/月)">
        <template #default="scope">¥{{ scope.row.rent }}</template>
      </el-table-column>
      <el-table-column label="操作" width="240">
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
            @click="() => { showEditDialog2 = true; currentHouse = { ...scope.row }; }"
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
        <el-empty 
          v-if="myHouses.length === 0"
          description="暂无发布的房源"
          style="margin: 40px 0"
        />
      </el-tab-pane>
      <!-- 留言 -->
      <el-tab-pane label="我的留言" name="myContent">
        <el-table 
          :data="myContent" 
          border 
          style="width: 100%; margin-top: 15px;"
          row-key="id"
        >
        <el-table-column prop="id" label="ID"/>
        <el-table-column prop="content" label="留言"/>
        <el-table-column prop="time" label="时间"/>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>

  <!-- 编辑资料弹窗 -->
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
      <el-button type="primary" @click="handleEditUser(currentUser)">保存</el-button>
    </template>
  </el-dialog>

<!-- 编辑房源弹窗 -->
  <el-dialog 
  title="编辑房源信息" 
  v-model="showEditDialog2" 
  width="500px"
>
  <el-form :model="currentHouse" label-width="100px">
    <el-form-item label="id">
      {{ currentHouse.id }}
    </el-form-item>
    <el-form-item label="房东">
      {{ currentHouse.owner }}
    </el-form-item>
    <el-form-item label="房源标题">
      <el-input v-model="currentHouse.title" />
    </el-form-item>
    <el-form-item label="详细地址">
      <el-input v-model="currentHouse.address" />
    </el-form-item>
    <el-form-item label="建筑面积(㎡)">
      <el-input v-model.number="currentHouse.area" type="number" />
    </el-form-item>
    <el-form-item label="租金(元/月)">
      <el-input v-model.number="currentHouse.rent" type="number" />
    </el-form-item>
     <el-form-item label="楼层">
      <el-input v-model="currentHouse.floor" />
    </el-form-item>
    <el-form-item label="朝向">
      <el-input v-model="currentHouse.orientation" />
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="currentHouse.phone" />
    </el-form-item>

  </el-form>
  <template #footer>
    <el-button @click="showEditDialog = false">取消</el-button>
    <el-button type="primary" @click="handleEditHouse(currentHouse)">保存</el-button>
  </template>
</el-dialog>
  </div>
  </div>
</template>

<script setup>
import { ref, reactive, inject } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import navbar from '../components/navbar.vue';
import {useRouter} from 'vue-router';
import axios from 'axios'

const router = useRouter()
const updateLoginStatus = inject('updateLoginStatus')
const username = inject('userInfo')
const userInfo = reactive({
  name : username.value,
  password:''
});
const currentUser = ref({
  username: '',
  password: ''
});

const currentHouse = ref({});
console.log(username.value)

const showEditDialog = ref(false);
const showEditDialog2 = ref(false)
const activeTab = ref('myHouses');

// 我的房源数据（房东）
const myHouses = ref([]);
const myContent = ref([])

const out = () => {
  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    updateLoginStatus(false, null)
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isLogin');
    router.push({name:'Home'})
    ElMessage.success('已退出登录');
  });
};

const handleEditUser = (user)=>{
  axios.post('http://localhost:3000/editUser',{
    username:user.username,
    password:user.password
  }).then(res => {
    if (res.data.success) {
        ElMessage.success(res.data.message || '编辑成功');
        showEditDialog.value = false;
      } else {
        ElMessage.error(res.data.message || '编辑失败');
        showEditDialog.value = false;
      }
  }).catch(err => {
    showEditDialog.value = false
    console.error('请求失败:', err);
    ElMessage.error('网络错误，无法加载用户数据');
  });
}

const handleEditHouse = (house)=>{
  axios.post('http://localhost:3000/editHouse',{
    id:house.id,
    title:house.title,
    address:house.address,
    area:house.area,
    floor:house.floor,
    orientation:house.orientation,
    phone:house.phone,
    rent:house.rent
  }).then(res => {
    if (res.data.success) {
        ElMessage.success(res.data.message || '编辑成功');
        showEditDialog2.value = false;
        fetchHouse()
      } else {
        ElMessage.error(res.data.message || '编辑失败');
        showEditDialog2.value = false;
        fetchHouse()
      }
  }).catch(err => {
    showEditDialog2.value = false
    console.error('请求失败:', err);
    ElMessage.error('网络错误，无法加载用户数据');
  })
}

// 查看详情
const handleViewDetail = (house) => {
  ElMessageBox.alert(`
    <p>房源ID: ${house.id}</p>
    <p>房东: ${house.owner}</p>
    <p>房源信息: ${house.title}</p>
    <p>地址: ${house.address}</p>
    <p>面积: ${house.area}㎡</p>
    <p>楼层: ${house.floor}</p>
    <p>电话: ${house.phone}</p>
    <p>朝向: ${house.orientation}</p>
    <p>租金: ¥${house.rent}/月</p>
  `, '房源详情', {
    dangerouslyUseHTMLString: true
  });
};

const handleDelete = (house)=>{
  axios.post('http://localhost:3000/deleteHouse',{
    id:house.id
  }
  ).then(res => {
     if (res.data.success) {
        ElMessage.success(res.data.message || '删除成功');
        myHouses.value = myHouses.value.filter(u => u.id !== house.id);
        fetchHouse()
      } else {
        ElMessage.error(res.data.message || '删除失败');
        fetchHouse()
      }
  }).catch(err => {
    console.error('请求失败:', err);
    ElMessage.error('网络错误，无法加载用户数据');
    fetchHouse()
  });
}

const filterMyHouses = (houses) => {
  return houses.filter(house => house.owner === userInfo.name);
};

const filterMyContent = (contents) => {
  return contents.filter(content => content.nickname == userInfo.name)
}

const fetchMessage = () => {
  axios.get('http://localhost:3000/message')
  .then(res => {
    console.log('原始留言数据:', res.data.data); // 查看原始数据结构
    myContent.value = filterMyContent(res.data.data);
    console.log('过滤后的留言数据:', myContent.value); // 确认过滤结果
  }).catch(err => {
    console.log(err)
  })
}

const fetchHouse = ()=>{
  axios.get('http://localhost:3000/house')
  .then(res => {
    console.log(res.data)
    myHouses.value = filterMyHouses(res.data.data);
  }).catch(err => {
    console.log(err)
  })
}

fetchHouse()
fetchMessage()

</script>

<style scoped>
.profile-card {
  max-width: 1000px;
  margin: 0 auto;
  padding-top:20px;
  padding-bottom: 20px;
}

.profile-header {
  display: flex;
  align-items: center;
  padding: 30px 20px;
  border-bottom: 1px solid #eee;
}

.avatar {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.user-basic {
  margin-left: 30px;
}

.username {
  font-size: 30px;
  margin: 0 0 10px 0;
}

.user-role {
  color: #666;
  margin-bottom: 15px;
}

.info-card {
  margin-top: 20px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 10px 0;
}

.info-item {
  display: flex;
  padding: 5px 0;
}

.info-label {
  width: 100px;
  color: #666;
}

.info-value {
  flex: 1;
}

.profile-tabs {
  --el-tabs-bottom-bar-color: #5da5fa;
}

.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}

.avatar-uploader-icon {
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
}

.text-danger {
  color: #ff4d4f;
}
</style>