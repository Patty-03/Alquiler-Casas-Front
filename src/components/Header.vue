<template>
  <v-app-bar color="purple lighten-1" prominent>
    <div class="d-flex flex-row align-center justify-evenly w-100 pa-16">
      <v-toolbar-title>Villa</v-toolbar-title>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"
        v-if="!$vuetify.display.mdAndUp"></v-app-bar-nav-icon>

      <template v-if="$vuetify.display.mdAndUp">
        <v-btn text>
          Explorar
        </v-btn>

        <v-btn text>
          Contacto
        </v-btn>

        <v-btn icon @click="loginDialog = true">
          <v-icon class="text-white">mdi-account</v-icon>
        </v-btn>
      </template>
    </div>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'right' : undefined" temporary>
    <v-list>
      <v-list-item>
        <v-btn variant="text">
          Explorar
        </v-btn>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-btn variant="text">
            Contacto
          </v-btn>
        </v-list-item-content>

      </v-list-item>

      <v-list-item>
        <v-list-item-content class="">
          <v-btn @click="loginDialog = true" prepend-icon="mdi-account-circle">
            Iniciar sesion
          </v-btn>
        </v-list-item-content>

      </v-list-item>

    </v-list>
  </v-navigation-drawer>

  <v-dialog v-model="loginDialog" max-width="500px" transition="dialog-transition">
    
    <v-card id="card">
      <v-card-title>
        <span class="headline text-uppercase">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-form v-show="login === true">
          <v-text-field label="Nombre" required></v-text-field>
          <v-text-field label="Email"></v-text-field>
        </v-form>
        <v-form v-show="signIn === true">
          <v-text-field label="Primer Nombre" required></v-text-field>
          <v-text-field label="Apellidos" required></v-text-field>
          <v-text-field label="Email"></v-text-field>
          <v-text-field label="Telefono"></v-text-field>
          <v-text-field label="Nombre de usuario"></v-text-field>
          <v-text-field label="Contraseña"></v-text-field>
        </v-form>
        <v-card-text>
          <v-btn class="text-purple" variant="text" @click="changeForms">{{ text }}</v-btn>
        </v-card-text>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="purple lighten-5" @click="loginDialog = false" variant="outlined">Cancelar</v-btn>
        <v-btn color="purple lighten-5" @click="loginDialog = false" type="submit" variant="outlined">Enviar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
const drawer = ref(false)
const group = ref(null)
const loginDialog = ref(false)
const login = ref(true)
const signIn = ref(false)
const text = ref("Eres nuevo por aqui? Crea una cuenta")
const title = ref("Inicia sesion")

const changeForms = () => {
  if (signIn.value === false) {
    signIn.value = true
    login.value = false
    text.value = "Ya tienes una cuenta? Inicia sesion"
    title.value = "Crea una cuenta"
  } else {
    signIn.value = false
    login.value = true
    text.value = "Eres nuevo por aqui? Crea una cuenta"
    title.value = "Inicia sesion"
  }
}

watch(group, () => {
  drawer.value = false
})
</script>

<style scoped></style>