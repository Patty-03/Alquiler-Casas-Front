<script setup>
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import profile from '../../assets/profile.png';
import { getUserData } from '../../functions';
import { onMounted } from 'vue';

const router = useRouter();
const authStore = useAuthStore();
const message = ref('');
const dialog = ref(false);

const user = ref({
  nombreUsuario: "",
  correo: "",
  numeroContacto: ""
});

function logOut() {
  message.value = "Ha cerrado sesión correctamente";
  dialog.value = true;
  authStore.logout();
}

onMounted(async () => {
  try {
    const response = await getUserData(localStorage.getItem('userId'));
    user.value.nombreUsuario = response.value.nombreUsuario;
    user.value.correo = response.value.correo;
    user.value.numeroContacto = response.value.numeroContacto;
  } catch (error) {
    console.error('No se pudo cargar el usuario', error);
  }
});
</script>

<template>
  <v-container class=" d-flex flex-column align-center justify-center">
    <!-- Tarjeta de perfil -->
    <v-card class="profile-card pa-6" elevation="10" max-width="600">
      <v-img class="rounded-circle mx-auto" :src="profile" max-width="150" alt="Foto de perfil"></v-img>
      <v-card-title class="text-center text-h5 font-weight-bold mt-4">
        {{ user.nombreUsuario }}
      </v-card-title>
      <v-card-subtitle class="text-center text-body-1 text-grey-darken-2">
        Información del usuario
      </v-card-subtitle>

      <!-- Detalles del usuario -->
      <v-list class="mt-4 bg-transparent">
        <v-list-item>
            <v-icon color="primary">mdi-email</v-icon>
            {{ user.correo }}
        </v-list-item>

        <v-list-item>
            <v-icon color="primary">mdi-phone</v-icon>
            {{ user.numeroContacto }}
        </v-list-item>
      </v-list>

      <!-- Botón de cerrar sesión -->
      <v-btn
        color="error"
        @click="logOut"
        class="mt-4"
        block
        large
        elevation="2"
      >
        Cerrar sesión
      </v-btn>
    </v-card>
  </v-container>

  <!-- Diálogo de confirmación -->
  <v-dialog v-model="dialog" scrollable persistent max-width="500px" transition="dialog-transition">
    <v-card class="pa-4">
      <v-card-title primary-title class="text-wrap text-center">
        {{ message }}
      </v-card-title>
      <v-card-actions class="d-flex align-center flex-column">
        <v-btn color="success" variant="elevated" @click="router.push('/loginAdmin')">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.profile-card {
  border-radius: 15px;
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.rounded-circle {
  border: 4px solid #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.v-list-item {
  padding: 8px 0;
}

.v-list-item-icon {
  margin-right: 16px;
}

.v-list-item-title {
  font-size: 1rem;
  color: #424242;
}
</style>