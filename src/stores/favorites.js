import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        favoriteHouses: ref([])
    }),
    

})