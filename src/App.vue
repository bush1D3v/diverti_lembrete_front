<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import SideBar from "./components/SideBar.vue";
</script>

<template>
    <Header />
    <main class="min-h-[95dvh] bg-darkAlt relative flex items-center gap-4">
        <SideBar />
        <RouterView />
    </main>
</template>
