<script setup>
import { ref } from 'vue';

const isActive = ref(false);

function showDialog() {
  isActive.value = true;
}
</script>

<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="6">
        <v-dialog v-model="isActive" width="auto">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              v-bind="activatorProps"
              @click="showDialog"
              text="Abrir diálogo personalizado"
              block
            ></v-btn>
          </template>
  
          <template v-slot:default="{ isActive }">
            <v-card>
              <v-toolbar title="Aviso"></v-toolbar>
  
              <v-card-text class="text-h2 pa-12">
                Regístrate para poder ver tus favoritos
              </v-card-text>
  
              <v-card-actions class="justify-end">
                <v-btn
                  color="purple lighten-1"
                  @click="isActive.value = false"
                >
                  Aceptar
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>
