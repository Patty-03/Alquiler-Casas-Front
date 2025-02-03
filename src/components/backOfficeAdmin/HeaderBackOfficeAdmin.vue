<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const isMobile = ref(window.innerWidth < 780);

const router = useRouter()

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

            <v-btn variant="text" @click="router.push('/anunciosAdmin')">
                Anuncios
            </v-btn>
            <v-btn variant="text" @click="router.push('/finanzasAdmin')">
                Finanzas
            </v-btn>
            <v-btn variant="text" @click="router.push('/usuariosAdmin')">
                Usuarios
            </v-btn>
            <v-btn variant="text" @click="router.push('/ajustesAdmin')">
                Ajustes
            </v-btn>
        </v-app-bar>
        <v-bottom-navigation v-else mode="shift" bg-color="purple">
            <v-btn value="anuncios" @click="router.push('/anunciosAdmin')">
                <v-icon>mdi-bullhorn</v-icon>
                <span>Anuncios</span>
            </v-btn>
            <v-btn value="finanzas" @click="router.push('/finanzasAdmin')">
                <v-icon>mdi-currency-usd</v-icon>
                <span>Finanzas</span>
            </v-btn>
            <v-btn value="usuarios" @click="router.push('/usuariosAdmin')">
                <v-icon>mdi-account</v-icon>
                <span>Usuarios</span>
            </v-btn>
            <v-btn value="ajustes" @click="router.push('/ajustesAdmin')">
          <v-icon>mdi-cog</v-icon>
          <span>Ajustes</span>
        </v-btn>
      </v-bottom-navigation>
    </v-container>
  </template>