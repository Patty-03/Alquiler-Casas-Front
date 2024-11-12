<script setup>
import Header from './Header.vue'
import { useRoute, useRouter } from 'vue-router'; 
const route = useRoute(); 
const casa = route.params.data;
</script>

<template>
    <Header></Header>

    <v-container>
        <v-card>
            <v-img :src="casa.fotos" class="white--text align-end">
                <v-card-title class="text-white">{{ casa.nombre }}

                </v-card-title>
            </v-img>
            <v-card-subtitle class="mt-4">${{ casa.precio }} /
                noche
            </v-card-subtitle>
            <v-card-text>
                <h3>Servicios:</h3>
                <ul>
                    <li v-for="(servicio, index) in casa.servicios" :key="index">{{ servicio }}</li>
                </ul>
                <h3>Habitaciones: {{ casa.habitaciones }}</h3>
                <h3>Normas:</h3>
                <p>{{ casa.normas }}</p>
            </v-card-text> </v-card> </v-container>
</template>