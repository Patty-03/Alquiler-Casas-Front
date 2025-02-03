<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { getHouses, convertToFullPath } from '../../functions';
import casa1 from '../../assets/casa1.jpg'

const router = useRouter();
const authStore = useAuthStore();

const houses = ref([]);

onMounted(async () => {
  try {
    const fetchedHouses = await getHouses();
    houses.value = fetchedHouses.map(house => ({ ...house, liked: false })).slice(0, 4);
  } catch (error) {
    console.error('Error al cargar las casas', error);
    modalMessage.value = 'Error al cargar las casas. Inténtelo de nuevo más tarde.';
    showModal.value = true;
  }
});

const showModal = ref(false);
const modalMessage = ref('');

const toggleLike = async (index) => {
  if (authStore.token) {
    try {
      await authStore.addFavorite(houses.value[index]);
      houses.value[index].liked = !houses.value[index].liked;
      modalMessage.value = houses.value[index].liked
        ? 'Casa agregada a sus favoritos'
        : 'Casa eliminada de sus favoritos';
    } catch (error) {
      console.error('Error al agregar favorito', error);
      modalMessage.value = 'Error al agregar favorito. Inténtelo de nuevo más tarde.';
    }
  } else {
    modalMessage.value = 'Inicie sesión para acceder a sus favoritos';
  }
  showModal.value = true;
};

const viewMoreDetails = (casa) => {
  router.push({ name: 'HouseDetails', params: { id: casa.idCasa } });
};
</script>

<template>
  <div class="pa-10">
    <h1 class="text-uppercase">Alquileres cerca de ti</h1>

    <v-container class="text-left mt-10">
      <v-row>
        <v-col
          v-for="(casa, index) in houses"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="v-card">
            <v-img
              :src="casa.fotosURL && casa.fotosURL.length > 0 ? convertToFullPath(casa.fotosURL[0]) : casa1"
              class="white--text align-end"
              alt="Imagen de la casa"
            >
              <v-card-title class="text-white nombre">{{ casa.nombre }}</v-card-title>
              <v-btn icon class="like-btn" @click="toggleLike(index)">
                <v-icon :color="casa.liked ? 'red' : 'grey'">mdi-heart</v-icon>
              </v-btn>
            </v-img>
            <v-card-subtitle class="mt-4">${{ casa.precioNoche }} / noche</v-card-subtitle>
            <v-card-actions>
              <v-btn @click="viewMoreDetails(casa)" class="text-purple">Ver más detalles</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="showModal" max-width="400">
      <v-card class="d-flex flex-column align-center pa-4">
        <v-icon v-if="modalMessage.includes('agregada')" color="green" class="mb-2">mdi-check-circle</v-icon>
        <v-icon v-else-if="modalMessage.includes('eliminada')" color="red" class="mb-2">mdi-close-circle</v-icon>
        <v-icon v-else color="warning" class="mb-2">mdi-alert-circle</v-icon>
        <v-card-title class="text-wrap text-center">{{ modalMessage }}</v-card-title>
        <v-card-actions>
          <v-btn @click="showModal = false" color="purple lighten-1" variant="elevated">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn color="purple" @click="router.push('/allHouses')" class="mt-10">Ver Mas</v-btn>
  </div>
</template>

<style scoped>
.like-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}

.nombre {
  text-shadow: 2px 2px 4px black;
}

.v-card {
  transition: transform 0.3s ease;
}

.v-card:hover {
  transform: scale(1.05);
}
</style>