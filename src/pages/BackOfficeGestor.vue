<script setup>
import HeaderBackOffice from '../components/backOfficeGestor/HeaderBackOffice.vue';
import SideBarBackOffice from '../components/backOfficeGestor/SideBarBackOffice.vue';
</script>

<template>
    <header>
        <HeaderBackOffice></HeaderBackOffice>
    </header>
    <SideBarBackOffice></SideBarBackOffice>
    <main class="main">
        <router-view></router-view>
    </main>
</template>

<style scoped>
.main {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

</style>