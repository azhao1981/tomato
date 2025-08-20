import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import DevTestPage from '../views/DevTestPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/dev-test',
    name: 'DevTest',
    component: DevTestPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router