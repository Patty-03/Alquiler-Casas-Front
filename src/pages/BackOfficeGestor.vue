<script setup>
import SideBarBackOffice from '../components/backOfficeGestor/HeaderBackOffice.vue';
</script>

<template>
    <header>
        <SideBarBackOffice></SideBarBackOffice>
    </header>
    <main class="d-flex align-center justify-center mt-10">
            <router-view></router-view>
    </main>
</template>
