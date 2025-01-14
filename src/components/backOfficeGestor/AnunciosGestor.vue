<script setup>
import { getHousesByGestorId, editHouses, getHouseById, deleteHouse } from '../../functions';
import { ref, onMounted } from 'vue';
import casa1 from '../../assets/casa1.jpg';
import CreateHouseModal from './CreateHouseModal.vue';

const houses = ref([]);
const showAnnounces = ref(false)
const arrowAnnounces = ref("arrow-down-thick")
const create = ref(false)

function toggleAnnounces(){
  if (showAnnounces.value == true){
    showAnnounces.value = false
    arrowAnnounces.value = "arrow-down-thick"
  }
  else if(showAnnounces.value === false){
    showAnnounces.value = true
    arrowAnnounces.value = "arrow-up-thick"
  }
}

onMounted(async () => {
  try {
    houses.value = await getHousesByGestorId();
  } catch (error) {
    console.error('No se pudieron cargar las casas del gestor', error);
  }
});

const dialog = ref(false);
const showModal = ref(false);
const modalMessage = ref('');
const idHouseSelected = ref('');

function showDeleteModal(id) {
  showModal.value = true;
  modalMessage.value = "¿Desea eliminar este anuncio? Esta acción no se puede deshacer.";
  idHouseSelected.value = id;
}

async function deleteById() {
  try {
    await deleteHouse(idHouseSelected.value);
    houses.value = getHousesByGestorId()
    showModal.value = false;
  } catch (error) {
    console.error('No se pudo borrar', error);
  }
}
</script>

<template>
  <div class="pa-10">
    <v-row class="d-flex flex-row just">
      <h2 class="pr-2">Anuncios publicados</h2>
      <v-btn icon variant="text" size="small" @click="toggleAnnounces">
        <v-icon>mdi-{{arrowAnnounces}}</v-icon>
      </v-btn>
      <v-btn icon variant="text" size="small">
        <v-icon @click="create = true">mdi-plus-thick</v-icon>
      </v-btn>
    </v-row>
    <v-container class="text-left mt-10" v-if="showAnnounces">
      <v-row>
        <v-col v-for="(casa, index) in houses" :key="index" cols="12" sm="6" md="4" lg="3">
          <v-card width="200">
            <v-img :src="casa1" class="white--text align-end">
              <v-card-title class="text-white nombre">{{ casa.nombre }}</v-card-title>
              <v-btn icon class="like-btn" @click="showDeleteModal(casa.idCasa)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-img>
            <v-card-subtitle class="mt-4">${{ casa.precioNoche }} / noche</v-card-subtitle>
            <v-card-actions>
              <v-btn class="text-purple" @click="dialog = true">Editar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="showModal" max-width="400">
      <v-card class="d-flex flex-column align-center pa-4">
        <v-card-title class="text-wrap text-center">{{ modalMessage }}</v-card-title>
        <v-card-actions>
          <v-btn @click="showModal = false" color="purple lighten-1" variant="elevated">Cancelar</v-btn>
          <v-btn color="red" variant="elevated" @click="deleteById">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  <div class="pa-10">
    <v-row>
      <h2 class="pr-2">Anuncios pendientes</h2>
      <v-btn icon variant="text" size="small">
        <v-icon>mdi-arrow-down-thick</v-icon>
      </v-btn>
    </v-row>
  </div>

  <v-dialog v-model="dialog" scrollable transition="dialog-transition">
    <v-card class="pa-10">
      Ventana de edicion
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="create"
    transition="dialog-transition"
    scrollable
    fullscreen
  >
  
    <CreateHouseModal></CreateHouseModal>

    <v-container class="d-flex flex-row justify-space-around">
      <v-btn color="purple">Aceptar</v-btn>
      <v-btn color="error" @click="create = false">Cancelar</v-btn>
    </v-container>
  </v-dialog>
</template>

<style scoped>
.like-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}

.nombre {
  text-shadow: 2px 2px 4px black;
}
</style>
