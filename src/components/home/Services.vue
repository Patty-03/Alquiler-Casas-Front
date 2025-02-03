<template>
  <div class="pa-14">
    <h1 class="mt-10 text-uppercase pb-10">Servicios que te acomodan</h1>

    <div class="d-flex flex-row flex-wrap justify-space-evenly">
      <v-list-item v-for="(item, index) in items" :key="index" link class="pa-2">
        <v-card @click="item.checked = !item.checked" :class="['custom-item', { selected: item.checked }]">
          <v-icon class="icon" :size="40" color="purple lighten-1">mdi-{{ item.icon }}</v-icon>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-card>
      </v-list-item>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

let items = ref([
  { icon: 'paw', text: 'Mascotas', backend: 'permiteMascotas', checked: false },
  { icon: 'water', text: 'Agua caliente', backend: 'aguaCaliente', checked: false },
  { icon: 'air-conditioner', text: 'Aire acondicionado', backend: 'climatizada', checked: false },
  { icon: 'smoking', text: 'Área de fumadores', backend: 'permiteFumar', checked: false },
  { icon: 'television', text: 'Televisión por cable', backend: 'tv', checked: false },
  { icon: 'parking', text: 'Parking', backend: 'garaje', checked: false },
  { icon: 'pool', text: 'Piscina', backend: 'piscina', checked: false },
  { icon: 'balcony', text: 'Terraza/Balcon', backend: 'terraza_balcon', checked: false },
  { icon: 'grill', text: 'Barbacoa', backend: 'barbacoa', checked: false },
  { icon: 'weight-lifter', text: 'Gimnasio', backend: 'gimnasio', checked: false },
  { icon: 'washing-machine', text: 'Lavadora', backend: 'lavadora_secadora', checked: false },
  { icon: 'teddy-bear', text: 'Permite menores', backend: 'permite_menores', checked: false },
  { icon: 'wifi', text: 'WiFi', backend: 'wifi', checked: false },
  { icon: 'stove', text: 'Cocina', backend: 'cocina', checked: false }
]);

</script>

<style scoped>
.mt-10 {
  margin-top: 10px;
}

.custom-item {
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  padding: 1rem;
}

</style>