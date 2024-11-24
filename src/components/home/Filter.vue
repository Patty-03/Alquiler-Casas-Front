<template>
  <v-form ref="form" class="form" @submit.prevent="submitForm">
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
        <v-btn type="submit" color="purple lighten-1">Buscar</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router =  useRouter()

// Datos del formulario
const items = ["La Habana", "Santiago de Cuba", "Trinidad", "Varadero"];
let value = ref(null);
let entryDate = ref('');
let exitDate = ref('');
let people = ref('');

const requiredRule = (v) => !!v || 'Este campo es obligatorio';

const form = ref(null);

const submitForm = async () => {
  if (form.value.validate()) {
    try {
      const response = await axios.post('http://localhost:5048/', { 
        lugar: value.value, 
        fechaEntrada: entryDate.value, 
        fechaSalida: exitDate.value, 
        huespedes: people.value
      })
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  } else {
    console.error('El formulario tiene errores de validación: ');
  }
};
</script>

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
