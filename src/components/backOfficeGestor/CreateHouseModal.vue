<script setup>
import { onMounted, ref } from 'vue';
import { getCiudades, createHouse } from '../../functions';
import { useAuthStore } from '../../stores/auth';
import { defineEmits } from 'vue';

const dialog = ref(false);
const emit = defineEmits(['close', 'houseCreated']);

const ciudadesList = ref([]);
const items = ref([]);
const message = ref("");
const selectedCity = ref('');

const house = ref({
  idCiudad: 1,
  // Convertir a número, ya que localStorage devuelve string.
  idUsuario: Number(localStorage.getItem('userId')),
  descripcion: '',
  precioNoche: 1.0,
  precioMes: 1.0,
  areaTotal: 1.0,
  nombre: '',
  direccion: '',
  caracteristicasDTO: {
    cantMaxPersonas: 1,
    cantHabitaciones: 1,
    cantBanos: 1,
    cantCuartos: 1,
    cocina: false,
    terraza_balcon: false,
    barbacoa: false,
    garaje: false,
    piscina: false,
    gimnasio: false,
    lavadora_secadora: false,
    tv: false,
    permiteMenores: false,
    permiteFumar: false,
    permiteMascotas: false,
    wifi: false,
    aguaCaliente: false,
    climatizada: false,
  },
  fotosURL: null,
});

function findHouse(cityName) {
  let found = ref(false);
  let cityId = -1;

  for (let i = 0; i < ciudadesList.value.length && !found.value; i++) {
    if (ciudadesList.value[i].ciudad === cityName) {
      cityId = ciudadesList.value[i].idCiudad;
      found.value = true;
    }
  }
  return cityId;
}

async function create() {
  // Asignar la ciudad seleccionada (convertida a id)
  house.value.idCiudad = findHouse(selectedCity.value);

  if (house.value.idCiudad === -1) {
    alert("Por favor, selecciona una ciudad válida.");
    return;
  }

  console.log("ID de la ciudad a enviar:", house.value.idCiudad);

  // Construimos el FormData
  const formData = new FormData();
  formData.append('idCiudad', house.value.idCiudad);
  formData.append('idUsuario', house.value.idUsuario);
  formData.append('descripcion', house.value.descripcion);
  formData.append('precioNoche', house.value.precioNoche);
  formData.append('precioMes', house.value.precioMes);
  formData.append('areaTotal', house.value.areaTotal);
  formData.append('nombre', house.value.nombre);
  formData.append('direccion', house.value.direccion);

  // Enviar cada propiedad de caracteristicasDTO con notación de punto, ej: caracteristicasDTO.cantMaxPersonas
  for (const [key, value] of Object.entries(house.value.caracteristicasDTO)) {
    formData.append(`caracteristicasDTO.${key}`, value);
  }

  // Enviar los archivos si se han seleccionado (clave "fotos")
  if (house.value.fotosURL) {
    for (let i = 0; i < house.value.fotosURL.length; i++) {
      formData.append('fotos', house.value.fotosURL[i]);
    }
  }

  // Depuración: Mostrar los valores del FormData
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    const response = await createHouse(formData);
    console.log('Casa creada', response)
    message.value = "Casa creada exitosamente";
    dialog.value = true;
  } catch (error) {
    console.error('No se pudo crear la casa:', error);
    message.value = "Error al crear la casa. Intente nuevamente.";
    dialog.value = true;
  }
}

function closeDialog(){
  emit('houseCreated');
  emit('close');
}

