import { createWebHistory, createRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
import LoginGestor from '../pages/LoginGestor.vue'
import Terms from '../pages/Terms.vue'
import Home from '../pages/Home.vue'
import HouseDetails from '../pages/HouseDetails.vue'
import SavedHouses from '../pages/SavedHouses.vue'
import BackOfficeGestor from '../pages/BackOfficeGestor.vue'
import AnunciosGestor from '../components/backOfficeGestor/AnunciosGestor.vue'
import AjustesGestor from '../components/backOfficeGestor/AjustesGestor.vue'
import FinanzasGestor from '../components/backOfficeGestor/FinanzasGestor.vue'
import ReservasGestor from '../components/backOfficeGestor/ReservasGestor.vue'
import FilterResults from '../pages/FilterResults.vue'
import AllHouses from '../pages/AllHouses.vue'
import MyReservations from '../pages/MyReservations.vue'
import BackOfficeAdmin from '../pages/BackOfficeAdmin.vue'
import AjustesAdmin from '../components/backOfficeAdmin/AjustesAdmin.vue'
import FinanzasAdmin from '../components/backOfficeAdmin/FinanzasAdmin.vue'
import AnunciosAdmin from '../components/backOfficeAdmin/AnunciosAdmin.vue'
import UsuariosAdmin from '../components/backOfficeAdmin/UsuariosAdmin.vue'
import LoginAdmin from '../pages/LoginAdmin.vue'
import MoreDetailsGestor from '../components/backOfficeGestor/MoreDetailsGestor.vue'

const requireAuth = (to, from, next) => {
    const authStore = useAuthStore();
    if (authStore.isLoggedIn) {
        next()
    } else {
        next('/loginGestor')
    }
}

const routes = [
    { path: '/loginAdmin', component: LoginAdmin },
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/terms', component: Terms },
    { path: '/loginGestor', component: LoginGestor },
    { path: '/register', component: Register },
    { path: '/houseDetails/:id', component: HouseDetails, props: true, name: "HouseDetails" },
    { path: '/saved', component: SavedHouses },
    {
        path: '/gestor', component: BackOfficeGestor,
        beforeEnter: requireAuth,
        redirect: '/anunciosGestor',
        children: [
            { path: '/anunciosGestor', component: AnunciosGestor },
            { path: '/ajustesGestor', component: AjustesGestor },
            { path: '/finanzasGestor', component: FinanzasGestor },
            { path: '/reservasGestor', component: ReservasGestor },
        ],
    },
    { path: '/gestor/moreDetails/:id', component: MoreDetailsGestor, name: 'MoreDetails', props: true },
    {
        path: '/admin', component: BackOfficeAdmin,
        redirect: '/anunciosAdmin',
        children: [
            { path: '/anunciosAdmin', component: AnunciosAdmin },
            { path: '/ajustesAdmin', component: AjustesAdmin },
            { path: '/finanzasAdmin', component: FinanzasAdmin },
            { path: '/usuariosAdmin', component: UsuariosAdmin }
        ],
    },
    { path: '/filterResults', component: FilterResults, props: route => ({ filterResult: route.params.filterResult }), name: 'FilterResults' },
    { path: '/allHouses', component: AllHouses },
    { path: `/reservations/:id`, component: MyReservations }
]



const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router