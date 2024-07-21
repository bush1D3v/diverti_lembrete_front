<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

const emotion = route.params.emotion;
</script>

<template>
    <h1 class="text-red-600">This is an page to {{ emotion }} reminders</h1>
</template>
