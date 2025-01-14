<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const icons = [
  'mdi-facebook',
  'mdi-twitter',
  'mdi-linkedin',
  'mdi-instagram',
]

function goToTerms(){
  router.push('/terms')
}

function goToRegisterGestor(){
    router.push('/registerGestor')
}

</script>

<template>
  <div id="foot">
    <v-footer class=" text-center d-flex flex-column mt-16 bg-purple">
      <div>
        <h2 class="text-uppercase mt-6">Alquileres Villa</h2>
      </div>

      <v-container class="bg-transparent d-flex flex-column justify-center align-content-center flex-wrap">
        <v-list class="bg-transparent d-flex flex-row flex-wrap justify-center">
          <v-list-item link @click="goToRegisterGestor">
            Alquila tu casa
          </v-list-item>
          <v-list-item link @click="goToTerms">
            Terminos y condiciones
          </v-list-item>
        </v-list>

        <div class="mb-16">
          <v-btn v-for="icon in icons" :key="icon" :icon="icon" class="mx-4" variant="text"></v-btn>
        </div>
      </v-container>

      <div class="opacity-40">
        Copyright © {{ new Date().getFullYear() }} All rights reserved
      </div>
    </v-footer>
  </div>
</template>
