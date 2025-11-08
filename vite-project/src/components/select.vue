<template>
<section id="home" class="hero">
  <el-carousel height="717px">
    <el-carousel-item v-for="item in imageArr" :key="item">
      <img :src="item" alt="" class="carousel-img">
    </el-carousel-item>
    <div class="carousel-content">
        <h1>找好房，就上房屋租赁网</h1>
        <div>
          <p>海量真实房源，智能搜索匹配，让租房更简单</p>
        </div>
        <div class="search-box">
          <el-button type="primary" :icon="Search" size="large" @click=search() style="font-size: 16px;">点击开始搜索</el-button>
        </div>
    </div>
  </el-carousel>
</section>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import image2 from '../assets/image2.jpg'
import image1 from '../assets/image1.jpg'
import image3 from '../assets/image3.jpg'
import { useRouter } from 'vue-router'

const imageArr = ref([image1,image2,image3])
const router = useRouter()

const search = () => {
    router.push({name:'More'})
}
</script>

<style scoped>
.hero {
  text-align: center;
  color: #fff;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-content {
 position: absolute;
  top: 0;
  left: 0;
  padding:0 20px 0 20px;
  text-align: center;
  z-index: 10; 
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.carousel-content h1 {
  font-size: 4rem;
  margin-bottom: 15px;
  font-weight: 700;
  line-height: 1.2;
}

.carousel-content p {
  font-size: 2rem;
  margin-bottom: 30px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.search-box {
  display: flex;
  gap: 10px;
  max-width: 900px;
  margin: 0 auto;
  align-items: center;
  width:auto;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .search-box {
    flex-direction: column;
  }
  .search-box :deep(.el-input),
  .search-box :deep(.el-select),
  .search-box :deep(.el-button) {
    width: 100% !important;
  }
  .carousel-content h1 {
    font-size: 2rem;
  }
  .carousel-content p {
    font-size: 1rem;
  }
}
</style>