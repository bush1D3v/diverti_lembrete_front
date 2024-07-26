<script setup lang="ts">
import CheckGraph from "@/components/CheckGraph.vue";
import EmotionGraph from "@/components/EmotionGraph.vue";
</script>

<template>
    <div class="flex justify-center items-center w-full">
        <ul class="flex justify-around items-center w-10/12 min-h-[95dvh]">
            <li class="flex flex-col text-center w-6/12 relative">
                <CheckGraph />
            </li>
            <li class="flex flex-col text-center w-6/12 relative">
                <EmotionGraph />
            </li>
        </ul>
    </div>
</template>
