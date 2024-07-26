<script setup lang="ts">
import Accordion from "@/components/Accordion.vue";
import { useRecentRemindersStore } from "@/stores/reminderStore";
import { EmotionsEnum } from "@/enum/EmotionsEnum";
import { onMounted } from "vue";
import { reminderList } from "@/api";

const recentReminderStore = useRecentRemindersStore();

onMounted(async () => {
    if (recentReminderStore.reminders.length > 0) return;
    if (recentReminderStore.reminders.length !== 3) reminderList(1, undefined, 3);
});
</script>

<template>
    <div class="flex w-full h-[92dvh] items-center overflow-y-hidden">
        <div class="h-full flex flex-col justify-center gap-4 ml-10 mr-14">
            <div class="flex gap-2 justify-center">
                <span class="text-3xl mt-[2px] text-light material-symbols-outlined">
                    history
                </span>
                <h1 class="text-light text-3xl">RECENTES</h1>
            </div>
            <ul class="text-light flex flex-col justify-center gap-4">
                <li
                    v-for="reminder in recentReminderStore.reminders"
                    :key="reminder.id"
                    class="group flex flex-col relative bg-dark p-3 gap-3 w-56 h-56 rounded-md"
                >
                    <div
                        class="w-12 h-2 rounded-full"
                        :class="EmotionsEnum.getBackgroundEmotion(reminder.emotion)"
                    />
                    <RouterLink :to="`/reminder/${reminder.id}`">
                        <h3
                            class="line-clamp-4 hover:underline hover:text-blue-500 ease-in-out duration-75"
                        >
                            {{ reminder.text }}
                        </h3>
                    </RouterLink>
                    <div class="absolute left-0 bottom-0 w-full p-3 flex justify-between items-end">
                        <p class="">
                            {{
                                new Date(reminder.date).toLocaleDateString("pt-BR", {
                                    year: "2-digit",
                                    month: "2-digit",
                                    day: "2-digit"
                                })
                            }}
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <Accordion />
    </div>
</template>
