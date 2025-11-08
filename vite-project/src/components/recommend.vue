<template>
  <section id="recommend" class="house-list-section">
    <div class="container">
      <h2 class="section-title">推荐房源</h2>
      <div class="card-container">
        <div 
          v-for="(house, index) in houses" 
          :key="index" 
          class="card"
        >
          <div 
            class="card-img" 
            :style="{ backgroundImage: `url(${house.imgUrl})` }"
          ></div>
          <div class="card-info">
            <h3>{{ house.title }}</h3>
            <p>地址：{{ house.address }}</p>
            <p>面积：{{ house.area }}㎡ | 楼层：{{ house.floor }} | 朝向：{{ house.direction }}</p>
            <p>电话：{{ house.phone }}</p>
            <p class="price">¥{{ house.price }}/月</p>
            <el-button type="primary" @click="open(house) ">查看详情</el-button>
          </div>
        </div>
      </div>
      <el-link type="primary" class="el" :underline="false" @click="see()" v-if="show">查看更多</el-link>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const show = ref(true)
const router = useRouter();
const houses= ref( [
      {
        imgUrl: 'https://picsum.photos/400/200?random=1',
        title: '阳光花园 三室两厅',
        address: '上海区上海路123号',
        area: 120,
        floor: '10/20',
        direction: '南',
        phone:123456789,
        price: 3500
      },
      {
        imgUrl: 'https://picsum.photos/400/200?random=2',
        title: '湖畔小区 两室一厅',
        address: '北京区湖畔路456号',
        area: 85,
        floor: '5/18',
        direction: '东',
        phone:123456789,
        price: 2800
      },
      {
        imgUrl: 'https://picsum.photos/400/200?random=3',
        title: '都市精英公寓 一室一厅',
        address: '小米区CBD中心789号',
        area: 50,
        floor: '25/30',
        direction: '西',
        phone:123456789,
        price: 2200
      }
    ]
)

const open = (house) => {
  ElMessageBox.alert(`
    <p>基本情况: ${ house.title }</p>
    <p>房源地址: ${ house.address }</p>
    <p>房源面积: ${ house.area }</p>
    <p>房源楼层: ${ house.floor }</p>
    <p>房源朝向: ${ house.direction }</p>
    <p>电话:${ house.phone } </p>
    <p>租金:${ house.price } ¥/月</p>
  `, '详情', {
    dangerouslyUseHTMLString: true
  });
}

const see = () => {
  show.value = false
  houses.value = [
    {
        imgUrl: 'https://picsum.photos/400/200?random=1',
        title: '阳光花园 三室两厅',
        address: '上海区上海路123号',
        area: 120,
        floor: '10/20',
        direction: '南',
        phone:123456789,
        price: 3500
      },
      {
        imgUrl: 'https://picsum.photos/400/200?random=2',
        title: '湖畔小区 两室一厅',
        address: '北京区湖畔路456号',
        area: 85,
        floor: '5/18',
        direction: '东',
        phone:123456789,
        price: 2800
      },
      {
        imgUrl: 'https://picsum.photos/400/200?random=3',
        title: '都市精英公寓 一室一厅',
        address: '小米区CBD中心789号',
        area: 50,
        floor: '25/30',
        direction: '西',
        phone:123456789,
        price: 2200
      },
      {
        imgUrl: 'https://picsum.photos/400/200?random=4',
        title: '滨江壹号 四室两厅',
        address: '广州区滨江大道56号',
        area: 150,
        floor: '18/32',
        direction: '南北通透',
        phone: 13800138000,
        price: 5200
      },
      {
        imgUrl: 'https://picsum.photos/400/200?random=5',
        title: '森林公寓 两室一厅',
        address: '深圳区科技园路89号',
        area: 75,
        floor: '8/15',
        direction: '东南向',
        phone: 13912345678,
        price: 3800
      },
      {
        imgUrl: 'https://picsum.photos/400/200?random=6',
        title: '老城根里 一室一厅',
        address: '成都区宽窄巷子23号',
        area: 45,
        floor: '3/7',
        direction: '西南向',
        phone: 13678901234,
        price: 2100
      },
  ]
}
</script>

<style scoped>
.el {
  display: block; 
  text-align: center; 
  margin: 20px auto 0; 
  font-size: 15px; 
}
.house-list-section {
  padding: 60px 0; 
  background-color: #f1f5f9;
}

.container {
  width: 100%;
  max-width: 1200px; 
  margin: 0 auto; 
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

</style>