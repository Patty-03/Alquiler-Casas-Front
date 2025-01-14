<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { filtroHome, getCiudades } from '../../functions';


const router = useRouter();
const items = ref([]);

async function ciudades() {
  try{
    const ciudadesData = await getCiudades()
     items.value = ciudadesData.map(ciudad => ciudad.ciudad)

  }
  catch(error){
    console.error('Error', error)
  }
  
}

let value = ref('');
let entryDate = ref('');
let exitDate = ref('');
let people = ref('');

const requiredRule = (v) => !!v || 'Este campo es obligatorio';
const form = ref(null);

async function handleSubmit() {
  const params = {
    cantMaxPersonas: people.value,
    nombreCiudad: value.value,
    fechaEntrada: entryDate.value,
    fechaSalida: exitDate.value
  };
  try {
    const result = await filtroHome(params);
    console.log('Resultados', result);
    router.push('/filterResults');
  } catch (error) {
    console.error('Error al filtrar las casas', error);
  }
}

onMounted(()=>{
  ciudades()
})
</script>

<template>
  <v-form ref="form" class="form">
    <v-row class="d-flex align-center flex-row justify-center">
      <v-col cols="auto">
        <v-select 
          :items="items" 
          v-model="value" 
          label="Lugar" 
          class="in" 
          variant="solo"
          width="11rem"
          :rules="[requiredRule]"
        ></v-select>  
      </v-col>
      <v-col cols="auto">
        <v-text-field 
          name="entry" 
          label="Entrada" 
          variant="solo" 
          placeholder="Fecha de entrada" 
          type="text"
          width="11rem"
          onfocus="(this.type = 'date')"
          v-model="entryDate"
        ></v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-text-field 
          name="exit" 
          label="Salida" 
          variant="solo" 
          placeholder="Fecha de salida" 
          type="text"
          width="11rem"
          onfocus="(this.type = 'date')"
          v-model="exitDate"
        ></v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-text-field 
          name="people" 
          label="Huespedes" 
          type="number" 
          min="1" 
          max="8" 
          variant="solo"
          width="11rem"
          v-model="people"
        ></v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-btn type="submit" color="purple lighten-1" @click="handleSubmit">Buscar</v-btn>
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
