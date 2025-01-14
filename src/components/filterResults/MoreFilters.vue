<script setup>
</script>

<template>
    <v-container>
        <v-app-bar scroll-behavior="hide" elevation="1" class="d-flex align-center justify-center">
            <v-list class="d-flex flex-row flex-wrap align-center justify-center">
                <v-list-item>
                    <v-chip :ripple="false" link>Precio<v-icon>mdi-arrow-down</v-icon></v-chip>
                </v-list-item>
                <v-list-item>
                    <v-chip :ripple="false" link>Precio<v-icon>mdi-arrow-up</v-icon></v-chip>
                </v-list-item>
                <v-list-item>
                    <v-chip :ripple="false" link>Mas popular <v-icon>mdi-star</v-icon></v-chip>
                </v-list-item>
            </v-list>
        </v-app-bar>
    </v-container>
</template>