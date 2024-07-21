<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const currentTime = ref(new Date().toLocaleTimeString());

function updateClock() {
    currentTime.value = new Date().toLocaleTimeString();
}

let intervalId: number;

onMounted(() => {
    intervalId = setInterval(updateClock, 1000);
});

onUnmounted(() => {
    clearInterval(intervalId);
});
</script>

<template>
    <span class="text-xl font-semibold self-center absolute left-2">{{ currentTime }}</span>
</template>
