<template>
    <main>
        <Header></Header>
    </main>
    
    <v-list v-for="(item, index) in casas" :key="index">
        <v-list-item>
            <p>{{ casas.descripcion }}</p>
        </v-list-item>
    </v-list>

    <Footer></Footer>
</template>

<script setup>
import Header from '../components/commons/Header.vue'
import Footer from '../components/commons/Footer.vue';
import axios from 'axios';

async function renderHouses() {
    try{
        const response = axios.get('http://localhost:5048/casas/listaCasas')
        const casas = response.data
    }
    catch{
        console.log("Error al obtener las casas: ", error);
        
    }
}
</script>