<script setup>
import { onMounted, ref } from 'vue';
import { getAllPendHouses, convertToFullPath, publicarAnuncio } from '../../functions';
// import casa1 from 'path/to/casa1.jpg'; // Descomenta si necesitas una imagen por defecto

const houses = ref([]);
const dialog = ref(false);
const message = ref("");

async function publicar(idCasa) {
    try {
        const response = await publicarAnuncio(idCasa);
        console.log(response.data);
        
        // Solución: Esperar la actualización correcta de `houses`
        houses.value = await getAllPendHouses();
        
        message.value = "El anuncio ha sido publicado con éxito";
        dialog.value = true;
    }
    catch (error) {
        message.value = "Ha ocurrido un error, por favor intente más tarde";
        dialog.value = true;
        console.error(error);
    }
}

// Función añadida para evitar errores en el botón "Ver más detalles"
function viewMoreDetails(casa) {
    console.log("Detalles de la casa:", casa);
}

onMounted(async () => {
    houses.value = await getAllPendHouses();
});
</script>

<template>
    <h3 class="text-uppercase mb-10">Casas Pendientes</h3>
    <div v-if="houses.length === 0" class="d-flex flex-column align-center">
        <v-alert>
            No hay casas para mostrar
        </v-alert>
    </div>
    <div v-else>
        <v-container class="text-left mt-10">
            <v-row>
                <v-col v-for="(casa, index) in houses" :key="index" cols="12" sm="6" md="4" lg="3">
                    <v-card class="v-card">
                        <v-img
                            :src="casa.fotosURL && casa.fotosURL.length > 0 ? convertToFullPath(casa.fotosURL[0]) : 'https://via.placeholder.com/300'"
                            class="white--text align-end" alt="Imagen de la casa">
                            <v-card-title class="text-white nombre">{{ casa.nombre }}</v-card-title>
                            <v-btn icon class="like-btn" @click="publicar(casa.idCasa)">
                                <v-icon :color="casa.liked ? 'red' : 'grey'">mdi-check</v-icon>
                            </v-btn>
                        </v-img>
                        <v-card-subtitle class="mt-4">${{ casa.precioNoche }} / noche</v-card-subtitle>
                        <v-card-actions>
                            <v-btn @click="viewMoreDetails(casa)" class="text-purple">Ver más detalles</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>

    <v-dialog v-model="dialog" persistent max-width="500px" transition="dialog-transition">
        <v-card class="d-flex flex-column justify-center align-center pa-3">
            <v-card-title primary-title class="text-wrap text-center">
                {{ message }}
            </v-card-title>
            <v-card-actions>
                <v-btn color="success" @click="dialog = false" variant="elevated">Cerrar</v-btn>
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
    transition: transform 0.3s ease;
}

.v-card:hover {
    transform: scale(1.05);
}
</style>
