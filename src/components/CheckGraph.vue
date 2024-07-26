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
    <div class="flex flex-col gap-5">
        <h2 v-if="countObjectStore.getCheckComplete()" class="text-light text-4xl">Conclusões</h2>
        <DonutChart
            v-if="countObjectStore.getCheckComplete()"
            index="name"
            category="count"
            :data="countObjectStore.getCheckComplete()"
            :type="'pie'"
            :colors="['#22c55e', '#ff3333']"
        />
        <div v-else class="mt-5 w-full justify-center items-center flex space-x-4">
            <div class="mt-5 flex items-center w-full justify-center">
                <Skeleton class="mt-5 w-72 h-72 rounded-full absolute" />
            </div>
        </div>
    </div>
</template>
