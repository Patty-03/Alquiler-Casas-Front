<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const drawer = ref(false);
const dialog = ref(false);
const router = useRouter()

const isMobile = ref(window.innerWidth < 600);

onMounted(() => {
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 600;
  });
});
</script>

<template>
  <v-app>
    <v-navigation-drawer v-if="!isMobile" color="purple lighten-1" permanent width="150" >
      <v-list class="mt-16">
        <v-list-item>
          <v-btn variant="text" @click="router.push('/anunciosGestor')">Anuncios</v-btn>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn variant="text" @click="router.push('/finanzasGestor')">Finanzas</v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn variant="text" @click="router.push('/reservasGestor')">Reservas</v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn variant="text" @click="router.push('/ajustesGestor')">Ajustes</v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

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
  </v-app>
</template>
