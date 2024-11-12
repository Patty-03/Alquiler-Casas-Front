import { createMemoryHistory, createRouter } from 'vue-router'

import Home from '../components/Home.vue'
import CasaDetails from '../components/CasaDetails.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/casa/:id', component: CasaDetails, props: true },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router