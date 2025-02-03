<template>
  <HeaderHome></HeaderHome>

  <main class="mb-10">
    <div class="pa-10 mt-16">

      <template v-if="filteredFavorites.length === 0">
        <v-alert class="mt-10">No tienes casas agregadas en favoritos</v-alert>
      </template>

      <template v-else>
        <v-container class="text-left">
          <v-row>
            <v-col v-for="(house, index) in filteredFavorites" :key="index" cols="12" sm="6" md="4" lg="3">
              <v-card>
                <v-img :src="house.fotosURL && house.fotosURL.length > 0 ? convertToFullPath(house.fotosURL[0]) : casa1" class="white--text align-end">
                  <v-card-title class="text-white nombre">{{ house.descripcion }}</v-card-title>
                  <v-btn icon class="like-btn" @click="toggleLike(house)" aria-label="Toggle like">
                    <v-icon :color="house.liked ? 'red' : 'grey'">mdi-heart</v-icon>
                  </v-btn>
                </v-img>
                <v-card-subtitle class="mt-4">${{ house.precioNoche }} / noche</v-card-subtitle>
                <v-card-actions>
                  <v-btn @click="viewMoreDetails(house)" class="text-purple">Ver más detalles</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <v-dialog v-model="showModal" max-width="400">
        <v-card class="d-flex flex-column align-center">
          <v-card-title class="text-wrap text-center">{{ modalMessage }}</v-card-title>
          <v-card-actions>
            <v-btn @click="showModal = false" color="purple lighten-1" variant="elevated">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

  </main>

  <footer class="mt-16">
    <Footer id="footer"></Footer>
  </footer>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import HeaderHome from '../components/home/HeaderHome.vue';
import casa1 from '../assets/casa1.jpg';
import Footer from '../components/commons/Footer.vue'
import { convertToFullPath } from '../functions';

const router = useRouter();
const authStore = useAuthStore();

const showModal = ref(false);
const modalMessage = ref('');

// Cargar favoritos al montar el componente
onMounted(async () => {
  if (!authStore.token) {
    router.push('/login');
  } else {
    try {
      await authStore.loadFavorites(); // Cargar favoritos desde localStorage
    } catch (error) {
      modalMessage.value = 'Error al cargar los favoritos';
      showModal.value = true;
    }
  }
});

// Filtrar favoritos para asegurarse de que tengan los campos necesarios
const filteredFavorites = computed(() => {
  return authStore.favorites.filter(fav => fav && fav.descripcion && fav.precioNoche);
});

// Redirigir a la página de detalles de la casa
const viewMoreDetails = (house) => {
  router.push({ path: '/CasaDetails', query: { id: house.idCasa } });
};

// Alternar el estado de favorito de una casa
const toggleLike = async (house) => {
  if (authStore.token) {
    try {
      authStore.toggleFavorite(house); // Alternar favorito en el store
      modalMessage.value = authStore.isFavorite(house.idCasa)
        ? 'Casa agregada a sus favoritos'
        : 'Casa eliminada de sus favoritos';
    } catch (error) {
      console.error('Error al actualizar favoritos', error);
      modalMessage.value = 'Error al actualizar favoritos. Inténtelo de nuevo más tarde.';
    }
  } else {
    modalMessage.value = 'Inicie sesión para acceder a sus favoritos';
  }
  showModal.value = true;
};
</script>

<style scoped>
.like-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}

.nombre {
  text-shadow: 2px 2px 4px black;
}
</style>