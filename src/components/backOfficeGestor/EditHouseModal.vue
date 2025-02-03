<script setup>
import { onMounted, ref, defineProps, defineEmits } from 'vue';
import { getCiudades } from '../../functions';
import { useAuthStore } from '../../stores/auth';
import { updateHouse } from '../../functions'; // Asume que tienes una función para actualizar la casa

const authStore = useAuthStore();
const dialog = ref(false);

const emit = defineEmits(['close', 'update']);

const props = defineProps({
  houseToEdit: {
    type: Object,
    required: true
  }
});

const items = ref([]); // Ciudades disponibles

const house = ref({
  ...props.houseToEdit,
  caracteristicasDTO: props.houseToEdit.caracteristicasDTO || {
    cantMaxPersonas: 0,
    cantHabitaciones: 0,
    cantBanos: 0,
    cantCuartos: 0,
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
  }
});

async function update() {
  try {
    const formData = new FormData();

    // Agregar campos al FormData
    formData.append('idCiudad', house.value.idCiudad);
    formData.append('idUsuario', house.value.idUsuario);
    formData.append('descripcion', house.value.descripcion);
    formData.append('precioNoche', house.value.precioNoche);
    formData.append('precioMes', house.value.precioMes);
    formData.append('areaTotal', house.value.areaTotal);
    formData.append('nombre', house.value.nombre);
    formData.append('direccion', house.value.direccion);
    formData.append('caracteristicasDTO', JSON.stringify(house.value.caracteristicasDTO));

    // Agregar las fotos (si hay)
    if (house.value.fotos) {
      for (let i = 0; i < house.value.fotos.length; i++) {
        formData.append('fotosURL', house.value.fotos[i]);
      }
    }

    const response = await updateHouse(house.value.id, formData); // Pasa el FormData directamente
    alert('Casa actualizada exitosamente:', response.data);
    emit('update', response.data); // Emitir evento de actualización
    emit('close'); // Cerrar el modal o formulario después de actualizar la casa
  } catch (error) {
    console.error('No se pudo actualizar la casa:', error);
    dialog.value = true; // Mostrar el diálogo de error
  }
}

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
    <v-card class="pa-1">
      <v-card-title primary-title>
        Informacion de la casa
      </v-card-title>

      <v-expansion-panels accordion>
        <!-- Paso 1: Información General -->
        <v-expansion-panel>
          <v-expansion-panel-title>Paso 1: Información general</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-text-field v-model="house.nombre" label="Nombre de la propiedad" outlined />
            <v-select v-model="house.idCiudad" :items="items" item-title="nombre" item-value="id" label="Ciudad" outlined />
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
                <v-text-field v-model="house.caracteristicasDTO.cantMaxPersonas" label="Cantidad máxima de personas" type="number" outlined />
                <v-text-field v-model="house.caracteristicasDTO.cantHabitaciones" label="Cantidad de habitaciones" type="number" outlined />
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="house.caracteristicasDTO.cantBanos" label="Cantidad de baños" type="number" outlined />
                <v-text-field v-model="house.caracteristicasDTO.cantCuartos" label="Cantidad de cuartos" type="number" outlined />
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
      </v-expansion-panels>

      <v-card-actions class="d-flex flex-row justify-space-around pa-4 mt-4">
        <v-btn color="purple" variant="elevated" @click="update">Aceptar</v-btn>
        <v-btn color="error" @click="emit('close')" variant="elevated">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>

  <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
    <v-card class="pa-4">
      <v-card-title primary-title class="d-flex flex-wrap justify-center align-center">
        Ha ocurrido un error al actualizar la casa.
        <br>
        Intente de nuevo mas tarde
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions class="d-flex justify-center align-center">
        <v-btn color="error" @click="dialog = false" variant="elevated">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>