import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',          // 路径
        name: 'Home',       // 路由名称（可选）
        component:()=>import('../view/home.vue'),     // 对应组件
    },
    {
        path:'/login',
        name:'Login',
        component:()=>import('../view/login.vue')
    },
    {
        path:'/register',
        name:'Register',
        component:()=>import('../view/register.vue')
    },
    {
        path:'/more',
        name:'More',
        component:()=>import('../view/more.vue')
    },
    {
        path:'/add',
        name:'Add',
        component:()=>import('../view/add.vue')
    },
    {
        path:'/admin',
        name:'Admin',
        component:()=>import('../view/admin.vue')
    },
    {
        path:'/my',
        name:'My',
        component:()=>import('../view/my.vue')
    }
    
]

const router = createRouter({
  history: createWebHistory(),  
  routes                        
})

export default router