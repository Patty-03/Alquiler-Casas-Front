<template>
  <div class="pa-10">
    <h1 class="text-uppercase text-center">Alquileres cerca de ti</h1>
  
  <v-container>
    <v-row>
      <v-col 
        v-for="(casa, index) in casas" 
        :key="index" 
        cols="12" 
        sm="6" 
        md="4" 
        lg="3"
      >
        <v-card>
          <v-img 
            :src="casa.fotos"
            class="white--text align-end"
          >
            <v-card-title class="text-white nombre">{{ casa.nombre }}</v-card-title>
            <v-btn icon class="like-btn" @click="toggleLike(index)">
              <v-icon :color="casa.liked ? 'red' : 'grey'">mdi-heart</v-icon>
            </v-btn>
          </v-img>
          <v-card-subtitle class="mt-4">${{ casa.precio }} / noche</v-card-subtitle>
          <v-card-actions>
            <v-btn @click="viewMoreDetails(casa)" class="text-purple">Ver más detalles</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </div>
    
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import casa1 from '../../assets/casa1.jpg'
  import casa2 from '../../assets/casa2.jpg'
  import casa3 from '../../assets/casa3.jpg'
  import casa4 from '../../assets/casa4.jpg'
  
  const casas = ref([
  {
    nombre: "Casa Rachel",
    fotos: casa1,
    precio: 50.00,
    servicios: [
      'Mascotas', 'Aire acondicionado', 'Area de fumadores', 'Agua caliente', 'Vistas al mar'
    ],
    habitaciones: 4,
    normas: "No miren huecos. Solo digo",
    liked: false
  },
  {
    nombre: "Alquiler Pepo",
    fotos: casa2,
    precio: 60.00,
    servicios: [
      'Mascotas', 'Aire acondicionado', 'Agua caliente'
    ],
    habitaciones: 2,
    normas: "Fumar es malo señores",
    liked: false
  },
  {
    nombre: "Nayla's Rent",
    fotos: casa3,
    precio: 45.00,
    servicios: [
      'Aire acondicionado', 'Area de fumadores', 'Agua caliente'
    ],
    habitaciones: 4,
    normas: "No hay desayuno mi gente. Comprense el suyo",
    liked: false
  },
  {
    nombre: "Maria & Lalo",
    fotos: casa4,
    precio: 90.00,
    servicios: [
      'Apagon de 4h'
    ],
    habitaciones: 8,
    normas: "Pongan ventilador pa que no les piquen los mosquitos",
    liked: false
  },
  {
    nombre: "Villa Sunset",
    fotos: casa1,
    precio: 75.00,
    servicios: [
      'Piscina', 'WiFi', 'Aire acondicionado', 'Desayuno incluido', 'Vistas al mar'
    ],
    habitaciones: 3,
    normas: "Prohibido hacer fiestas.",
    liked: false
  },
  {
    nombre: "Bungalow Tranquilo",
    fotos: casa2,
    precio: 55.00,
    servicios: [
      'Mascotas', 'Aire acondicionado', 'Parqueo gratis', 'Cocina equipada', 'Bicicletas disponibles'
    ],
    habitaciones: 2,
    normas: "Respeto al horario de silencio después de las 10 PM.",
    liked: false
  },
  {
    nombre: "Casa Tropical",
    fotos: casa3,
    precio: 65.00,
    servicios: [
      'Piscina', 'WiFi', 'Aire acondicionado', 'Barbacoa', 'Proximidad a la playa'
    ],
    habitaciones: 4,
    normas: "No se permiten mascotas.",
    liked: false
  },
  {
    nombre: "Suite del Mar",
    fotos: casa4,
    precio: 100.00,
    servicios: [
      'Spa', 'WiFi', 'Jacuzzi', 'Vistas al mar', 'Desayuno incluido'
    ],
    habitaciones: 2,
    normas: "Prohibido fumar dentro de la suite.",
    liked: false
  }
  ]);
  
  const toggleLike = (index) => {
    casas.value[index].liked = !casas.value[index].liked;
  };
  
  //ARREGLAR ESTO
  const viewMoreDetails = (index) => {
    router.push({ path: '/casa/:id', params: { id: index, } });
  };
  </script>
  
  <style scoped>
  .like-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .nombre{
    text-shadow: 2px 2px 4px black;
  }
  </style>
  