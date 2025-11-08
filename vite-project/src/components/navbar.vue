<template>
        <header>
        <div class="container">
            <div class="logo">🏠︎房屋租赁</div>
            <nav>
                <ul>
                    <li>
                        <a 
                        href="#home" 
                        @click="handleAnchorClick($event, '/')"
                        >
                        首页
                        </a>
                    </li>
                    <li>
                        <a 
                        @click="router.push({name:'More'})"
                        style="cursor: pointer;"
                        >
                        搜索房源
                        </a>
                    </li>
                    <li>
                        <a 
                        href="#recommend" 
                        @click="handleAnchorClick($event, '/')"
                        >
                        推荐房源
                        </a>
                    </li>
                    <li>
                        <a 
                        href="#publish" 
                        @click="handleAnchorClick($event, '/')"
                        >
                        发布房源
                        </a>
                    </li>
                    <li>
                        <a 
                        href="#message" 
                        @click="handleAnchorClick($event, '/')"
                        >
                        留言板
                        </a>
                    </li>
                    <li >
                        <a 
                        @click="login()"
                        style="cursor: pointer;"
                        v-if="!isLogin"
                        >
                        登陆/注册
                        </a>
                        <a
                        @click="my()"
                        style="cursor: pointer;"
                        v-else
                        >
                        {{ userInfo }}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>

</template>

<script setup>
import { useRouter } from 'vue-router';
import { inject } from 'vue'
const router = useRouter();
// 注入状态
const isLogin = inject('isLogin')
const userInfo = inject('userInfo')
const handleAnchorClick = (e, targetPath) => {
  const currentPath = router.currentRoute.value.path
  if (currentPath !== targetPath) {
    e.preventDefault() 
    router.push({
      path: targetPath,
      hash: e.target.hash
    })
  }
}

const login = () => {
    router.push({name:'Login'})
}

const my = () => {
    router.push({name:'My'})
}
</script>

<style scoped>

header {
    background-color: #5da5fa;
    color: white;
    padding: 15px 0;
    box-shadow: 0 3px 10px rgba(0,0,0,0.20);
    position: sticky;
    top: 0;
    z-index: 100;
}

.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
}

.logo {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
}

.logo::before {
    margin-right: 8px;
}

nav ul {
    display: flex;
    list-style: none;
}

nav ul li {
    margin-left: 25px;
}

nav ul li a {
    color: rgba(255,255,255,0.8);
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 4px;
    transition: all 0.3s ease;
    font-weight: 500;
    position: relative;
}

nav ul li a:hover {
    color: white;
}

nav ul li a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #3498db;
    transition: width 0.3s ease;
}

nav ul li a:hover::after {
    width: 100%;
}

@media (max-width: 768px) {
    nav ul {
        display: none;
    }
}
</style>