import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/mapEntity.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory('/#/visualization'),
    routes
})

export default router
