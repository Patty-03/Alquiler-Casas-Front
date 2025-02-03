<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { filtroHome, getCiudades } from '../../functions';

const router = useRouter();
const items = ref([]);
let value = ref(null);
let entryDate = ref('');
let exitDate = ref('');
let people = ref(1);

const requiredRule = (v) => !!v || 'Este campo es obligatorio';
const form = ref(null);

async function ciudades() {
  try {
    const ciudadesData = await getCiudades();
    items.value = ciudadesData.map(ciudad => ({
      title: ciudad.ciudad,
      value: ciudad.i
    }));
  } catch (error) {
    console.error('Error', error);
  }
}

async function handleSubmit() {
  const ciudadSeleccionada = items.value.find(item => item.value === value.value);
  
  const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
  if (!entryDate.value) {
    entryDate.value = today;
  }
  if (!exitDate.value) {
    exitDate.value = today;
  }

  const params = {
    cantMaxPersonas: people.value,
    nombreCiudad: ciudadSeleccionada ? ciudadSeleccionada.title : '',
    fechaEntrada: entryDate.value,
    fechaSalida: exitDate.value
  };
  try {
    const result = await filtroHome(params);
    router.push({ name: 'FilterResults', params: { filterResult: result } });
  } catch (error) {
    console.error('Error al filtrar las casas', error);
    alert("Error")
  }
}

onMounted(() => {
  ciudades();
});
</script>

<template>
  <v-form ref="form" class="form">
    <v-row class="d-flex align-center flex-row justify-center">
      <v-col cols="auto">
        <v-select :items="items" v-model="value" item-title="title" item-value="value" label="Lugar" class="in"
          variant="solo" width="11rem" :rules="[requiredRule]"></v-select>
      </v-col>
      <v-col cols="auto">
        <v-text-field name="entry" label="Entrada" variant="solo" placeholder="Fecha de entrada" type="text"
          width="11rem" onfocus="(this.type = 'date')" v-model="entryDate"></v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-text-field name="exit" label="Salida" variant="solo" placeholder="Fecha de salida" type="text" width="11rem"
          onfocus="(this.type = 'date')" v-model="exitDate"></v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-text-field name="people" label="Huespedes" type="number" min="1" max="8" variant="solo" width="11rem"
          v-model="people"></v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-btn color="purple lighten-1" @click="handleSubmit">Buscar</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<style scoped>
.form {
  border: solid 5px rgb(147, 2, 160);
  border-radius: 100px;
  background: rgba(0, 0, 0, 0.336);
  padding: 2rem;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.546);
}

.v-col {
  margin-right: 1rem;
}
</style>
