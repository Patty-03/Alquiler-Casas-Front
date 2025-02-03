<script setup>
import HeaderBackOffice from '../backOfficeGestor/HeaderBackOffice.vue'
import { ref, onMounted, computed, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import { createReservation, getHouseById, convertToFullPath } from '../../functions.js'
import Availability from '../houseDetails/Availability.vue'
import casa1 from '../../assets/casa1.jpg'
import router from '../../routes/router.js'

const isReservationOk = ref(false)
const isReservationOkMessage = ref("")
const route = useRoute();
const house = ref(null);
const entryValue = ref(new Date());
const outValue = ref(new Date());
const foto = ref("http://localhost:5048/wwwroot/fotos/09153723-857b-4316-b0bf-9209bc7aff96.jpg");
const amountOfDays = ref(0);
const reserv = ref(false);
const totalCost = ref(0); // Variable reactiva para el costo total

const formattedEntryDay = computed(() => {
    return entryValue.value.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
});

const formattedOutDay = computed(() => {
    return outValue.value.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
});

onMounted(async () => {
    const id = route.params.id;
    house.value = await getHouseById(id);
    foto.value = house.value.fotosURL[0];
});

const reservation = ref({
    idUsuario: localStorage.getItem('userId'),
    idCasa: route.params.id,
    cantPersonas: 0,
    fechaEntrada: "",
    fechaSalida: ""
});


// Función para manejar el costo total emitido
const handleTotalCost = (cost) => {
    totalCost.value = cost;
};
</script>

<template>
    <v-app>
        <header class="mb-16">
            <HeaderBackOffice></HeaderBackOffice>
        </header>

        <main class="mt-8 text-left" v-if="house">
            <h2 class="text-center mb-6">Detalles de la casa</h2>
            <v-img :src="house.fotosURL && house.fotosURL.length > 0 ? convertToFullPath(house.fotosURL[0]) : casa1"
                class="mb-10 img d-flex align-center justify-center" cover>
            </v-img>
            <v-container class="pa-4">
                <h2 class="text-wrap mb-2">{{ house.nombre }}</h2>
                <h3 class="opacity-80 mb-2+">{{ house.descripcion }}</h3>
                <v-divider class="mb-4"></v-divider>
                <h3 class="opacity-80">${{ house.precioNoche }} / noche</h3>
                <h3 class="opacity-80">{{ house.ciudad }}</h3>
                <v-divider class="mt-4"></v-divider>

                <v-container>
                    <v-row class="d-flex flex-wrap">
                        <v-col>
                            <h3>Informacion adicional</h3>
                        </v-col>

                        <v-col class="d-flex flex-row align-center justify-center opacity-80">
                            <v-icon class="mr-2">mdi-human</v-icon> max. {{ house.caracteristicas.cantMaxPersonas }}
                            personas
                        </v-col>
                        <v-col class="d-flex flex-row align-center justify-center opacity-80">
                            <v-icon class="mr-2">mdi-door-open</v-icon> habitaciones: {{
                                house.caracteristicas.cantMaxPersonas }}
                        </v-col>
                        <v-col class="d-flex flex-row align-center justify-center opacity-80">
                            <v-icon class="mr-2">mdi-ruler-square</v-icon> {{ house.areaTotal }} m²
                        </v-col>
                    </v-row>
                </v-container>
                <v-divider></v-divider>

                <v-container>
                    <v-row class="d-flex flex-wrap">
                        <v-col>
                            <h3>Que esta incluido</h3>
                        </v-col>
                    </v-row>
                    <v-row class="d-flex flex-wrap justify-space-around align-center">
                        <v-col class="opacity-80" v-if="house.caracteristicas.cocina">
                            <v-icon>mdi-stove</v-icon>
                            <p>Cocina</p>
                        </v-col>
                        <v-col class="opacity-80" v-if="house.caracteristicas.terraza_balcon">
                            <v-icon>mdi-balcony</v-icon>
                            <p>Terraza/Balcon</p>
                        </v-col>

                        <v-col class="opacity-80" v-if="house.caracteristicas.barbacoa">
                            <v-icon>mdi-grill</v-icon>
                            <p>Barbacoa</p>
                        </v-col>

                        <v-col class="opacity-80" v-if="house.caracteristicas.garaje">
                            <v-icon>mdi-parking</v-icon>
                            <p>Garaje</p>
                        </v-col>
                        <v-col class="opacity-80" v-if="house.caracteristicas.piscina">
                            <v-icon>mdi-pool</v-icon>
                            <p>Piscina</p>
                        </v-col>
                        <v-col class="opacity-80" v-if="house.caracteristicas.gimnasio">
                            <v-icon>mdi-weight-lifter</v-icon>
                            <p>Gimnasio</p>
                        </v-col>
                        <v-col class="opacity-80" v-if="house.caracteristicas.lavadora_secadora">
                            <v-icon>mdi-washing-machine</v-icon>
                            <p>Lavadora</p>
                        </v-col>
                        <v-col class="opacity-80" v-if="house.caracteristicas.tv">
                            <v-icon>mdi-television</v-icon>
                            <p>TV</p>
                        </v-col>
                        <v-col class="opacity-80" v-if="house.caracteristicas.permiteMenores">
                            <v-icon>mdi-teddy-bear</v-icon>
                            <p>Permite menores</p>
                        </v-col>
                        <v-col class="opacity-80" v-if="house.caracteristicas.permiteFumar">
                            <v-icon>mdi-smoking</v-icon>
                            <p>Permite fumar</p>
                        </v-col>
                        <v-col class="opacity-80" v-if="house.caracteristicas.permiteMascotas">
                            <v-icon>mdi-paw</v-icon>
                            <p>Permite Mascotas</p>
                        </v-col>
                        <v-col class="opacity-80" v-if="house.caracteristicas.wifi">
                            <v-icon>mdi-wifi</v-icon>
                            <p>Wifi</p>
                        </v-col>
                        <v-col class="opacity-80" v-if="house.caracteristicas.aguaCaliente">
                            <v-icon>mdi-water-thermometer</v-icon>
                            <p>Agua caliente</p>
                        </v-col>
                        <v-col class="opacity-80" v-if="house.caracteristicas.climatizada">
                            <v-icon>mdi-air-conditioner</v-icon>
                            <p>Climatizacion</p>
                        </v-col>
                    </v-row>
                </v-container>
                <v-divider></v-divider>

                <v-container>
                    <v-row class="d-flex flex-wrap">
                        <v-col>
                            <h3>Disponibilidad</h3>
                        </v-col>
                    </v-row>
                    <v-row>
                        <!-- Captura el evento update:totalCost y actualiza totalCost -->
                        <Availability v-model:entryValue="entryValue" v-model:outValue="outValue"
                            @update:totalCost="handleTotalCost" />
                    </v-row>
                </v-container>
                <v-divider></v-divider>
                <v-container>
                    <v-row class="d-flex flex-row justify-center">
                        <v-btn color="success" class="mb-16" @click="router.push('/gestor')">Volver Atras</v-btn>
                    </v-row>
                </v-container>

            </v-container>
        </main>
        <main v-else class="mt-8 pl-6 pr-6 text-left">
            <h2>Cargando detalles de la casa...</h2>
        </main>
    </v-app>
</template>

<style scoped>
h1 {
    font-size: 45px;
}

.item {
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
}

.img {
    height: 80vh;
}
</style>