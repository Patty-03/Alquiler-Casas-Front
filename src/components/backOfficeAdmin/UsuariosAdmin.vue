<template>
  <v-container>
    <v-table class="pa-2">
      <thead>
        <tr>
          <th class="text-center">ID</th>
          <th class="text-center">Nombre</th>
          <th class="text-center">Correo</th>
          <th class="text-center">Teléfono</th>
          <th class="text-center">Rol</th>
          <th class="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.idUsuario">
          <td>{{ usuario.idUsuario }}</td>
          <td>{{ usuario.nombreUsuario }}</td>
          <td>{{ usuario.correo }}</td>
          <td>{{ usuario.numeroContacto }}</td>
          <td>{{ getRolNombre(usuario.idRol) }}</td>
          <td>
            <!-- Al hacer clic, guardamos el usuario seleccionado y abrimos el diálogo -->
            <v-btn color="success" @click="openChangeDialog(usuario)">Cambiar Rol</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- Diálogo global para cambiar rol -->
    <v-dialog v-model="changeDialog" max-width="500px" transition="dialog-transition">
      <v-card class="pa-4">
        <v-card-title primary-title>
          Seleccione el nuevo rol para el usuario
        </v-card-title>
        <v-container>
          <!-- Aquí se muestran los roles. Puedes usar v-select con el arreglo roles -->
          <v-select :items="roles" label="Rol" v-model="value"></v-select>
        </v-container>
        <v-card-actions>
          <v-btn color="purple" variant="elevated" @click="confirmChangeRole">Aceptar</v-btn>
          <v-btn color="error" variant="elevated" @click="closeChangeDialog">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Diálogo para mostrar mensajes -->
    <v-dialog v-model="messageDialog" max-width="500px" transition="dialog-transition">
      <v-card class="pa-3">
        <v-card-title primary-title class="text-wrap">
          {{ message }}
        </v-card-title>
        <v-card-actions>
          <v-btn color="purple" variant="elevated" @click="messageDialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllUsers, cambiarRol } from '../../functions';

const usuarios = ref([]);
const changeDialog = ref(false);
const message = ref("");
const messageDialog = ref(false);

const value = ref(""); // Nuevo rol seleccionado
const roles = [
  "Admin",
  "Gestor",
  "Cliente"
];

// Variable para almacenar el usuario seleccionado
const selectedUser = ref(null);

const getRolNombre = (idRol) => {
  switch (idRol) {
    case 1:
      return 'Admin';
    case 2:
      return 'Gestor';
    case 3:
      return 'Cliente';
    default:
      return 'Desconocido';
  }
};

// Función para abrir el diálogo y guardar el usuario seleccionado
function openChangeDialog(usuario) {
  selectedUser.value = usuario;
  // Puedes inicializar "value" con el rol actual si lo deseas, por ejemplo:
  value.value = getRolNombre(usuario.idRol);
  changeDialog.value = true;
}

function closeChangeDialog() {
  changeDialog.value = false;
}

// Función para confirmar el cambio de rol
async function confirmChangeRole() {
  if (!selectedUser.value) return;
  
  // Aquí puedes mapear el rol (por ejemplo, "Admin" a 1, etc.)
  let nuevoIdRol;
  switch (value.value) {
    case "Admin":
      nuevoIdRol = 1;
      break;
    case "Gestor":
      nuevoIdRol = 2;
      break;
    case "Cliente":
      nuevoIdRol = 3;
      break;
    default:
      nuevoIdRol = selectedUser.value.idRol;
  }
  
  const params = {
    idUsuario: selectedUser.value.idUsuario,
    idRol: nuevoIdRol,
  };

  try {
    await cambiarRol(params);
    message.value = "El usuario ha sido cambiado de rol correctamente";
    const response = await getAllUsers()
    usuarios.value = response
  } catch (error) {
    message.value = "Ha ocurrido un error, por favor intente más tarde";
    console.error(error);
  }
  messageDialog.value = true;
  closeChangeDialog();
}

onMounted(async () => {
  try {
    const response = await getAllUsers();
    usuarios.value = response;
  } catch (error) {
    console.error('Error al cargar los usuarios:', error);
  }
});
</script>

<style scoped>
.v-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.v-table th {
  background-color: #1976d2;
  color: white;
  font-weight: bold;
  padding: 12px;
}

.v-table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

.v-table tr:hover {
  background-color: #f5f5f5;
}
</style>
