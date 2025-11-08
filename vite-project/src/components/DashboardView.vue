<template>
  <div class="dashboard">
    <!-- 统计卡片 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="stat-card" :body-style="{ padding: '15px' }" style="background-color: #5da5fa;">
          <div class="stat-title">总用户数</div>
          <div class="stat-value">{{ formatNumber(stats.totalUsers) }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" :body-style="{ padding: '15px' }" style="background-color: #67c23a;">
          <div class="stat-title">房源总数</div>
          <div class="stat-value">{{ formatNumber(stats.totalHouses) }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" :body-style="{ padding: '15px' }" style="background-color: #e6a23c;">
          <div class="stat-title">管理员数</div>
          <div class="stat-value">{{ formatNumber(stats.todayOrders) }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" :body-style="{ padding: '15px' }" style="background-color: #f56c6c;">
          <div class="stat-title">留言</div>
          <div class="stat-value">{{ formatNumber(stats.pendingMessages) }}</div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" style="margin-top: 20px;">
      <!-- 1. 用户增长趋势图 -->
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">用户增长趋势</div>
          </template>
          <div ref="userGrowthChart" class="chart-container"></div>
        </el-card>
      </el-col>

      <!-- 2. 房源类型分布图 -->
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">房源类型分布</div>
          </template>
          <div ref="houseTypeChart" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios'

// 统计数据
const stats = ref({
  totalUsers: 0,
  totalHouses: 0,
  todayOrders: 1,
  pendingMessages: 0,
});

const fetchTotalUser = ()=>{
  axios.get('http://localhost:3000/totalUser')
  .then(res => {
    console.log(res.data.data)
    stats.value.totalUsers = res.data.data[0]["COUNT(*)"]
  }).catch(err => {
    console.log(err)
  })
}
fetchTotalUser()

const fetchTotalHouse = ()=>{
  axios.get('http://localhost:3000/totalHouse')
  .then(res => {
    console.log(res.data.data)
    stats.value.totalHouses = res.data.data[0]["COUNT(*)"]
  }).catch(err => {
    console.log(err)
  })
}
fetchTotalHouse()

const fetchTotalMessage = ()=>{
  axios.get('http://localhost:3000/totalMessage')
  .then(res => {
    console.log(res.data.data)
    stats.value.pendingMessages = res.data.data[0]["COUNT(*)"]
  }).catch(err => {
    console.log(err)
  })
}
fetchTotalMessage()

// 图表容器
const userGrowthChart = ref(null);
const houseTypeChart = ref(null);

// 图表实例
let userChart, houseTypeEchart;

// 图表数据
const userGrowthData = ref([
  { name: '1月', value: 0 },
  { name: '2月', value: 0 },
  { name: '3月', value: 0 },
  { name: '4月', value: 0 },
  { name: '5月', value: 0 },
  { name: '6月', value: 0 },
  { name: '7月', value: 0 },
  { name: '8月', value: 0 },
  { name: '9月', value: 0 },
  { name: '10月', value: 0 },
  { name: '11月', value: 100 },
  { name: '12月', value: 0 },
  
]);

const houseTypeData = ref([
  { name: '一室一厅', value: 1 },
  { name: '两室一厅', value: 2 },
  { name: '三室一厅', value: 4 },
  { name: '三室两厅', value: 1 },
  { name: '其他', value: 1 }
]);

// 计算房源类型占比
const getHouseTypePercent = (name) => {
  const item = houseTypeData.value.find(i => i.name === name);
  const total = houseTypeData.value.reduce((sum, i) => sum + i.value, 0);
  return ((item.value / total) * 100).toFixed(1) + '%';
};

// 格式化数字为千分位
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 初始化图表
onMounted(() => {
  // 1. 用户增长趋势图
  userChart = echarts.init(userGrowthChart.value);
  userChart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: userGrowthData.value.map(item => item.name)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '新增用户',
        type: 'line',
        data: userGrowthData.value.map(item => item.value),
        smooth: true,
        lineStyle: {
          width: 2,
          color: '#5da5fa'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#5da5fa' },
            { offset: 1, color: 'rgba(93, 165, 250, 0.1)' }
          ])
        },
        symbol: 'none'
      }
    ]
  });

  // 2. 房源类型分布图
  houseTypeEchart = echarts.init(houseTypeChart.value);
  houseTypeEchart.setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      bottom: 10,
      formatter: (name) => `${name} (${getHouseTypePercent(name)})`
    },
    series: [
      {
        name: '房源类型',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: houseTypeData.value,
        color: ['#5da5fa', '#4096ff', '#6ba5ff', '#94bfff', '#bedaff']
      }
    ]
  });

  // 响应窗口大小变化
  const handleResize = () => {
    userChart && userChart.resize();
    houseTypeEchart && houseTypeEchart.resize();
  };
  
  window.addEventListener('resize', handleResize);
  
  // 保存事件处理函数以便卸载时移除
  window.__dashboardResizeHandler__ = handleResize;
});

// 组件卸载时销毁图表
onUnmounted(() => {
  if (userChart) {
    userChart.dispose();
  }
  if (houseTypeEchart) {
    houseTypeEchart.dispose();
  }
  
  // 移除窗口大小变化监听
  if (window.__dashboardResizeHandler__) {
    window.removeEventListener('resize', window.__dashboardResizeHandler__);
    delete window.__dashboardResizeHandler__;
  }
});
</script>

<style scoped>
.stat-card {
  color: #fff;
}

.stat-title {
  font-size: 14px;
  opacity: 0.9;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
}

.stat-trend {
  font-size: 12px;
}

.chart-card {
  height: 100%;
}

.chart-container {
  width: 100%;
  height: 300px;
  padding-top: 10px;
}

@media (max-width: 768px) {
  .chart-container {
    height: 250px;
  }
}

.card-header {
  font-size: 16px;
  font-weight: bold;
}
</style>