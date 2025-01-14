<script setup>
import HeaderHome from '../components/home/HeaderHome.vue'
import Footer from '../components/commons/Footer.vue'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getHouseById } from '../functions.js'
import Availability from '../components/houseDetails/Availability.vue'
import casa1 from '../assets/casa1.jpg'


const route = useRoute();
const house = ref(null);
const entryValue = ref(new Date())
const outValue = ref(new Date())
const foto = ref('')
const amountOfDays = ref(0)

onMounted(async () => {
  const id = route.params.id;
  house.value = await getHouseById(id);
  foto.value = house.value.fotosURL[0]
});


</script>

<template>
  <v-app>
    <header class="mb-16">
      <HeaderHome></HeaderHome>
    </header>

    <main class="mt-8 text-left" v-if="house">
      <v-img :src="foto" class="mb-10 img d-flex align-center justify-center" cover>
      </v-img>
      <v-container class="pa-4">
        <h2 class="text-wrap">{{ house.nombre }}</h2>
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
              <v-icon class="mr-2">mdi-human</v-icon> max. {{ house.caracteristicas.cantMaxPersonas }} personas
            </v-col>
            <v-col class="d-flex flex-row align-center justify-center opacity-80">
              <v-icon class="mr-2">mdi-door-open</v-icon> habitaciones: {{ house.caracteristicas.cantMaxPersonas }}
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
            <Availability v-model:entryValue="entryValue" v-model:outValue="outValue" />
          </v-row>
        </v-container>
        <v-divider></v-divider>

        <v-container>
          <v-row class="d-flex flex-wrap">
            <v-col>
              <h3 class="mb-4">Metodos de pago</h3>
              <p>Presencial por el momento (Falta integracion con plataformas de pago)</p>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>

        <v-container>
          <v-row class="d-flex flex-wrap">
            <v-col>
              <h3>Costo total</h3>
          
            </v-col>
            
          </v-row>
        </v-container>


      </v-container>
    </main>
    <main v-else class="mt-8 pl-6 pr-6 text-left">
      <h2>Cargando detalles de la casa...</h2>
    </main>

    <Footer></Footer>
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
