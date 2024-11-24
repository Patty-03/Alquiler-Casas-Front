import { createWebHistory, createRouter } from 'vue-router'

import Home from '../pages/Home.vue'
import CasaDetails from '../pages/CasaDetails.vue'
import BackOfficeAdmin from '../pages/BackOfficeAdmin.vue'
import BackOfficeGestor from '../pages/BackOfficeGestor.vue'
import FilterResults from '../pages/FilterResults.vue'
import Account from '../components/gestorBackOffice/Account.vue'
import Finances from '../components/gestorBackOffice/Finances.vue'
import Anuncios from '../components/gestorBackOffice/Anuncios.vue'
import GestorHome from '../components/gestorBackOffice/GestorHome.vue'
import Terms from '../pages/Terms.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/casa/:id', component: CasaDetails, props: true },
  { path: '/admin', component: BackOfficeAdmin},
  { path: '/gestor', component: BackOfficeGestor},
  { path: '/terms', component: Terms},
  { path: '/filterResults/:id', component: FilterResults, props: true},
  { path: '/accountgestor', component: Account, props: true, name: 'accountGestor'},
  { path: '/finances', component: Finances, props: true, name: 'finances'},
  { path: '/gestor/announcements', component: Anuncios, props: true, name: 'announcements'}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router