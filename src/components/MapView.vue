<template>
    <v-container>
      <div class="map-container">
        <img src="../assets/Mapa.PNG" alt="Mapa" class="map-image rounded-pill" />
        <v-btn
          icon
          class="map-marker"
          :style="{ top: markerPosition.y + '%', left: markerPosition.x + '%' }"
        >
          <v-icon color="red">mdi-map-marker</v-icon>
        </v-btn>
      </div>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const markerPosition = ref({ x: 50, y: 50 });
  </script>
  
  <style scoped>
  .map-container {
    position: relative;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
  
  .map-image {
    width: 100%;
    display: block;
  }
  
  .map-marker {
    position: absolute;
    transform: translate(-50%, -100%); /* Ajusta para centrar el marcador */
  }
  </style>
  