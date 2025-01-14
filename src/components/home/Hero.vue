<template>
    <v-parallax :src="img" height="100vh">
      <div class="d-flex flex-column fill-height justify-center align-center text-white">
        <h1 class="title text-center text-uppercase mb-4">Encuentra tu casa soñada</h1>
        <Filter></Filter>
      </div>
    </v-parallax>
  </template>
  
  <script setup>
  import Filter from './Filter.vue';
  import img from '../../assets/hero-photo.jpg'
  </script>