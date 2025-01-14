<script setup>
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter()
const authStore = useAuthStore()
const message = ref('')
const dialog = ref(false)

function logOut(){
    message.value = "Ha cerrado sesion correctamente"
    dialog.value = true
    authStore.logout()
}

</script>

<template>
    <v-btn color="error" @click="logOut">Cerrar sesion</v-btn>

    <v-dialog
    v-model="dialog"
    scrollable persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  > 
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