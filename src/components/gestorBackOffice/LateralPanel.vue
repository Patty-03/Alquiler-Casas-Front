<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
      <v-list-item prepend-icon="mdi-account" title="User" nav>
        <template v-slot:append>
          <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
        </template>
      </v-list-item>

      <v-list density="compact" nav>
        <v-list-item 
  v-for="(item, index) in items" 
  :key="index"
  :prepend-icon="item.icon"
  :title="item.title"
  value="item.value"
  @click="navigate(item)"
>
  <router-link :to="{ name: item.value }"></router-link>
</v-list-item>

      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const drawer = ref(true)
const rail = ref(true)

const router = useRouter()

const items = [
  { icon: 'mdi-account', title: 'My Account', value: 'accountGestor' },
  { icon: 'mdi-note-multiple', title: 'Anuncios', value: 'announcements' },
  { icon: 'mdi-cash', title: 'Finanzas', value: 'finances' }
]

const navigate = (item) => {
  router.replace({ name: item.value });
}
</script>
