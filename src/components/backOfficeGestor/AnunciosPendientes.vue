<script setup>
import { onMounted, ref, onUpdated } from 'vue';
import { getPendHouses, convertToFullPath, deleteHouse, getHousesByGestorId } from '../../functions';
import casa1 from '../../assets/casa1.jpg';
import EditHouseModal from './EditHouseModal.vue';

const houses = ref([]);
const edit = ref(false)
const houseToEdit =  ref(null)
const showModal = ref(false)
const modalMessage = ref("")
const idHouseSelected = ref('')

const openEditDialog = (casa) => {
  houseToEdit.value = casa; 
  edit.value = true; 
}


const closeEditDialog = () => {
  edit.value = false; 
};

const handleUpdate = async () => {
  edit.value = false; 
  houses.value = await getHousesByGestorId(); 
};

function showDeleteModal(id) {
  showModal.value = true;
  modalMessage.value = "¿Desea eliminar este anuncio? Esta acción no se puede deshacer.";
  idHouseSelected.value = id;
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

onMounted(async () => {
    houses.value = await getPendHouses();
});


</script>

<template>
    <v-container>
        <!-- Si no hay casas -->
        <v-container v-if="houses.length === 0">
            <v-alert>No hay casas para mostrar</v-alert>
        </v-container>

        <!-- Lista de casas -->
        <v-container v-else>
            <v-row>
                <v-col v-for="(casa, index) in houses" :key="index">
                    <v-card width="200">
                        <v-img :src="casa.fotosURL && casa.fotosURL.length > 0 ? convertToFullPath(casa.fotosURL[0]) : casa1" class="white--text align-end">
                            <v-card-title class="text-white nombre">{{ casa.nombre }}</v-card-title>
                            <v-btn icon class="like-btn">
                                <v-icon @click="showDeleteModal(casa.idCasa)">mdi-delete</v-icon>
                            </v-btn>
                        </v-img>
                        <v-card-subtitle class="mt-4">${{ casa.precioNoche }} / noche</v-card-subtitle>
                        <v-card-actions>
                            <v-btn class="text-purple" @click="openEditDialog(casa)">Editar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-container>

    <v-dialog v-model="edit" scrollable transition="dialog-transition" max-width="800">
      <EditHouseModal
        :houseToEdit="houseToEdit"
        @close="closeEditDialog"
        @update="handleUpdate"
      ></EditHouseModal>
    </v-dialog>

    <v-dialog v-model="showModal" max-width="400">
      <v-card class="d-flex flex-column align-center pa-4">
        <v-card-title class="text-wrap text-center">{{ modalMessage }}</v-card-title>
        <v-card-actions>
          <v-btn @click="showModal = false" color="purple lighten-1" variant="elevated">Cancelar</v-btn>
          <v-btn color="red" variant="elevated" @click="deleteById">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
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

.v-card {
  position: relative;
}
</style>