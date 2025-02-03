<script setup>
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import profile from '../../assets/profile.png'
import { getUserData } from '../../functions';
import { onMounted } from 'vue';

const router = useRouter()
const authStore = useAuthStore()
const message = ref('')
const dialog = ref(false)

const user = ref({
  nombreUsuario: "",
  correo: "",
  numeroContacto: ""
})

function logOut() {
  message.value = "Ha cerrado sesion correctamente"
  dialog.value = true
  authStore.logout()
}

onMounted(async () => {
  try {
    const response = await getUserData(localStorage.getItem('userId'))
  user.value.nombreUsuario = response.value.nombreUsuario
  user.value.correo = response.value.correo
  user.value.numeroContacto = response.value.numeroContacto
  } catch (error) {
    console.error('No se pudo cargar el usuario', error)
  } 
})
</script>

<template>
  <div class="mt-16 d-flex flex-column">
        <v-img class="rounded-circle" :src="profile" max-width="300"></v-img>
        <h3 class="pa-1">Usuario: <span class="text-grey-darken-2">{{ user.nombreUsuario }}</span></h3>
        <h3 class="pa-1">Correo: <span class="text-grey-darken-2">{{ user.correo }}</span></h3>
        <h3 class="pa-1">Telefono: <span class="text-grey-darken-2">{{ user.numeroContacto }}</span></h3>
        <v-btn color="error" @click="logOut" class="pa-1 mt-4">Cerrar sesion</v-btn>
  </div>

  <v-dialog v-model="dialog" scrollable persistent :overlay="false" max-width="500px" transition="dialog-transition">
    <v-card class="pa-4">
      <v-card-title primary-title class="text-wrap text-center">
        {{ message }}
      </v-card-title>
      <v-card-actions class="d-flex align-center flex-column">
        <v-btn color="success" variant="elevated" @click="
          router.push('/loginGestor')">Cerrar</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>