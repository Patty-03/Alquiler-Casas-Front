<template>
    <v-app>
      <LateralPanel />
      <main>
        <RouterView/>
      </main>
    </v-app>
  </template>
  
  <script setup>
  import { RouterView } from 'vue-router';
import LateralPanel from '../components/gestorBackOffice/LateralPanel.vue';
  </script>
  