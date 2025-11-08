<template>
    <div>
    <section id="publish" class="section">
        <div class="container">
            <h2 class="section-title">发布房源</h2>
            <p class="section-desc">免费发布，快速出租，让您的房源找到合适的租客</p>
            
            <!-- 社区数据概览 -->
            <div class="community-stats">
                <div class="stat-card">
                    <div class="stat-number">35,800+</div>
                    <div class="stat-label">在线房源</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">15,500+</div>
                    <div class="stat-label">活跃租户</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">8,200+</div>
                    <div class="stat-label">活跃租客</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">420+</div>
                    <div class="stat-label">补贴项目</div>
                </div>
            </div>

            <div class="btn-container">
                <button class="community-btn" @click="add()">点我发布+</button>
            </div>
             
        </div>
    </section> 
    </div>       
</template>

<script setup>
import { useRouter } from 'vue-router';
import {inject} from 'vue';
const router = useRouter();

const isLogin = inject('isLogin')
const add = () => {
    if(isLogin.value){
        router.push({name:'Add'})
    }
    else {
        router.push({name:'Login'})
    }
}
console.log(isLogin)
</script>

<style scoped>
/* 2. 容器与区块样式 */
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* 通用section样式 */
.section {
    padding: 60px 0;
}

/* 3. 标题与描述样式 */
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

.section-desc {
    font-size: 1.1rem;
    color: #64748b;
    text-align: center;
    max-width: 700px;
    margin: 0 auto 60px;
}

/* 4. 社区数据概览样式 */
.community-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 60px;
}

.stat-card {
    background-color: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    text-align: center;
}

.stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: #5da5fa;
    margin-bottom: 10px;
}

.stat-label {
    color: #64748b;
    font-size: 0.95rem;
}

/* 新增：5. 居中按钮样式 */
/* 按钮容器：控制按钮水平居中 */
.btn-container {
    display: flex;
    justify-content: center;
    gap: 16px; /* 若有多个按钮，控制按钮间距 */
    padding: 20px 0; /* 上下内边距，与数据概览模块拉开距离 */
}

/* 主按钮样式 */
.community-btn {
    background-color: #5da5fa;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 32px;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(26, 86, 219, 0.2);
    transition: all 0.3s ease;
    min-width: 180px; /* 最小宽度，避免小屏文字换行 */
}

/* 按钮 hover 动效 */
.community-btn:hover {
    background-color: #1a56db; /* 深色 hover 效果 */
    box-shadow: 0 6px 12px rgba(26, 86, 219, 0.3);
    transform: translateY(-2px); /* 轻微上浮，增强交互感 */
}

/* 可选： outline 按钮样式（如需第二个按钮可启用） */
.outline-btn {
    background-color: transparent;
    color: #1a56db;
    border: 2px solid #1a56db;
    box-shadow: none;
}

.outline-btn:hover {
    background-color: rgba(26, 86, 219, 0.05);
    transform: translateY(-2px);
    box-shadow: none;
}

/* 5. 响应式适配 */
@media (max-width: 768px) {
    .section-title {
        font-size: 1.8rem;
    }

    /* 小屏下按钮尺寸适配 */
    .community-btn {
        padding: 10px 24px;
        font-size: 1rem;
        min-width: 150px;
    }
}
</style>