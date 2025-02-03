<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const valid = ref(false);
const clave = ref('');
const email = ref('');
const name = ref('');
const dialog = ref(false);
const message = ref(''); 
const color = ref(''); 

const claveRules = [
  value => {
    if (value) return true;
    return 'Campo requerido';
  },
  value => {
    if (value?.length >= 8) return true;
    return 'La clave debe tener al menos 8 caracteres';
  }
];

const emailRules = [
  value => {
    if (value) return true;
    return 'Campo requerido';
  },
  value => {
    if (/.+@.+\..+/.test(value)) return true;
    return 'El email debe ser valido';
  }
];

const nameRules = [
  value => {
    if (value) return true;
    return 'Campo requerido';
  },
  value => {
    if (value.length >= 3) return true;
    return 'El nombre debe tener al menos 3 caracteres';
  }
];

async function login() {
  const credentials = {
    nombreUsuario: name.value,
    correo: email.value,
    clave: clave.value
  };

  await authStore.login(credentials);
  if (!authStore.error && authStore.userRol == 1) {
    dialog.value = true;
    message.value = "Ha iniciado sesion correctamente";
    color.value = "success";
    } 
  else if(authStore.error != null){
    dialog.value = true;
    message.value = "Ha ocurrido un error, por favor intente mas tarde";
    color.value = "error";
    console.error('Error: ' + authStore.error);
  }
  else{
    dialog.value = true;
    message.value = "Usuario no autorizado";
    color.value = "error";
  }
}

function goToHome(){
  dialog.value = false
  if(color.value === "success"){
    router.push('/admin');
  }
  
}

</script>

<template>
  <v-app id="fondo">
    <v-container class="d-flex justify-center flex-column w-60 align-center">
      <v-form v-model="valid"
        class="d-flex justify-center flex-column elevation-4 pa-5 mt-16 bg-white rounded align-center">
        <h2 class="text-uppercase mb-6 mt-2 text-wrap">Inicia sesion en nuestra plataforma</h2>
        <v-text-field v-model="name" :rules="nameRules" label="Nombre de usuario" required class="w-75"></v-text-field>
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required class="w-75"></v-text-field>
        <v-text-field v-model="clave" :counter="8" :rules="claveRules" label="Contraseña" required type="password"
          class="w-75"></v-text-field>
        <v-btn color="purple lighten-1" class="mb-2" @click="login">Iniciar sesion</v-btn>
      </v-form>
    </v-container>
  </v-app>

  <v-dialog
    v-model="dialog"
    scrollable 
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
    persistent
  > 
  <v-card class="pa-4">
    <v-card-title primary-title class="text-wrap text-center">
      {{ message }}
    </v-card-title>
    <v-card-actions class="d-flex align-center flex-column">
      <v-btn :color="color" @click="goToHome" variant="flat">Cerrar</v-btn>
    </v-card-actions>
  </v-card>
    
  </v-dialog>
</template>

<style scoped>
#fondo {
  background: url('../assets/casa4.jpg');
  background-size: cover;
}
</style>
