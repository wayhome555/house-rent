<template>
    <div>
  <el-card>
    <template #header>
      <div class="card-header">
        <el-button 
          type="primary" 
          size="larger" 
          @click="showAddHouseDialog = true"
        >
          添加房源<el-icon><Plus /></el-icon> 
        </el-button>
      </div>
    </template>

    <!-- 搜索和筛选 -->
    <div class="search-bar">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索标题/地址/联系人"
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

    <!-- 房源表格 -->
    <el-table 
      :data="filteredHouses" 
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
      <el-table-column prop="owner" label="房东"/>
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
            @click="() => { showEditDialog = true; currentHouse = { ...scope.row }; }"
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
  title="编辑房源信息" 
  v-model="showEditDialog" 
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
    <el-button type="primary" @click="handleEdit(currentHouse)">保存</el-button>
  </template>
</el-dialog>

<!-- 添加房源弹窗 -->
<el-dialog 
  title="添加新房源" 
  v-model="showAddHouseDialog" 
  width="500px"
>
  <el-form 
    :model="newHouse" 
    label-width="100px" 
    ref="addHouseFormRef"
  >
    <el-form-item label="房源图片" prop="imgUrl">
        <el-upload
          class="upload-demo"
          drag
          action="http://localhost:3000/api/upload"  
          name="file"  
          :multiple="false"  
          :limit="1"         
          :on-success="handleUploadSuccess"
          :on-remove="handleRemove"
          :file-list="fileList"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            拖拽图片到此或<em>点我上传图片(最多一张)</em>
          </div>
          
        </el-upload>
      </el-form-item>
    <el-form-item label="房东" prop="owner">
      <el-input v-model="newHouse.owner" placeholder="请输入房东姓名" />
    </el-form-item>
    <el-form-item label="房源标题" prop="title">
      <el-input v-model="newHouse.title" placeholder="请输入房源标题（如：两室一厅朝南采光好）" />
    </el-form-item>
    <el-form-item label="详细地址" prop="address">
      <el-input v-model="newHouse.address" placeholder="请输入详细地址（如：XX市XX区XX小区）" />
    </el-form-item>
    <el-form-item label="建筑面积(㎡)" prop="area">
      <el-input v-model.number="newHouse.area" type="number" placeholder="请输入数字" min="1" />
    </el-form-item>
    <el-form-item label="租金(元/月)" prop="rent">
      <el-input v-model.number="newHouse.rent" type="number" placeholder="请输入数字" min="100" />
    </el-form-item>
    <el-form-item label="楼层" prop="floor">
      <el-input v-model="newHouse.floor" placeholder="如：10/30层" />
    </el-form-item>
    <el-form-item label="朝向" prop="orientation">
      <el-input v-model="newHouse.orientation" placeholder="如：朝南、南北通透" />
    </el-form-item>
    <el-form-item label="电话" prop="phone">
      <el-input v-model="newHouse.phone" placeholder="请输入联系电话" />
    </el-form-item>
  </el-form>
  <template #footer>
    <el-button @click="handleAddCancel()">取消</el-button>
    <el-button type="primary" @click="handleAddSubmit(newHouse)">添加</el-button>
  </template>
</el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Plus,UploadFilled } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios'
// 房源数据
const houses = ref([]);

const showEditDialog = ref(false)
const newHouse = ref({
  imgUrl:'',
  owner: '',       // 房东
  title: '',       // 房源标题
  address: '',     // 详细地址
  area: '',        // 建筑面积
  rent: '',        // 租金
  floor: '',       // 楼层
  orientation: '', // 朝向
  phone: ''        // 联系电话
});
// 搜索和筛选条件
const searchKeyword = ref('');
const statusFilter = ref('');
const showAddHouseDialog = ref(false);

const currentHouse = ref({});

const filteredHouses = computed(() => {
  if (!Array.isArray(houses.value)) return [];
  
  const keyword = (searchKeyword.value || '').toLowerCase();
  
  return houses.value.filter(house => {
    const addressMatch = house.address 
      ? house.address.toLowerCase().includes(keyword) 
      : false;
    
    const contactMatch = house.contact 
      ? house.contact.toLowerCase().includes(keyword) 
      : false;
    
    const titleMatch = house.title 
      ? house.title.toLowerCase().includes(keyword) 
      : false;
    
    const matchesStatus = !statusFilter.value || house.status === statusFilter.value;
    
    return (addressMatch || contactMatch || titleMatch) && matchesStatus;
  });
});

const handleUploadSuccess = (response) => {
  console.log(response.imgUrl)
  // 根据实际接口返回格式调整，这里假设返回图片URL
  newHouse.value.imgUrl = response.imgUrl;
  ElMessage.success('图片上传成功');
};

// 移除图片回调
const handleRemove = () => {
  newHouse.value.imgUrl = '';  // 清空图片地址
};
const fileList = ref([]);
const addHouseFormRef = ref(null);

const handleAddCancel = () => {
  addHouseFormRef.value?.resetFields(); // 重置表单字段
  newHouse.value = {}; // 清空数据
  showAddHouseDialog.value = false; // 关闭弹窗
};

const handleAddSubmit = (house) => {
  axios.post('http://localhost:3000/add',{
    "image": house.imgUrl,
    "title": house.title,
    "address": house.address,
    "area": house.area,
    "floor": house.floor,
    "orientation": house.orientation,
    "phone": house.phone,
    "rent": house.rent,
    "owner":house.owner
  }).then(res => {
    if(res.data.success){
      ElMessage.success('注册成功');
      handleAddCancel()
      fileList.value = [];
      fetchHouse()
    }

  }).catch(err => {
    console.log(err)
  })
};

// 搜索处理
const handleSearch = () => {  };

const handleDelete = (house)=>{
  axios.post('http://localhost:3000/deleteHouse',{
    id:house.id
  }
  ).then(res => {
     if (res.data.success) {
        ElMessage.success(res.data.message || '删除成功');
        houses.value = houses.value.filter(u => u.id !== house.id);
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

const handleEdit = (house) => {
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
        showEditDialog.value = false;
        fetchHouse()
      } else {
        ElMessage.error(res.data.message || '编辑失败');
        showEditDialog.value = false;
        fetchHouse()
      }
  }).catch(err => {
    showEditDialog.value = false
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

const fetchHouse = ()=>{
  axios.get('http://localhost:3000/house')
  .then(res => {
    console.log(res.data)
    houses.value = res.data.data;
  }).catch(err => {
    console.log(err)
  })
}

fetchHouse()
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
</style>