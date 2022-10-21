import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout';

Vue.use(Router);

export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        children: [{
            path: '/',
            component: () => import('@/views/index'),
            name: 'Documentation',
            meta: {
                title: '图片管理',
                icon: 'documentation',
                affix: false
            }
        }]
    }
]

export const asyncRoutes = [
    {
        path: '/icon',
        component: Layout,
        children: [{
            path: '/icon/',
            component: () => import('@/views/icons/index'),
            name: 'Icons',
            meta: {
                title: '图标管理',
                icon: 'el-icon-star-on',
                noCache: true
            }
        }]
    }
]


const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
