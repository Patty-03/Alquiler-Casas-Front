<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const valid = ref(false);
const email = ref('');
const telefono = ref('');
const clave = ref('');
const name = ref('')
const color = ref('')
const message = ref('')
const dialog = ref(false)

const register = async () => {
  const userData = {
    nombreUsuario: name.value,
    correo: email.value,
    numeroContacto: telefono.value,
    idRol: 3,
    clave: clave.value
  };

  await authStore.createUser(userData);
  if (!authStore.error) {
    dialog.value = true;
    message.value = "Ha iniciado sesion correctamente";
    color.value = "success";
  } else {
    dialog.value = true;
    message.value = "Ha ocurrido un error, por favor intente mas tarde";
    color.value = "error";
    console.error('Error: ' + authStore.error);
  }
};

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

const emailRules = [
  value => {
    if (value) return true;
    return 'Campo requerido';
  },
  value => {
    if (/.+@.+\..+/.test(value)) return true;
    return 'El email debe ser válido';
  }
];

const telefonoRules = [
  value => {
    if (value) return true;
    return 'Campo requerido';
  },
  value => {
    const regex = /^[0-9]{8}$/;
    if (regex.test(value)) return true;
    return 'El teléfono debe tener 8 dígitos';
  }
];

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

function goToLogin() {
  router.push('/login');
}
</script>

<template>
  <v-app id="fondo">
    <v-container class="d-flex justify-center flex-column w-60 align-center">
      <v-form v-model="valid"
        class="d-flex justify-center flex-column elevation-4 pa-5 mt-16 bg-white rounded align-center">
        <h2 class="text-uppercase mb-6 mt-2 text-wrap">Registrate en nuestra plataforma</h2>

        <v-text-field v-model="name" :rules="nameRules" label="Nombre de usuario" required class="w-75"></v-text-field>

        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required class="w-75"></v-text-field>

        <v-text-field v-model="telefono" :rules="telefonoRules" label="Teléfono" required class="w-75"></v-text-field>

        <v-text-field v-model="clave" :rules="claveRules" label="Clave" type="password" required class="w-75"></v-text-field>

        <v-btn variant="flat" @click="goToLogin" class="mt-6 mb-4">¿Ya tienes una cuenta? Inicia sesion</v-btn>
        <v-btn color="purple lighten-1" class="mb-2" @click="register">Registrarse</v-btn>
      </v-form>
    </v-container>
  </v-app>

  <v-dialog
    v-model="dialog"
    scrollable 
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  > 
  <v-card class="pa-4">
    <v-card-title primary-title class="text-wrap text-center">
      {{ message }}
    </v-card-title>
    <v-card-actions class="d-flex align-center flex-column">
      <v-btn :color="color" @click="dialog = false" variant="flat">Cerrar</v-btn>
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
