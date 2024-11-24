<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    id: {
        type: String, 
        required: true
    }
})

</script>

<template>
    <h1>Esta es la casa <span>{{ id }}</span></h1>
</template>