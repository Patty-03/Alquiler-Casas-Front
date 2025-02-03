<script setup>
import { ref } from 'vue';
import { filterByServiceAndOthers } from '../../functions';

    const params = ref({
        cantMaxPersonas: 1,
        cantHabitaciones: 1,
        cantBanos: 1,
        cantCuartos: 1,
        cocina: false,
        terraza_balcon: false,
        barbacoa: false,
        garaje: false,
        piscina: false,
        gimnasio: false,
        lavadora_secadora: false,
        tv: false,
        permiteMenores: false,
        permiteFumaar: false,
        permiteMascotas: false,
        wifi: false,
        aguaCaliente: false,
        climatizada: false,
        precioNoche: 1,
        precioMes: 1,
        areaTotal: 1
    })

    async function handleSubmit(){
        try{
            const response = await filterByServiceAndOthers(params)
            console.log(response)
        }
        catch(error){
            console.error('No se pudieron filtrar las casas');  
        }
    }
</script>

<template>
    <v-container>
        <v-app-bar scroll-behavior="hide" elevation="1" class="d-flex align-center justify-center">
            <v-list class="d-flex flex-row flex-wrap align-center justify-center">
                <v-list-item>
                    <v-btn class="rounded-pill">
                        <v-chip>Precio<v-icon>mdi-arrow-down</v-icon></v-chip>
                    </v-btn>
                </v-list-item>
                <v-list-item>
                    <v-btn class="rounded-pill">
                        <v-chip>Precio<v-icon>mdi-arrow-up</v-icon></v-chip>
                    </v-btn>
                </v-list-item>
                <v-list-item>
                    <v-btn color="success" @click="handleSubmit">Filtrar</v-btn>
                </v-list-item>
            </v-list>
        </v-app-bar>
    </v-container>

</template>