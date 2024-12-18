 import { createRouter, createWebHistory } from 'vue-router'

// import MyAccomList from '@/views/myAccomList.vue'
// import AccomUpdate from '@/components/AccomUpdate.vue'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'myAccomList',
//       component: MyAccomList,
//     },
//     {
//       path: '/accomUpdate/:accom_id',
//       name: 'AccomUpdate',
//       component: AccomUpdate,
//     },
//   ],


// 컴포넌트를 자동으로 import
const modules = import.meta.glob('../components/*.vue')

// 라우트를 동적으로 생성
const routes = Object.keys(modules).map((path) => {
  const name = path.split('/').pop().replace('.vue', '') // 파일 이름에서 경로와 확장자 제거
  return {
    path: `/${name.toLowerCase()}`, // 파일 이름을 소문자로 변환하여 경로 생성
    name,
    component: modules[path],
  }
});

// 동적 라우트 추가
routes.push({
  path: '/accomUpdate/:accom_id',
  name: 'AccomUpdate',
  component: () => import('../components/AccomUpdate.vue') // AccomUpdate 컴포넌트 로드
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,

})

export default router
