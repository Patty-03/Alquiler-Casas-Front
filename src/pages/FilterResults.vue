<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HeaderHome from '../components/home/HeaderHome.vue';
import MoreFilters from '../components/filterResults/MoreFilters.vue';
import casa1 from '../assets/casa1.jpg';
import { useAuthStore } from '../stores/auth';

const props = defineProps({
  filterResult: {
    type: [Array, Object],
    default: () => [] 
  }
});

const data = ref(props.filterResult);

const router = useRouter();
const authStore = useAuthStore();

const showModal = ref(false);
const modalMessage = ref('');

const toggleLike = (index) => {
  if (authStore.token) {
    authStore.addFavorite(data.value[index]);
    data.value[index].liked = !data.value[index].liked;
    modalMessage.value = data.value[index].liked
      ? 'Casa agregada a sus favoritos'
      : 'Casa eliminada de sus favoritos';
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
  <HeaderHome />
  <MoreFilters class="mt-16 mb-2 pt-8" />

  <v-container class="text-left" v-if="data.length > 0">
    <v-row>
      <v-col
        v-for="(casa, index) in data"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card>
          <v-img :src="casa1" class="white--text align-end">
            <v-card-title class="text-white nombre">
              {{ casa.descripcion }}
            </v-card-title>
            <v-btn icon class="like-btn" @click="toggleLike(index)">
              <v-icon :color="casa.liked ? 'red' : 'grey'">
                mdi-heart
              </v-icon>
            </v-btn>
          </v-img>
          <v-card-subtitle class="mt-4">
            ${{ casa.precioNoche }} / noche
          </v-card-subtitle>
          <v-card-actions>
            <v-btn @click="viewMoreDetails(casa)" class="text-purple">
              Ver más detalles
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-container v-else class="mt-16 d-flex flex-column align-center">
    <v-alert class="mb-6">
      No hay casas para mostrar
    </v-alert>
    <v-btn color="success" @click="router.push('/')">Volver al inicio</v-btn>
  </v-container>

  <v-dialog v-model="showModal" max-width="400">
    <v-card class="d-flex flex-column align-center pa-4">
      <v-card-title class="text-wrap text-center">
        {{ modalMessage }}
      </v-card-title>
      <v-card-actions>
        <v-btn @click="showModal = false" color="purple lighten-1" variant="elevated">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
</style>
