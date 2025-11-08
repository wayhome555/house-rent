<template>
    <div class="container">
    <navbar />
  <el-form
    ref="houseFormRef"
    :model="houseForm"
    label-width="120px"
    class="house-form"
    :rules="formRules"
  >

      
    <!-- 房东 -->
    <el-form-item label="房东" prop="title">
      {{ houseForm.owner  }}
    </el-form-item>

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

    <!-- 房源标题 -->
    <el-form-item label="房源标题" prop="title">
      <el-input v-model="houseForm.title" placeholder="例如：阳光花园 三室两厅" />
    </el-form-item>

    <!-- 详细地址 -->
    <el-form-item label="详细地址" prop="address">
      <el-input v-model="houseForm.address" placeholder="例如：XX区XX路123号" />
    </el-form-item>

    <!-- 建筑面积 -->
    <el-form-item label="建筑面积(㎡)" prop="area">
      <el-input-number v-model="houseForm.area" :min="1" />
    </el-form-item>

    <!-- 楼层 -->
    <el-form-item label="楼层" prop="floor">
      <el-input v-model="houseForm.floor" placeholder="例如：10/20" />
    </el-form-item>

    <!-- 朝向 -->
    <el-form-item label="朝向" prop="direction">
      <el-select v-model="houseForm.direction" placeholder="选择朝向">
        <el-option label="南" value="南"></el-option>
        <el-option label="北" value="北"></el-option>
        <el-option label="东" value="东"></el-option>
        <el-option label="西" value="西"></el-option>
      </el-select>
    </el-form-item>

    <!-- 电话 -->
    <el-form-item label="电话" prop="phone">
      <el-input v-model="houseForm.phone" placeholder="例如：15000000000" />
    </el-form-item>

    <!-- 租金 -->
    <el-form-item label="租金(元/月)" prop="price">
      <el-input-number v-model="houseForm.price" :min="100" />
    </el-form-item>

    <!-- 提交按钮 -->
    <el-form-item>
      <el-button type="primary" size='larger' @click="submitForm()">提交房源</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script setup>
import { ref, reactive,inject } from 'vue';
import { ElMessage } from 'element-plus';
import navbar from '../components/navbar.vue';
import { UploadFilled } from '@element-plus/icons-vue'

const username = inject('userInfo')
console.log(username.value)
// 表单数据
const houseForm = reactive({
  imgUrl: '',  // 单张图片地址
  title: '',
  address: '',
  area: 0,
  floor: '',
  direction: '',
  price: 0,
  phone:'',
  owner:username.value
});

// 文件列表（用于显示已上传图片）
const fileList = ref([]);
// 表单引用
const houseFormRef = ref(null);
import axios from 'axios'

// 表单校验规则（保持不变）
const formRules = reactive({
  imgUrl: [{ required: true, message: '请上传房源图片', trigger: 'change' }],
  title: [{ required: true, message: '请输入房源标题', trigger: 'blur' }],
  address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
  area: [{ required: true, type: 'number', message: '请输入建筑面积', trigger: 'blur' }],
  floor: [{ required: true, message: '请输入楼层', trigger: 'blur' }],
  direction: [{ required: true, message: '请选择朝向', trigger: 'change' }],
  price: [{ required: true, type: 'number', message: '请输入租金', trigger: 'blur' }]
});

// 上传成功回调
const handleUploadSuccess = (response) => {
  console.log(response.imgUrl)
  // 根据实际接口返回格式调整，这里假设返回图片URL
  houseForm.imgUrl = response.imgUrl;
  ElMessage.success('图片上传成功');
};

// 移除图片回调
const handleRemove = () => {
  houseForm.imgUrl = '';  // 清空图片地址
};

const submitForm = ()=>{
  axios.post('http://localhost:3000/add',{
    "image": houseForm.imgUrl,
    "title": houseForm.title,
    "address": houseForm.address,
    "area": houseForm.area,
    "floor": houseForm.floor,
    "orientation": houseForm.direction,
    "phone": houseForm.phone,
    "rent": houseForm.price,
    "owner":houseForm.owner
  }).then(res => {
    if(res.data.success){
      ElMessage.success('注册成功');
      houseFormRef.value.resetFields();
      fileList.value = [];
    }

  }).catch(err => {
    console.log(err)
  })
}
</script>

<style scoped>
.house-form {
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  width:1000px;
  margin-top:30px;
  margin-bottom: 30px;
}
</style>