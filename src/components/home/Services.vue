<template>
  <div class="pa-10">
    <h1 class="mt-10 text-uppercase pb-10 text-center">Servicios que te acomodan</h1>
  
    <v-list class="d-flex flex-row flex-wrap justify-center">
      <v-list-item v-for="(item, index) in items" :key="index" class="service-card" link>
        <v-card class="d-flex flex-column align-center pa-4 text-wrap">
          <v-icon class="icon" size="36" color="purple" @click="filterByService(item.text)">mdi-{{item.icon}}</v-icon>
          <v-list-item-title class="mt-2">{{ item.text }}</v-list-item-title>
        </v-card>
      </v-list-item>
    </v-list>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import router from '../../routes/router';
import FilterResults from '../../pages/FilterResults.vue';
  
let items = ref([
  { icon: 'paw', text: 'Mascotas' }, 
  { icon: 'water', text: 'Agua caliente' }, 
  { icon: 'air-conditioner', text: 'Climatizacion'},
  { icon: 'television', text: 'Televisión'},
  { icon: 'parking', text: 'Parking'},
  { icon: 'pool', text: 'Piscina'},  
]);

function filterByService(text){
  router.push({name: 'FilterResults', params: { text }})
}
</script>
  
<style scoped>
.mt-10 {
  margin-top: 10px;
}

.pa-10 {
  padding: 20px;
}

.pb-10 {
  padding-bottom: 20px;
}

.icon {
  margin-bottom: 10px;
}

.service-card {
  width: 150px;
  margin: 10px;
}

.service-card:hover {
  transform: scale(1.05);
  transition: transform 0.2s;
}

.text-center {
  text-align: center;
}

.d-flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.align-center {
  align-items: center;
}

.pa-4 {
  padding: 16px;
}
</style>
