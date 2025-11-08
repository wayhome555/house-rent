<template>
    <div>
   <Navbar />
    <div class="container">
        <h2 class="section-title">搜索房源</h2>
        <div class="carousel-content">
          <div class="search-box">
            <el-input v-model="input1" placeholder="请输入关键词如'两室'" size="large"/>
            <el-select v-model="value" placeholder="区域" size="large">
              <el-option 
                v-for="option in areaOptions" 
                :key="option.value" 
                :label="option.label" 
                :value="option.value" 
              />
            </el-select>
            <el-input v-model="input2" placeholder="最低价" size="large"/>
            -<el-input v-model="input3" placeholder="最高价" size="large"/>
            <el-button type="primary" size="large" @click="search()">搜索</el-button>
            <el-button type="primary" size="large" @click="reset()">重置</el-button>
          </div>
        </div>
      <div class="card-container">
        <div 
          v-for="(house, index) in houses" 
          :key="index" 
          class="card"
        >
          <div 
            class="card-img" 
            :style="{ backgroundImage: `url(${house.image})` }"
          ></div>
          <div class="card-info">
            <h3>{{ house.title }}</h3>
            <p>地址：{{ house.address }}</p>
            <p>面积：{{ house.area }}㎡ | 楼层：{{ house.floor }} | 朝向：{{ house.orientation }}</p>
            <p>电话：{{ house.phone }}</p>
            <p class="price">¥{{ house.rent }}/月</p>
            <el-button type="primary" @click="open(house)">查看详情</el-button>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script setup>
import Navbar from '../components/navbar.vue';
import {ref,inject} from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';

const router = useRouter()
const isLogin = inject('isLogin')
const houses = ref([])
const value = ref('')
const areaOptions = ref([
  { label: '北京', value: '北京' },
  { label: '上海', value: '上海' },
  { label: '广州', value: '广州' },
  { label: '深圳', value: '深圳' },
]);
const input1 = ref('')
const input2 = ref()
const input3 = ref()

const open = (house) => {
  ElMessageBox.alert(`
    <p>基本情况: ${ house.title }</p>
    <p>房源地址: ${ house.address }</p>
    <p>房源面积: ${ house.area }</p>
    <p>房源楼层: ${ house.floor }</p>
    <p>房源朝向: ${ house.orientation }</p>
    <p>电话:${ house.phone } </p>
    <p>租金:${ house.rent } ¥/月</p>
  `, '详情', {
    dangerouslyUseHTMLString: true
  });
}

const search = () => {
  if(!isLogin.value){
    router.push({name:'Login'})
  }
  const originHouses = [...houses.value];
  let filtered = originHouses;

  if (input1.value) {
    const keyword = input1.value.toLowerCase();
    filtered = filtered.filter(house => 
      house.title?.toLowerCase().includes(keyword)
    );
  }

  if (value.value) {
    const selectedArea = areaOptions.value.find(option => option.value === value.value)?.label;
    if (selectedArea) {
      filtered = filtered.filter(house => 
        house.address?.includes(selectedArea)
      );
    }
  }

  const minPrice = Number(input2.value) || 0; 
  const maxPrice = Number(input3.value) || Infinity; 
  filtered = filtered.filter(house => {
    const rent = Number(house.rent);
    return rent >= minPrice && rent <= maxPrice;
  });

  houses.value = filtered;
};

const reset = () => {
  value.value = '';
  input1.value = '';
  input2.value = '';
  input3.value = '';
  fetchHouse()
}

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

.container {
  width: 100vw;
  max-width: 1200px;
  height:100vh; 
  margin: 0 auto; 
  padding-top:20px;
}

.section-title {
  font-size: 2.2rem;
  margin-bottom: 40px;
  text-align: center;
  color: #5da5fa;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background-color: #5da5fa;
  margin: 15px auto;
  border-radius: 2px;
}

.card-container {
  display: flex; 
  gap: 20px; 
  flex-wrap: wrap; 
  margin-bottom: 30px;
}

.card {
  flex: 1; 
  min-width: 300px; 
  max-width: 380px; 
  border: 1px solid #eee; 
  border-radius: 8px; 
  overflow: hidden; 
  box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
  transition: transform 0.3s; 
}

.card:hover {
  transform: translateY(-5px); 
}

.card-img {
  height: 200px; 
  background-size: cover; 
  background-position: center; 
}

.card-info {
  padding: 15px; 
}

.card-info h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.card-info p {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px; 
  line-height: 1.5; 
}

.price {
  color: #ff4d4f; 
  font-size: 16px;
  font-weight: bold; 
  margin: 10px 0;
}


.search-box {
  display: flex; 
  align-items: center; 
  gap: 12px; 
  width: 100%; 
  max-width: 1000px; 
  margin: 0 auto;
  padding-bottom: 20px;
}

.search-box .el-input {
  flex: 1; 
  min-width: 200px; 
}

.search-box .el-select {
  width: 160px; 
  min-width: 120px; 
}

.search-box .el-button {
  width: 120px; 
  min-width: 100px; 
}
</style>