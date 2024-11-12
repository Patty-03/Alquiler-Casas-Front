<template>
    <div class="pa-10">
      <h1 class="mt-10 text-uppercase pb-10">Servicios que te acomodan</h1>
  
      <v-list lines="one" class="d-flex flex-row flex-wrap">
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-content class="item rounded-pill">
            <v-icon class="icon">mdi-{{item.icon}}</v-icon>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  let items = ref([ 
    { icon: 'paw', text: 'Mascotas' }, 
    { icon: 'water', text: 'Agua caliente' }, 
    { icon: 'air-conditioner', text: 'Aire acondicionado'},
    { icon: 'smoking', text: 'Area de fumadores'},
    {icon: 'television', text: 'Television por cable'},
    {icon: 'parking', text: 'Parking'},
    {icon: 'pool', text: 'Piscina'},  
    ]);
  </script>
  
  <style scoped>
  .mt-10 {
    margin-top: 10px;
  }

  .item{
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }
  </style>
  