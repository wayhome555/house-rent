<template>
<div class="login-page">
  <div class="login-banner">

  </div>

  <div class="login-form-container">
    <div class="form-wrapper">
      <h3 class="form-title">账号注册</h3>
      
      <el-form 
        ref="loginFormRef" 
        :model="loginForm" 
        :rules="loginRules" 
        label-width="0" 
        class="login-form"
      >

        <el-form-item prop="account">
          <el-input 
            v-model="loginForm.account" 
            placeholder="请输入手机号或用户名" 
            prefix-icon="el-icon-user"
            clearable
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input 
            v-model="loginForm.password" 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="请输入密码" 
            prefix-icon="el-icon-lock"
            clearable
          >
            <template #suffix>
              <i 
                class="el-icon" 
                :class="showPassword ? 'el-icon-eye-slash' : 'el-icon-eye'"
                @click="showPassword = !showPassword"
              ></i>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            class="login-btn" 
            @click="handleRegister()"
            :loading="isLoading"
          >
            注册
          </el-button>
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="info" 
            class="quit-btn" 
            @click="handleQuit()"
            :loading="isLoading"
          >
            取消
        </el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage, ElForm } from 'element-plus';
import { useRouter } from 'vue-router';
import axios from 'axios'

const router = useRouter()
// 表单数据
const loginForm = reactive({
  account: '', // 账号（手机号/用户名）
  password: '', // 密码
});

// 表单校验规则
const loginRules = reactive({
  account: [
    { required: true, message: '请输入手机号或用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
});

// 状态管理
const loginFormRef = ref(null); 
const showPassword = ref(false); 
const isLoading = ref(false); 

// 注册处理
const handleRegister = () => {
  axios.post('http://localhost:3000/register',{
    username:loginForm.account,
    password:loginForm.password
  }).then(res => {
    if(res.data.success){
      ElMessage.success('注册成功');
      router.push({name:'Login'})
    }else{
      ElMessage.error('注册失败')
    }
  }).catch(err => {
    console.log(err)
  })
};

const handleQuit = ()=>{
  router.push({name:'Login'})
}
</script>

<style scoped>
/* 页面整体样式 */
.login-page {
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #f5f7fa;
}

/* 左侧品牌展示区：主题色渐变 */
.login-banner {
  flex: 1;
    background-image: url('../assets/image1.jpg'); /* 背景图片路径 */
    background-size: cover; /* 让图片自适应容器大小并保持比例 */
    background-position: center; /* 图片居中显示 */
    background-repeat: no-repeat; /* 防止图片重复 */
  color: white;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-content {
  max-width: 400px;
}

.brand-title {
  font-size: 2.2rem;
  margin-bottom: 20px;
  font-weight: 600;
}

.brand-desc {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 40px;
  opacity: 0.9;
}

.brand-stats {
  display: flex;
  gap: 30px;
}

.stat-item {
  text-align: center;
}

.stat-num {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 8px;
  display: block;
}

.stat-text {
  font-size: 0.95rem;
  opacity: 0.8;
}

/* 右侧登录表单区 */
.login-form-container {
  flex: 0 0 420px;
  background-color: white;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.form-wrapper {
  margin-top: 80px;
}

.form-title {
  font-size: 1.6rem;
  font-weight: 600;
  color: #1d2129;
  margin-bottom: 30px;
  text-align: center;
}

.login-form {
  width: 100%;
}

/* 输入框样式优化：聚焦时主题色边框 */
.login-form .el-input {
  height: 50px;
  margin-bottom: 20px;
}

.login-form .el-input__inner {
  border-radius: 8px;
  border-color: #e5e6eb;
  font-size: 1rem;
  padding: 0 16px;
}

.login-form .el-input__inner:focus {
  border-color: #5da5fa; /* 输入框聚焦：主题色 */
  box-shadow: 0 0 0 2px rgba(93, 165, 250, 0.2); /* 主题色阴影 */
}

.login-form .el-input__prefix {
  color: #86909c;
}

/* 密码切换图标：主题色 */
.login-form .el-icon-eye,
.login-form .el-icon-eye-slash {
  color: #5da5fa;
  cursor: pointer;
}

/* 表单额外操作（记住登录+忘记密码） */
.form-extra {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  font-size: 0.95rem;
}

/* 复选框：选中时主题色 */
.form-extra .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #5da5fa;
  border-color: #5da5fa;
}

.form-extra .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #5da5fa;
}

.forgot-password {
  color: #5da5fa; /* 忘记密码：主题色 */
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
  color: #3b8afd; /* hover：主题色加深 */
}

/* 登录按钮：主题色 */
.login-btn {
  width: 100%;
  height: 50px;
  border-radius: 8px;
  font-size: 1.05rem;
  font-weight: 500;
  background-color: #5da5fa; /* 按钮主色 */
  border-color: #5da5fa;
}

.login-btn:hover {
  background-color: #3b8afd; /* 按钮hover：主题色加深 */
  border-color: #3b8afd;
}

.login-btn.is-loading .el-loading-spinner {
  color: white;
}

/* 登录按钮：主题色 */
.quit-btn {
  width: 100%;
  height: 50px;
  border-radius: 8px;
  font-size: 1.05rem;
  font-weight: 500;
  background-color: gainsboro; /* 按钮主色 */
  border-color: gainsboro;
}

.quit-btn:hover {
  background-color: grey; /* 按钮hover：主题色加深 */
  border-color: grey;
}

.quit-btn.is-loading .el-loading-spinner {
  color: white;
}

/* 注册入口 */
.register-link {
  text-align: center;
  margin-top: 25px;
  font-size: 0.95rem;
  color: #64748b;
}

.register-btn {
  color: #5da5fa; /* 注册链接：主题色 */
  font-weight: 500;
  text-decoration: none;
  margin-left: 5px;
}

.register-btn:hover {
  text-decoration: underline;
  color: #3b8afd; /* hover：主题色加深 */
}

/* 底部隐私政策 */
.login-footer {
  text-align: center;
  font-size: 0.85rem;
  color: #86909c;
  padding: 20px 0;
}

.login-footer a {
  color: #86909c;
  text-decoration: none;
  margin: 0 8px;
}

.login-footer a:hover {
  color: #5da5fa; /* 链接hover：主题色 */
  text-decoration: underline;
}

.footer-split {
  margin: 0 8px;
}

/* 响应式适配（小屏合并布局） */
@media (max-width: 768px) {
  .login-page {
    flex-direction: column;
  }

  .login-banner {
    flex: none;
    padding: 30px 20px;
    text-align: center;
  }

  .brand-title {
    font-size: 1.8rem;
  }

  .brand-desc {
    font-size: 1rem;
    margin-bottom: 25px;
  }

  .brand-stats {
    justify-content: center;
    gap: 20px;
  }

  .stat-num {
    font-size: 1.5rem;
  }

  .login-form-container {
    flex: none;
    width: 100%;
    padding: 20px;
  }

  .form-wrapper {
    margin-top: 30px;
  }
}
</style>