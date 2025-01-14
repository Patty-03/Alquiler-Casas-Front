<script setup>
import { onMounted, ref } from 'vue';
import { getCiudades } from '../../functions';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();

const items = ref([]); // Ciudades disponibles

const house = ref({
  idCiudad: '',
  idUsuario: authStore.$id,
  descripcion: '',
  precioNoche: 0.0,
  precioMes: 0.0,
  areaTotal: 0.0,
  nombre: '',
  direccion: '',
  caracteristicasDTO: {
    cantMaxPersonas: 0,
    cantHabitaciones: 0,
    cantBanos: 0,
    cantCuartos: 0,
    cocina: true,
    terraza_balcon: true,
    barbacoa: true,
    garaje: true,
    piscina: true,
    gimnasio: true,
    lavadora_secadora: true,
    tv: true,
    permiteMenores: true,
    permiteFumar: true,
    permiteMascotas: true,
    wifi: true,
    aguaCaliente: true,
    climatizada: true,
  },
  fotos: '',
});

async function ciudades() {
  try {
    const ciudadesData = await getCiudades();
    items.value = ciudadesData.map((ciudad) => ({
      id: ciudad.id,
      nombre: ciudad.ciudad,
    }));
  } catch (error) {
    console.error('Error al cargar las ciudades', error);
  }
}

onMounted(() => {
  ciudades();
});
</script>

<template>
  <v-container>
    <v-expansion-panels accordion>
      <!-- Paso 1: Información General -->
      <v-expansion-panel>
        <v-expansion-panel-title>Paso 1: Información general</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-text-field v-model="house.nombre" label="Nombre de la propiedad" outlined />
          <v-select
            v-model="house.idCiudad"
            :items="items"
            item-title="nombre"
            item-value="id"
            label="Ciudad"
            outlined
          />
          <v-text-field v-model="house.direccion" label="Dirección" outlined />
          <v-textarea v-model="house.descripcion" label="Descripción" rows="4" outlined />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- Paso 2: Precios y Área -->
      <v-expansion-panel>
        <v-expansion-panel-title>Paso 2: Precios y área</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-text-field
            v-model="house.precioNoche"
            label="Precio por noche"
            type="number"
            outlined
          />
          <v-text-field
            v-model="house.precioMes"
            label="Precio por mes"
            type="number"
            outlined
          />
          <v-text-field
            v-model="house.areaTotal"
            label="Área total (m²)"
            type="number"
            outlined
          />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- Paso 3: Características numéricas -->
      <v-expansion-panel>
        <v-expansion-panel-title>Paso 3: Características numéricas</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="house.caracteristicasDTO.cantMaxPersonas"
                label="Cantidad máxima de personas"
                type="number"
                outlined
              />
              <v-text-field
                v-model="house.caracteristicasDTO.cantHabitaciones"
                label="Cantidad de habitaciones"
                type="number"
                outlined
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="house.caracteristicasDTO.cantBanos"
                label="Cantidad de baños"
                type="number"
                outlined
              />
              <v-text-field
                v-model="house.caracteristicasDTO.cantCuartos"
                label="Cantidad de cuartos"
                type="number"
                outlined
              />
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- Paso 4: Características booleanas -->
      <v-expansion-panel>
        <v-expansion-panel-title>Paso 4: Características adicionales</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="6">
              <v-checkbox v-model="house.caracteristicasDTO.cocina" label="Cocina" />
              <v-checkbox
                v-model="house.caracteristicasDTO.terraza_balcon"
                label="Terraza/Balcón"
              />
              <v-checkbox v-model="house.caracteristicasDTO.barbacoa" label="Barbacoa" />
              <v-checkbox v-model="house.caracteristicasDTO.garaje" label="Garaje" />
              <v-checkbox v-model="house.caracteristicasDTO.piscina" label="Piscina" />
              <v-checkbox v-model="house.caracteristicasDTO.gimnasio" label="Gimnasio" />
              <v-checkbox
                v-model="house.caracteristicasDTO.lavadora_secadora"
                label="Lavadora/Secadora"
              />
            </v-col>
            <v-col cols="6">
              
              <v-checkbox v-model="house.caracteristicasDTO.tv" label="Televisión" />
              <v-checkbox
                v-model="house.caracteristicasDTO.permiteMenores"
                label="Permite menores"
              />
              <v-checkbox
                v-model="house.caracteristicasDTO.permiteFumar"
                label="Permite fumar"
              />
              <v-checkbox
                v-model="house.caracteristicasDTO.permiteMascotas"
                label="Permite mascotas"
              />
              <v-checkbox v-model="house.caracteristicasDTO.wifi" label="WiFi" />
              <v-checkbox v-model="house.caracteristicasDTO.aguaCaliente" label="Agua caliente" />
              <v-checkbox
                v-model="house.caracteristicasDTO.climatizada"
                label="Climatizada"
              />
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- Paso 5: Fotos -->
      <v-expansion-panel>
        <v-expansion-panel-title>Paso 5: Fotos</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-file-input
            v-model="house.fotos"
            label="Subir fotos"
            accept="image/*"
            multiple
            outlined
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
