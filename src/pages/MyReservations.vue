<script setup>
import HeaderHome from '../components/home/HeaderHome.vue';
import Footer from '../components/commons/Footer.vue'
import { ref, onMounted } from 'vue';
import { getClientReservations, getHouseById } from '../functions.js';

const reservations = ref([]);
const houses = ref({}); 
const errorMessage = ref("");
const loading = ref(true);

// Función para obtener el nombre de una casa
async function fetchHouseName(idCasa) {
  if (!houses.value[idCasa]) { 
    try {
      const house = await getHouseById(idCasa);
      houses.value[idCasa] = house.nombre;
    } catch (error) {
      console.error(`Error obteniendo la casa ${idCasa}:`, error);
      houses.value[idCasa] = 'Desconocida'; 
    }
  }
}

async function fetchReservations() {
  try {
    const data = await getClientReservations();
    reservations.value = data;

    await Promise.all(data.map(res => fetchHouseName(res.idCasa)));
  } catch (error) {
    errorMessage.value = "Error al cargar las reservaciones.";
    console.error(error);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchReservations);
</script>

<template>
  <HeaderHome />

  <main>
    <v-container class="mt-16">
      <v-alert v-if="errorMessage" type="error" outlined>{{ errorMessage }}</v-alert>

      <div v-if="loading">
        <v-skeleton-loader type="card"></v-skeleton-loader>
      </div>

      <div v-else>
        <div v-if="reservations.length === 0">
          <v-alert type="info" outlined>No hay reservaciones para mostrar.</v-alert>
        </div>

        <div v-else>
          <div v-for="(resList, houseId) in reservations.reduce((groups, res) => {
            const idCasa = res.idCasa;
            groups[idCasa] = groups[idCasa] || [];
            groups[idCasa].push(res);
            return groups;
          }, {})" :key="houseId" class="mb-10">
            <h4 class="mb-4">Casa: {{ houses[houseId] || 'Cargando...' }}</h4>

            <v-row>
              <v-col v-for="reservation in resList" :key="reservation.idReservacion" cols="12" sm="6" md="4">
                <v-card class="mb-4">
                  <v-card-title>
                    Reservación #{{ reservation.idReservacion }}
                  </v-card-title>
                  <v-card-subtitle>
                    Usuario ID: {{ reservation.idUsuario }}
                  </v-card-subtitle>
                  <v-card-text>
                    <div><strong>Cantidad de Personas:</strong> {{ reservation.cantPersonas }}</div>
                    <div><strong>Fecha Entrada:</strong> {{ reservation.fechaEntrada }}</div>
                    <div><strong>Fecha Salida:</strong> {{ reservation.fechaSalida }}</div>
                    <div><strong>Costo Total:</strong> ${{ reservation.costoTotal }}</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
    </v-container>
  </main>

  <Footer></Footer>
</template>