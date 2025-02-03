<template>
  <v-container class="mt-10 pa-10">
    <v-row class="responsive-layout">
      <!-- Sección de Anuncios Publicados -->
      <v-col cols="12" md="6">
        <div class="pa-4">
          <v-row class="d-flex flex-row">
            <h2 class="pr-2">Anuncios publicados</h2>
            <v-btn icon variant="text" size="small" @click="toggleAnnounces">
              <v-icon>mdi-{{ arrowAnnounces }}</v-icon>
            </v-btn>
            <v-btn icon variant="text" size="small" @click="create = true">
              <v-icon>mdi-plus-thick</v-icon>
            </v-btn>
          </v-row>

          <!-- Mensaje si no hay casas -->
          <v-container class="text-left mt-4" v-if="showAnnounces">
            <template v-if="houses.length === 0">
              <v-alert class="mt-4">No hay casas para mostrar.</v-alert>
            </template>

            <template v-else>
              <v-row class="flex-wrap">
                <v-col v-for="(casa, index) in houses" :key="index" cols="12" sm="6" md="4" lg="6">
                  <v-card width="100%">
                    <v-img
                      :src="casa.fotosURL && casa.fotosURL.length > 0 ? convertToFullPath(casa.fotosURL[0]) : casa1"
                      class="white--text align-end"
                    >
                      <v-card-title class="text-white nombre">{{ casa.nombre }}</v-card-title>
                      <v-btn icon class="like-btn" @click="showDeleteModal(casa.idCasa)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-img>
                    <v-card-subtitle class="mt-4">${{ casa.precioNoche }} / noche</v-card-subtitle>
                    <v-card-actions>
                      <v-btn class="text-purple" @click="openEditDialog(casa)">Editar</v-btn>
                      <v-btn class="text-purple" @click="moreDetails(casa.idCasa)" size="large"><v-icon>mdi-eye</v-icon></v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-container>
        </div>
      </v-col>

      <!-- Sección de Anuncios Pendientes -->
      <v-col cols="12" md="6">
        <div class="pa-4">
          <v-row>
            <h2 class="pr-2">Anuncios pendientes</h2>
            <v-btn icon variant="text" size="small">
              <v-icon>mdi-arrow-down-thick</v-icon>
            </v-btn>
          </v-row>
          <v-row>
            <AnunciosPendientes></AnunciosPendientes>
          </v-row>
        </div>
      </v-col>
    </v-row>

    <!-- Diálogo de eliminación -->
    <v-dialog v-model="showModal" max-width="400">
      <v-card class="d-flex flex-column align-center pa-4">
        <v-card-title class="text-wrap text-center">{{ modalMessage }}</v-card-title>
        <v-card-actions>
          <v-btn @click="showModal = false" color="purple lighten-1" variant="elevated">Cancelar</v-btn>
          <v-btn color="red" variant="elevated" @click="deleteById">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Diálogo de edición -->
    <v-dialog v-model="dialog" scrollable transition="dialog-transition" max-width="800">
      <EditHouseModal
        :houseToEdit="houseToEdit"
        @close="closeEditDialog"
        @update="handleUpdate"
      ></EditHouseModal>
    </v-dialog>

    <!-- Diálogo de creación -->
    <v-dialog v-model="create" transition="dialog-transition" scrollable fullscreen>
      <CreateHouseModal @close="create = false" @houseCreated="refreshHouses"></CreateHouseModal>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { getHousesByGestorId, deleteHouse, convertToFullPath } from '../../functions';
import { ref, onMounted } from 'vue';
import casa1 from '../../assets/casa1.jpg';
import CreateHouseModal from './CreateHouseModal.vue';
import AnunciosPendientes from './AnunciosPendientes.vue';
import EditHouseModal from './EditHouseModal.vue';
import { useRouter } from 'vue-router';

const houses = ref([]);
const showAnnounces = ref(true);
const arrowAnnounces = ref("arrow-down-thick");
const create = ref(false);
const router = useRouter()

function moreDetails(id){
  router.push({name: 'MoreDetails', params: {id}})
}

function toggleAnnounces() {
  showAnnounces.value = !showAnnounces.value;
  arrowAnnounces.value = showAnnounces.value ? "arrow-down-thick" : "arrow-up-thick";
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
const houseToEdit = ref(null); // Estado para almacenar la casa a editar

function showDeleteModal(id) {
  showModal.value = true;
  modalMessage.value = "¿Desea eliminar este anuncio? Esta acción no se puede deshacer.";
  idHouseSelected.value = id;
}

async function refreshHouses() {
  try {
    houses.value = await getHousesByGestorId(); // Recargar la lista de casas
  } catch (error) {
    console.error('No se pudieron actualizar los anuncios', error);
  }
}

async function deleteById() {
  try {
    await deleteHouse(idHouseSelected.value);
    houses.value = await getHousesByGestorId(); 
    showModal.value = false;
  } catch (error) {
    console.error('No se pudo borrar', error);
  }
}

const openEditDialog = (casa) => {
  houseToEdit.value = casa; 
  dialog.value = true; 
}

const closeEditDialog = () => {
  dialog.value = false; 
};

const handleUpdate = async () => {
  dialog.value = false; 
  houses.value = await getHousesByGestorId(); 
};
</script>

<style scoped>
.like-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}

.nombre {
  text-shadow: 2px 2px 4px black;
}

.v-card {
  position: relative;
}

.responsive-layout {
  flex-direction: column;
}

@media (min-width: 960px) {
  .responsive-layout {
    flex-direction: row;
  }
}
</style>