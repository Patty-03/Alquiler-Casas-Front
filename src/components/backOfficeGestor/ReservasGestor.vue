<script setup>
import { onMounted, ref } from 'vue';
import { getHouseById, getReservations } from '../../functions';

const reservations = ref([]);
const houses = ref({}); // Guardará los nombres de las casas

async function fetchHouseName(idCasa) {
    if (!houses.value[idCasa]) { 
        try {
            const house = await getHouseById(idCasa);
            houses.value[idCasa] = house.nombre; // Guarda el nombre
        } catch (error) {
            console.error(`Error obteniendo la casa ${idCasa}:`, error);
            houses.value[idCasa] = 'Desconocida'; // Si falla, muestra "Desconocida"
        }
    }
}

onMounted(async () => {
    try {
        const userId = localStorage.getItem('userId');
        reservations.value = await getReservations(userId);

        // Obtener nombres de casas de forma asíncrona
        await Promise.all(reservations.value.map(res => fetchHouseName(res.idCasa)));
    } catch (error) {
        console.log(error);
    }
});
</script>

<template>
    <v-container v-if="reservations.length === 0">
        <v-alert>
            No hay datos para mostrar
        </v-alert>
    </v-container>
    <v-table class="mt-10 pa-10" v-else>
        <thead>
            <tr>
                <th>ID</th>
                <th>Casa</th>
                <th>Cliente</th>
                <th>Huéspedes</th>
                <th>Fecha de entrada</th>
                <th>Fecha de salida</th>
                <th>Costo total</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in reservations" :key="item.idReservacion">
                <td>{{ item.idReservacion }}</td>
                <td>{{ houses[item.idCasa] || 'Cargando...' }}</td>
                <td>{{ item.idUsuario }}</td>
                <td>{{ item.cantPersonas }}</td>
                <td>{{ item.fechaEntrada }}</td>
                <td>{{ item.fechaSalida }}</td>
                <td>$ {{ item.costoTotal }}.00</td>
            </tr>
        </tbody>
    </v-table>
</template>