async function ciudades() {
  try {
    const ciudadesData = await getCiudades();
    ciudadesList.value = ciudadesData;
    items.value = ciudadesData.map((ciudad) => ciudad.ciudad);
    console.log("Nombres de ciudades para v-select:", items.value);
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
    <v-card class="pa-1">
      <v-card-title primary-title>
        Información de la casa
      </v-card-title>

      <v-expansion-panels accordion>
        <!-- Paso 1: Información General -->
        <v-expansion-panel>
          <v-expansion-panel-title>Paso 1: Información general</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-text-field v-model="house.nombre" label="Nombre de la propiedad" outlined />
            <v-select v-model="selectedCity" :items="items" label="Ciudad" outlined />
            <v-text-field v-model="house.direccion" label="Dirección" outlined />
            <v-textarea v-model="house.descripcion" label="Descripción" rows="4" outlined />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- Paso 2: Precios y Área -->
        <v-expansion-panel>
          <v-expansion-panel-title>Paso 2: Precios y área</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-text-field v-model="house.precioNoche" label="Precio por noche" type="number" outlined />
            <v-text-field v-model="house.precioMes" label="Precio por mes" type="number" outlined />
            <v-text-field v-model="house.areaTotal" label="Área total (m²)" type="number" outlined />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- Paso 3: Características numéricas -->
        <v-expansion-panel>
          <v-expansion-panel-title>Paso 3: Características numéricas</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="house.caracteristicasDTO.cantMaxPersonas" label="Cantidad máxima de personas"
                  type="number" outlined />
                <v-text-field v-model="house.caracteristicasDTO.cantHabitaciones" label="Cantidad de habitaciones"
                  type="number" outlined />
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="house.caracteristicasDTO.cantBanos" label="Cantidad de baños" type="number"
                  outlined />
                <v-text-field v-model="house.caracteristicasDTO.cantCuartos" label="Cantidad de cuartos" type="number"
                  outlined />
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- Paso 4: Características adicionales -->
        <v-expansion-panel>
          <v-expansion-panel-title>Paso 4: Características adicionales</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row>
              <v-col cols="6">
                <v-checkbox v-model="house.caracteristicasDTO.cocina" label="Cocina" />
                <v-checkbox v-model="house.caracteristicasDTO.terraza_balcon" label="Terraza/Balcón" />
                <v-checkbox v-model="house.caracteristicasDTO.barbacoa" label="Barbacoa" />
                <v-checkbox v-model="house.caracteristicasDTO.garaje" label="Garaje" />
                <v-checkbox v-model="house.caracteristicasDTO.piscina" label="Piscina" />
                <v-checkbox v-model="house.caracteristicasDTO.gimnasio" label="Gimnasio" />
                <v-checkbox v-model="house.caracteristicasDTO.lavadora_secadora" label="Lavadora/Secadora" />
              </v-col>
              <v-col cols="6">
                <v-checkbox v-model="house.caracteristicasDTO.tv" label="Televisión" />
                <v-checkbox v-model="house.caracteristicasDTO.permiteMenores" label="Permite menores" />
                <v-checkbox v-model="house.caracteristicasDTO.permiteFumar" label="Permite fumar" />
                <v-checkbox v-model="house.caracteristicasDTO.permiteMascotas" label="Permite mascotas" />
                <v-checkbox v-model="house.caracteristicasDTO.wifi" label="WiFi" />
                <v-checkbox v-model="house.caracteristicasDTO.aguaCaliente" label="Agua caliente" />
                <v-checkbox v-model="house.caracteristicasDTO.climatizada" label="Climatizada" />
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- Paso 5: Fotos -->
        <v-expansion-panel>
          <v-expansion-panel-title>Paso 5: Fotos</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-file-input v-model="house.fotosURL" label="Subir fotos" accept="image/*" multiple outlined />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-card-actions class="d-flex flex-row justify-space-around pa-4 mt-4">
        <v-btn color="purple" variant="elevated" @click="create">Aceptar</v-btn>
        <v-btn color="error" variant="elevated" @click="emit('close')">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>

  <v-dialog
    v-model="dialog"
    persistent
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card class="d-flex flex-column justify-center align-center">
      <v-card-title primary-title>
        {{message}}
      </v-card-title>
      <v-card-actions>
        <v-btn color="purple" @click="closeDialog">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
