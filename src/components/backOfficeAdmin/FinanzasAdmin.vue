<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { getGananciasTotales } from '../../functions';

const gananciasTotales = ref(0)
const gananciasMensuales = ref(0)

/*onMounted(async  () => {
    try {
        gananciasTotales.value = await getGananciasTotales()
        gananciasMensuales.value = await getGananciasMensuales()
    } catch (error) {
        console.error('Error al obtener las ganancias:', error);
    }
});*/
</script>

<template>
    <v-container class="d-flex flex-column align-center justify-space-around">
        <v-card class="pa-8 ma-6" color="primary" width="300">
            <div>${{ gananciasTotales }}</div>
            <v-card-title primary-title>
                Ganancias totales
            </v-card-title>
        </v-card>

        <v-card class="pa-8" color="green" width="300">
            <div>${{ gananciasMensuales }}</div>
            <v-card-title primary-title>
                Promedio mensual
            </v-card-title>
        </v-card>

        <v-container>

        </v-container>
    </v-container>


</template>
