<template>
  <div class="pa-10">
    <h1 class="mt-16 text-uppercase">Explora los más bellos destinos de Cuba</h1>
 
    <v-container class="d-flex flex-row align-center">
      <v-row>
        <v-col v-for="(place, i) in places" :key="i" cols="12" sm="6" md="4">
          <v-card>
            <v-img :src="place.url" class="white--text image">
              <p class="text-center name text-uppercase text-subtitle-1">{{ place.nombre }}</p>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import havanaImage from '../assets/havana.png';
import stgoImage from '../assets/stgo.png';
import trinidadImage from '../assets/trinidad.png';
import varaderoImage from '../assets/varadero.png';

const places = ref([
  {
    url: havanaImage,
    nombre: 'Havana'
  },
  {
    url: stgoImage,
    nombre: 'Santiago de Cuba'
  },
  {
    url: trinidadImage,
    nombre: 'Trinidad'
  },
  {
    url: varaderoImage,
    nombre: 'Varadero'
  }
]);
</script>

<style scoped>
.pa-10 {
  padding: 10px;
}

.mt-16 {
  margin-top: 16px;
}

.v-card {
  margin: 10px;
}

.name{
  transform: translateY(10rem);
  font-weight: bold;
  text-shadow: 4px 8px 4px rgb(0, 0, 0);
}

.white--text {
  color: white;
}

.image{
  filter: grayscale(1);
  transition: all 0.5s ease;
}

.image:hover{
  filter: grayscale(0);
  transform: scale(0.9);
}
</style>
