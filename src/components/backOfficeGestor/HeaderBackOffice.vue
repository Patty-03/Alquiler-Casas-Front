<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isMobile = ref(window.innerWidth < 780);

onMounted(() => {
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 780;
  });
});
</script>

<template>
  <v-container>
    <v-app-bar v-if="!isMobile" color="purple lighten-1" prominent>
      <v-toolbar-title class="text-uppercase">
        BackOffice
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn variant="text" @click="router.push('/anunciosGestor')" size="x-small">
        Anuncios
      </v-btn>
      <v-btn variant="text" @click="router.push('/finanzasGestor')" size="x-small">
        Finanzas
      </v-btn>
      <v-btn variant="text" @click="router.push('/reservasGestor')" size="x-small">
        Reservas
      </v-btn>
      <v-btn variant="text" @click="router.push('/ajustesGestor')" size="x-small">
        Ajustes
      </v-btn>
    </v-app-bar>
    <v-bottom-navigation v-else mode="shift" bg-color="purple">
      <v-btn value="anuncios" @click="router.push('/anunciosGestor')">
        <v-icon>mdi-bullhorn</v-icon>
        <span>Anuncios</span>
      </v-btn>
      <v-btn value="finanzas" @click="router.push('/finanzasGestor')">
        <v-icon>mdi-currency-usd</v-icon>
        <span>Finanzas</span>
      </v-btn>
      <v-btn value="reservas" @click="router.push('/reservasGestor')">
        <v-icon>mdi-home</v-icon>
        <span>Reservas</span>
      </v-btn>
      <v-btn value="ajustes" @click="router.push('/ajustesGestor')">
        <v-icon>mdi-cog</v-icon>
        <span>Ajustes</span>
      </v-btn>
    </v-bottom-navigation>
  </v-container>
</template>

<style scoped>
.v-app-bar {
  padding: 0 16px; 
}

.v-btn {
  margin: 0 8px;
  font-size: 1rem;
  font-weight: 500;
}

.v-toolbar-title {
  color: white; 
}
</style>