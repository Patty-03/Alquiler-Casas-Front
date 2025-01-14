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
    isLoggedIn: !!localStorage.getItem('authToken')
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post('http://localhost:5048/api/Login/login', credentials);
        this.token = response.data.token
        localStorage.setItem('authToken', this.token)
        this.decodedToken = decodeJWT(this.token)
        this.userId = this.decodedToken.sub
        localStorage.setItem('userId', this.userId)
        this.userRol = this.decodedToken.role
        this.isLoggedIn = true;
        this.error = null;
        this.loadFavorites();
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
    },
    loadFavorites() {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      this.favorites = storedFavorites.map(fav => ({ ...fav, liked: true })); 
    },
    addFavorite(house) {
      this.favorites.push(house);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    removeFavorite(house) {
      this.favorites = this.favorites.filter(fav => fav.id !== house.id);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    toggleFavorite(house) {
      if (this.favorites.some(fav => fav.id === house.id)) {
        this.removeFavorite(house);
      } else {
        this.addFavorite(house);
      }
    }
  }
});
