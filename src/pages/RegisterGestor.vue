<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const valid = ref(false);
const email = ref('');
const telefono = ref('');
const clave = ref('');

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
    const regex = /^[0-9]{10}$/;
    if (regex.test(value)) return true;
    return 'El teléfono debe tener 10 dígitos';
  }
];

const claveRules = [
  value => {
    if (value) return true;
    return 'Campo requerido';
  },
  value => {
    if (value?.length >= 6) return true;
    return 'La clave debe tener al menos 6 caracteres';
  }
];

function goToLogin(){
  router.push('/loginGestor')
}
</script>

<template>
  <v-app id="fondo">
    <v-container class="d-flex justify-center flex-column w-60 align-center">
      <v-form v-model="valid" class="d-flex justify-center flex-column elevation-4 pa-5 mt-16 bg-white rounded align-center">
        <h2 class="text-uppercase mb-6 mt-2 text-wrap">Registrate en nuestra plataforma</h2>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          class="w-75"
        ></v-text-field>

        <v-text-field
          v-model="telefono"
          :rules="telefonoRules"
          label="Teléfono"
          required
          class="w-75"
        ></v-text-field>

        <v-text-field
          v-model="clave"
          :rules="claveRules"
          label="Clave"
          type="password"
          required
          class="w-75"
        ></v-text-field>
        
        <v-btn variant="flat"  @click="goToLogin" class="mt-6 mb-4">¿Ya tienes una cuenta? Inicia sesion</v-btn>
        <v-btn color="purple lighten-1" class="mb-2">Registrarse</v-btn>
      </v-form>
    </v-container>
  </v-app>
</template>

<style scoped>
  #fondo{
    background: url('../assets/casa4.jpg');
    background-size: cover;
  }
</style>
