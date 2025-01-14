<template>
    <HeaderHome></HeaderHome>
  
    <div class="pa-10 mt-16">
      <h1>Casas Favoritas</h1>
    
      <template v-if="filteredFavorites.length === 0">
        <h2 class="mt-10 opacity-70">Lo sentimos, no tienes casas agregadas en favoritos</h2>
      </template>


      <template v-else>
        <v-container class="text-left">
          <v-row>
            <v-col
              v-for="(house, index) in filteredFavorites"
              :key="index"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
            <v-card>
              <v-img
                :src="house.fotos || casa1"
                class="white--text align-end"
              >
                <v-card-title class="text-white nombre">{{ house.descripcion }}</v-card-title>
                <v-btn icon class="like-btn" @click="toggleLike(house, index)">
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
  </template>
    
  <script setup>
  import { onMounted, ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../stores/auth';
  import HeaderHome from '../components/home/HeaderHome.vue';
  import casa1 from '../assets/casa1.jpg';
    
  const router = useRouter();
  const authStore = useAuthStore();
    
  const favorites = ref([]);
    
  onMounted(() => {
    if (authStore.token) {
      authStore.loadFavorites();
      favorites.value = authStore.favorites;
    }
  });
    
  const filteredFavorites = computed(() => {
    return favorites.value.filter(fav => fav && fav.descripcion && fav.precioNoche);
  });
    
  const showModal = ref(false);
  const modalMessage = ref('');
    
  const viewMoreDetails = (house) => {
    router.push('/CasaDetails');
  };
  
  const toggleLike = (house, index) => {
    if (authStore.token) {
      authStore.removeFavorite(house); // Eliminar favorito usando authStore
      favorites.value.splice(index, 1); // Eliminar de la lista localmente
      modalMessage.value = 'Casa eliminada de sus favoritos';
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
  