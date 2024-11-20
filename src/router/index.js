import { createRouter, createWebHistory } from 'vue-router'
import MyAccomList from '@/views/myAccomList.vue'
import AccomUpdate from '@/components/AccomUpdate.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'myAccomList',
      component: MyAccomList,
    },
    {
      path: '/accomUpdate/:accom_id',
      name: 'AccomUpdate',
      component: AccomUpdate,
    },
  ],
})

export default router
