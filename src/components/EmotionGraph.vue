<script setup lang="ts">
import { DonutChart } from "@/components/ui/chart-donut";
import { reminderCounts } from "@/api";
import { onMounted } from "vue";
import { Skeleton } from "@/components/ui/skeleton";
import { useCountObjectStore } from "@/stores/reminderCountStore";

const countObjectStore = useCountObjectStore();

onMounted(async () => {
    if (!countObjectStore) return;
    await reminderCounts();
});
</script>

<template>
    <div class="w-full flex flex-col gap-5">
        <h2 v-if="countObjectStore.getEmotionsComplete()" class="text-light text-4xl">Emoções</h2>
        <DonutChart
            index="name"
            category="count"
            v-if="countObjectStore.getEmotionsComplete()"
            :data="countObjectStore.getEmotionsComplete()"
            :type="'pie'"
            :colors="[
                '#f0aa0a',
                '#224b9c',
                '#d21400',
                '#029286',
                '#d33793',
                '#632d93',
                '#39922b',
                '#4449d9',
                '#dc6f1e'
            ]"
        />
        <div v-else class="mt-5 w-full justify-center items-center flex space-x-4">
            <div class="mt-5 flex items-center w-full justify-center">
                <Skeleton class="mt-5 w-72 h-72 rounded-full absolute" />
            </div>
        </div>
    </div>
</template>
