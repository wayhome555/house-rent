<template>
  <div>
      <!-- <Navbar /> -->
      <router-view></router-view>
  </div>

</template>

<script setup>
import {ref,provide} from 'vue'

// // 定义登录状态
// const isLogin = ref(false)
// const userInfo = ref(null)

// // 提供更新状态的方法
// const updateLoginStatus = (status, info) => {
//   isLogin.value = status
//   userInfo.value = info
// }

// // 向后代组件提供状态和方法
// provide('isLogin', isLogin)
// provide('userInfo', userInfo)
// provide('updateLoginStatus', updateLoginStatus)

const isLogin = ref(localStorage.getItem('isLogin') === 'true');
const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || 'null'));

// 提供给子组件
provide('isLogin', isLogin);
provide('userInfo', userInfo);
provide('updateLoginStatus', (status, info) => {
  isLogin.value = status;
  userInfo.value = info;
  // 更新本地存储
  localStorage.setItem('isLogin', status ? 'true' : 'false');
  localStorage.setItem('userInfo', info ? JSON.stringify(info) : 'null');
});
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>