import { defineStore } from 'pinia';
import axios from 'axios';
import { decodeJWT } from '../functions';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('authToken') || null,
    error: null,
    favorites: [], 
    userRol: null,
    decodedToken: null,
    userId: null,
    isLoggedIn: !!localStorage.getItem('authToken'),
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post('http://localhost:5048/api/Login/login', credentials);
        this.token = response.data.token;
        localStorage.setItem('authToken', this.token);
        this.decodedToken = decodeJWT(this.token);
        this.userId = this.decodedToken.sub;
        localStorage.setItem('userId', this.userId);
        this.userRol = this.decodedToken.role;
        this.isLoggedIn = true;
        this.error = null;
        this.loadFavorites(); // Cargar favoritos al iniciar sesión
      } catch (error) {
        console.error('Error al loguearse', error);
        this.error = error.response ? error.response.data : 'Error desconocido';
        this.isLoggedIn = false;
      }
    },
    async register(userData) {
      try {
        const response = await axios.post('http://localhost:5048/api/Usuarios/crear', userData);
        this.token = response.data.token;
        localStorage.setItem('authToken', this.token);
        this.error = null;
        this.isLoggedIn = true;
      } catch (error) {
        this.error = error.response ? error.response.data : 'Error desconocido';
        this.isLoggedIn = false;
      }
    },
    logout() {
      this.userId = null;
      this.userRol = null;
      this.token = null;
      this.favorites = [];
      this.decodedToken = null;
      this.isLoggedIn = false;
      localStorage.removeItem('authToken');
      localStorage.removeItem('favorites'); // Limpiar favoritos al cerrar sesión
    },
    // Cargar favoritos desde localStorage
    loadFavorites() {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      this.favorites = storedFavorites;
    },
    // Verifica si una casa ya está en favoritos
    isFavorite(houseId) {
      return this.favorites.some(fav => fav.idCasa === houseId);
    },
    // Agregar una casa a favoritos (si no está ya)
    addFavorite(house) {
      if (!this.isFavorite(house.idCasa)) {
        this.favorites.push({ ...house, liked: true }); // Agregar la casa con el estado liked
        this.saveFavorites(); // Guardar en localStorage
      }
    },
    // Eliminar una casa de favoritos
    removeFavorite(house) {
      this.favorites = this.favorites.filter(fav => fav.idCasa !== house.idCasa);
      this.saveFavorites(); // Guardar en localStorage
    },
    // Alternar el estado de favorito de una casa
    toggleFavorite(house) {
      if (this.isFavorite(house.idCasa)) {
        this.removeFavorite(house);
      } else {
        this.addFavorite(house);
      }
    },
    // Guardar favoritos en localStorage
    saveFavorites() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
  },
});