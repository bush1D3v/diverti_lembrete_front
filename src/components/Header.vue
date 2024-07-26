<script setup lang="ts">
import ButtonTheme from "./ButtonTheme.vue";
import Clock from "./Clock.vue";
import SearchBar from "./SearchBar.vue";
</script>

<template>
    <header class="max-h-[5dvh] bg-primary flex px- py-1 justify-center">
        <Clock />
        <SearchBar />
        <ButtonTheme />
    </header>
</template>
