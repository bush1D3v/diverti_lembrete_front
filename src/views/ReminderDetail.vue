<script setup lang="ts">
import reminderDetail from "@/api/reminderDetail";
import type { Reminder } from "@/types/Reminder";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id as string;
const reminder = ref<Reminder | null>(null);

onMounted(async () => {
    if (id == null) return;
    const response = await reminderDetail(id);
    if (response == undefined) return;
    reminder.value = response.data;
});
</script>

<template>
    <div v-if="reminder">
        <p>{{ reminder.text }}</p>
        <p>{{ reminder.emotion }}</p>
        <p>{{ reminder.date }}</p>
    </div>
</template>
