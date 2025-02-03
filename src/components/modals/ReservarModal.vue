<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../../stores/auth';


const authStore = useAuthStore()
const route = useRoute()

const reservation = ref({
    idUsuario: authStore.$id,
    idCasa: route.params.id,
    cantPersonas: 0,
    fechaEntrada: "",
    fechaSalida: ""
})
</script>

<template>
    <v-card>
        <v-card-title primary-title>
            Confirmar Reservacion
        </v-card-title>

        <v-card-text>
            <!-- Formulario para la reservación -->
            <v-form @submit.prevent="confirmReservation">
                <!-- Campo para la cantidad de personas -->
                <v-text-field v-model="reservation.cantPersonas" label="Cantidad de personas" type="number" min="1"
                    outlined required />

                <!-- Campo para la fecha de entrada -->
                <v-text-field v-model="reservation.fechaEntrada" label="Fecha de entrada" type="date" outlined
                    required />

                <!-- Campo para la fecha de salida -->
                <v-text-field v-model="reservation.fechaSalida" label="Fecha de salida" type="date" outlined required />

                <!-- Botones para confirmar o cancelar -->
                <v-card-actions>
                    <v-btn type="submit" color="primary">Confirmar</v-btn>
                    <v-btn @click="closeModal" color="error">Cancelar</v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>
</template>