<template>
  <v-app-bar app elevation="4" id="header">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="mobile" id="menu-wrapper"></v-app-bar-nav-icon>
    <v-toolbar-title id="title">VILLA</v-toolbar-title>

    <div v-show="mobile === false">
      <v-btn text>
        <a href="#">Alquila tu casa</a>
      </v-btn>
      
      <v-btn text>
        <a href="#">Servicios</a>
      </v-btn>
      
      <v-btn text>
        <a href="#">Destinos</a>
      </v-btn>
      
      <v-btn text>
        <a href="#">Contacto</a>
      </v-btn>
      
      <v-btn icon>
        <v-icon class="text-white">mdi-account</v-icon>
      </v-btn>
      
      <v-btn variant="tonal" class="mr-4 ml-2 text-white">
        Reservar
      </v-btn>
    </div>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app temporary>
    <v-list dense>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title>Alquila tu casa</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title>Servicios</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title>Destinos</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title>Contacto</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
      </v-list-item>
      
      <v-list-item link class="p-4">
        <v-list-item-content>
          <v-btn>
            Reservar
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue';
  const drawer = ref(false);
  const mobile = ref(false);
  const checkIfMobile= () =>{
    mobile.value = window.innerWidth <= 768;
  }

  onMounted(() =>{
    checkIfMobile()
  })

  window.addEventListener('resize', checkIfMobile)

  onBeforeUnmount(()=>{
    window.removeEventListener('resize', checkIfMobile)
  })
 
</script>

<style scoped>
#header{
  background: url("../assets/gradient.png");
  background-size: cover;
}
a, #title, #menu-wrapper, #btn{
  color: white;
  text-decoration: none;
}
</style>
