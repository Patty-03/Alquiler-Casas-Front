<script setup>
import MapView from './MapView.vue';

const icons = [
  'mdi-facebook',
  'mdi-twitter',
  'mdi-linkedin',
  'mdi-instagram',
]
</script>

<template>
  <div id="foot">
    <v-footer class=" text-center d-flex flex-column mt-16 bg-purple">
        <div>
            <h1 class="text-uppercase mt-6" >Alquileres Villa</h1>
        </div>

        <v-container class="bg-transparent d-flex flex-row justify-space-around align-content-center text-justify">
            <v-list class="bg-transparent">
                <h3>Sobre Nosotros</h3>
                <v-list-item link class="rounded-pill">
                    Informacion
                </v-list-item>
                <v-list-item link class="rounded-pill">
                    Alquila tu casa
                </v-list-item>
                <v-list-item link class="rounded-pill">
                    Terminos y condiciones
                </v-list-item>
                <v-list-item link class="rounded-pill">
                    Centro de Ayuda
                </v-list-item>
            </v-list>

            <v-list class="bg-transparent">
                <h3>Contacto</h3>
                <v-list-item link class="rounded-pill">
                    <v-icon>mdi-message</v-icon>
                </v-list-item>
                <v-list-item link class="rounded-pill">
                    <v-icon>mdi-whatsapp</v-icon>
                </v-list-item>
                <v-list-item link class="rounded-pill">
                    <v-icon>mdi-telegram</v-icon>
                </v-list-item>
            </v-list>
            <div>
              <MapView></MapView>
            </div>
        </v-container>

      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          :icon="icon"
          class="mx-4"
          variant="text"
        ></v-btn>
      </div>
  
      <div>
        {{ new Date().getFullYear() }} — <strong>Alquileres Villa. Todos los derechos reservados

        </strong>
      </div>
    </v-footer>
  </div>
  </template>


 

<style scoped>

</style>