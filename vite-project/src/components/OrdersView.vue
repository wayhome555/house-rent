<template>
  <el-card>
    <template #header>
      <div class="card-header">订单管理</div>
    </template>

    <!-- 搜索和筛选 -->
    <div class="search-bar">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索订单号/房源地址"
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
      
      <el-select
        v-model="statusFilter"
        placeholder="状态筛选"
        style="width: 150px; margin-left: auto"
        clearable
        @change="handleSearch"
      >
        <el-option label="待确认" value="pending" />
        <el-option label="已确认" value="confirmed" />
        <el-option label="已完成" value="completed" />
        <el-option label="已取消" value="cancelled" />
      </el-select>
    </div>

    <!-- 订单表格 -->
    <el-table 
      :data="filteredOrders" 
      border 
      style="width: 100%; margin-top: 15px;"
      row-key="id"
    >
      <el-table-column prop="id" label="订单号" width="140" />
      <el-table-column prop="houseAddress" label="房源地址" />
      <el-table-column prop="tenant" label="租客" width="120" />
      <el-table-column prop="landlord" label="房东" width="120" />
      <el-table-column prop="price" label="租金(元/月)" width="120">
        <template #default="scope">¥{{ scope.row.price }}</template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag 
            :type="scope.row.status === 'pending' ? 'warning' : 
                   scope.row.status === 'confirmed' ? 'primary' :
                   scope.row.status === 'completed' ? 'success' : 'danger'"
          >
            {{ scope.row.status === 'pending' ? '待确认' : 
               scope.row.status === 'confirmed' ? '已确认' :
               scope.row.status === 'completed' ? '已完成' : '已取消' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button 
            type="primary" 
            size="small" 
            @click="handleViewDetail(scope.row)"
          >
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

// 订单数据
const orders = ref([
  { id: 'O001', houseAddress: '阳光小区3号楼2单元', tenant: '张三', landlord: '孙八', price: '3500', createTime: '2025-11-01', status: 'completed' },
  { id: 'O002', houseAddress: '明月公寓15层', tenant: '李四', landlord: '周九', price: '1800', createTime: '2025-11-02', status: 'confirmed' },
  { id: 'O003', houseAddress: '星辰花园5号楼', tenant: '王五', landlord: '吴十', price: '2600', createTime: '2025-11-03', status: 'pending' },
  { id: 'O004', houseAddress: '幸福里小区', tenant: '赵六', landlord: '郑一', price: '3000', createTime: '2025-11-03', status: 'cancelled' }
]);

// 搜索和筛选条件
const searchKeyword = ref('');
const statusFilter = ref('');

// 筛选后的订单列表
const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const matchesSearch = 
      order.id.includes(searchKeyword.value) || 
      order.houseAddress.includes(searchKeyword.value);
    const matchesStatus = !statusFilter.value || order.status === statusFilter.value;
    return matchesSearch && matchesStatus;
  });
});

// 搜索处理
const handleSearch = () => { /* 由computed自动处理 */ };

// 查看详情
const handleViewDetail = (order) => {
  ElMessageBox.alert(`
    <p>订单号: ${order.id}</p>
    <p>房源地址: ${order.houseAddress}</p>
    <p>租客: ${order.tenant}</p>
    <p>房东: ${order.landlord}</p>
    <p>租金: ¥${order.price}/月</p>
    <p>创建时间: ${order.createTime}</p>
    <p>状态: ${order.status === 'pending' ? '待确认' : 
               order.status === 'confirmed' ? '已确认' :
               order.status === 'completed' ? '已完成' : '已取消'}</p>
  `, '订单详情', {
    dangerouslyUseHTMLString: true
  });
};
</script>

<style scoped>
.card-header {
  font-size: 16px;
  font-weight: bold;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
</style>