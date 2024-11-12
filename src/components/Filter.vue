<template>
    <v-form class="form" >
    <v-row class="w-full">
      <v-col cols="12" sm="6" md="4" lg="4" xl="2">
        <v-select :items="items" v-model="value" label="Lugar" @change="value = !value" class="in" variant="solo"></v-select>  
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4" xl="2">
        <v-text-field name="entry" label="Entrada" id="entry" type="date" variant="solo"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4" xl="2">
        <v-text-field name="exit" label="Salida" id="exit" type="date" variant="solo"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4" xl="2">
        <v-text-field name="people" label="Personas" type="number" min="1" max="8" variant="solo"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4">
        <v-btn type="submit" color="purple lighten-1">Buscar</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { ref } from 'vue';

const items = ["La Habana", "Santiago de Cuba", "Trinidad", "Varadero"];
let value = ref(null);
</script>

<style scoped>
.form{
    border: solid 5px rgb(147, 2, 160);
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.336);
    padding: 2rem;
}

#entry,#exit{
    margin-right: 1rem;
}
</style>