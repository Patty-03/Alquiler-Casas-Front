<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import { getReservationDays, getHouseById } from '../../functions';
import { useRoute } from 'vue-router';

const route = useRoute();

// Valores de entrada y salida
const entryValue = ref(new Date());
const outValue = ref(new Date());
// Fechas ocupadas
const busyDays = ref([]);

// Cantidad de días entre las fechas de entrada y salida
const totalDays = ref(0);
const price = ref(0);
const house = ref({});

// Función para contar los días entre dos fechas
const countDays = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const timeDiff = endDate.getTime() - startDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convertir milisegundos a días
  return daysDiff;
};

const isAllowedDate = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Establecer la hora a medianoche para comparar solo fechas
  const dateString = date.toISOString().split('T')[0];
  return date >= today && !busyDays.value.includes(dateString);
};

const entryDateIsNotSelected = ref(true);

// Emitir eventos al cambiar las fechas
const emit = defineEmits(['update:entryValue', 'update:outValue', 'update:totalDays', 'update:totalCost']);

// Emitir al cambiar los valores
const updateEntryValue = (value) => {
  emit('update:entryValue', value);
  totalDays.value = countDays(value, outValue.value);
  emit('update:totalDays', totalDays.value);
};

const updateOutValue = (value) => {
  emit('update:outValue', value);
  totalDays.value = countDays(entryValue.value, value);
  emit('update:totalDays', totalDays.value);
};

// Propiedad computada para el costo total
const totalCost = computed(() => {
  return price.value * totalDays.value;
});

// Emitir el costo total cuando cambie
watch(totalCost, (newValue) => {
  emit('update:totalCost', newValue);
});

onMounted(async () => {
  busyDays.value = await getReservationDays(route.params.id);
  house.value = await getHouseById(route.params.id);
  price.value = house.value.precioNoche;
});

// Detectar cambios en v-model usando watchers
watch(entryValue, (newValue) => updateEntryValue(newValue));
watch(outValue, (newValue) => updateOutValue(newValue));
</script>

<template>
  <v-container>
    <v-row class="d-flex flex-column flex-md-row align-center justify-space-around">
      <v-col class="d-flex flex-column align-center justify-center">
        <h2>Entrada</h2>
        <v-date-picker 
          v-model="entryValue"
          @input="updateEntryValue($event)"
          :reactive="true"
          header="Entrada"
          @click="entryDateIsNotSelected = false"
          rounded
          :allowed-dates="isAllowedDate">
        </v-date-picker>
      </v-col>
      <v-col class="d-flex flex-column align-center justify-center">
        <h2>Salida</h2>
        <v-date-picker 
          v-model="outValue"
          @input="updateOutValue($event)"
          :reactive="true"
          header="Salida"
          rounded
          :disabled="entryDateIsNotSelected"
          :allowed-dates="isAllowedDate">
        </v-date-picker>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-container>
      <v-row>
        <v-col>
          <h3 class="mb-2">Costo por dias (Puede variar)</h3>
          <h4>${{ totalCost }}.00</h4>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<style scoped>
.vuecal__cell--disabled {
  text-decoration: line-through;
  color: #c13a3a;
}

@media (max-width: 600px) {
  .v-row {
    flex-direction: column !important;
  }
}
</style>