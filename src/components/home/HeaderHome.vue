<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { getUserData } from '../../functions';
import profile from '../../assets/profile.png';

const drawer = ref(false);
const dialog = ref(false);
const authStore = useAuthStore();
const router = useRouter();
const isGestor = ref(false)

const isLogged = ref(!!authStore.token);

watch(() => authStore.token, (newToken) => {
    isLogged.value = !!newToken;
});

const user = ref({
        nombreUsuario: "",
        correo: "",
        numeroContacto: ""
    })

async function getUserInfo() {
    if (isLogged.value) {
        try {
            const response = await getUserData(localStorage.getItem('userId'));
            user.value.nombreUsuario = response.value.nombreUsuario
            user.value.correo = response.value.correo
            user.value.numeroContacto = response.value.numeroContacto
        } catch (error) {
            console.error('Ocurrió un error al cargar la info del usuario', error);
        }
    }
}

onMounted(() => {
    getUserInfo();
});

function goToLogin() {
    router.push('/login');
}

function goToRegisterGestor() {
    isGestor.value = true
    router.push('/loginGestor');
}

function goToSaved() {
    if (!isLogged.value) {
        alert('No estás logueado papu');
    } else {
        router.push('/saved');
    }
}

function openUserDialog() {
    if (isLogged.value) {
        dialog.value = true;
    } else {
        goToLogin();
    }
}

function logout() {
    authStore.logout();
    dialog.value = false;
    router.push('/login');
}

function goToMyReservs(){
if(authStore.isLoggedIn){
    router.push(`/reservations/${localStorage.getItem('userId')}`)
}
else{
    alert('Para acceder a sus reservas, debe loguearse')
}
}

</script>

<template>
    <div>
        <v-app-bar color="purple lighten-1" class="pl-5 pr-5">
            <v-app-bar-title class="text-left">VILLA</v-app-bar-title>
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"
                v-if="!$vuetify.display.mdAndUp"></v-app-bar-nav-icon>

            <template v-if="$vuetify.display.mdAndUp">
                <v-btn variant="text" @click="router.push('/allHouses')">
                    Explorar
                </v-btn>
                <v-btn variant="text">
                    Contacto
                </v-btn>
                <v-btn variant="text" @click="goToSaved">
                    Favoritos
                </v-btn>
                <v-btn variant="text" @click="goToMyReservs">
                    Mis Reservas
                </v-btn>
                <v-btn variant="text" @click="router.push('/loginGestor')">
                    Alquila tu casa
                </v-btn>
                <v-btn icon @click="openUserDialog">
                    <v-icon class="text-white">mdi-account</v-icon>
                </v-btn>
            </template>
        </v-app-bar>
    </div>

    <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'right' : undefined" temporary>
        <v-list>
            <v-list-item>
                <v-btn variant="text" @click="router.push('/allHouses')">
                    Explorar
                </v-btn>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-btn variant="text">
                        Contacto
                    </v-btn>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-btn variant="text" @click="goToSaved">
                        Favoritos
                    </v-btn>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-btn variant="text" @click="goToMyReservs">
                        Mis Reservas
                    </v-btn>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-btn variant="text" @click="router.push('/loginGestor')">
                        Alquila tu casa
                    </v-btn>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-btn icon="mdi-account" @click="openUserDialog"></v-btn>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-dialog v-model="dialog" max-width="400">
        <v-card class="d-flex align-center justify-center pa-6">
            <v-img :src='user.profilePicture || profile' class="rounded-circle" width="200"></v-img>
            <v-card-title>{{ user.nombreUsuario }}</v-card-title>
            <v-card-subtitle>{{ user.correo }}</v-card-subtitle>
            <v-card-actions>
                <v-btn @click="dialog = false">Cancelar</v-btn>
                <v-btn @click="logout" color="red">Cerrar Sesión</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.v-card {
    border-radius: 8px;
    overflow: hidden;
}
</style>
