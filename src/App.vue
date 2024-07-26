<script setup lang="ts">
import { RouterView } from "vue-router";
import Sonner from "./components/ui/sonner/Sonner.vue";
import Header from "./components/Header.vue";
import SideBar from "./components/SideBar.vue";
import Toaster from "./components/ui/toast/Toaster.vue";
</script>

<template>
    <Header />
    <main class="min-h-[95dvh] bg-darkAlt relative flex items-center gap-4">
        <SideBar />
        <RouterView />
        <Toaster />
        <Sonner />
    </main>
</template>
