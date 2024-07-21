<script setup lang="ts">
import { onMounted } from "vue";
import { useReminderStore } from "@/stores/reminderStore";
import remindersList from "@/api/remindersList";
import { EmotionsEnum } from "@/enum/EmotionsEnum";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-icons/vue";

const reminderStore = useReminderStore();

onMounted(async () => {
    if (reminderStore.reminders.length > 0) return;
    remindersList();
});
</script>

<template>
    <div class="flex justify-center items-center w-full">
        <ul class="text-light grid grid-cols-5 justify-center grid-rows-2 gap-20">
            <RouterLink
                v-for="reminder in reminderStore.reminders"
                :key="reminder.id"
                :to="`/reminder/${reminder.id}`"
            >
                <li
                    class="flex flex-col relative bg-dark p-3 gap-3 w-56 h-56 hover:shadow-none hover:bg-opacity-90 border-2 border-transparent hover:border-blue-500 shadow-2xl shadow-slate-600 rounded-md ease-in-out duration-75"
                >
                    <CheckCircledIcon
                        class="w-5 h-5 text-green-500 absolute right-2 top-2"
                        v-if="reminder.check"
                    />
                    <CrossCircledIcon
                        class="w-5 h-5 text-red-500 absolute right-2 top-2"
                        v-if="!reminder.check"
                    />
                    <div
                        class="w-12 h-2 rounded-full"
                        :class="EmotionsEnum.findEmotionColor(reminder.emotion)"
                    />
                    <h3 class="line-clamp-4">{{ reminder.text }}</h3>
                    <p class="absolute bottom-3 left-3">
                        {{
                            new Date(reminder.date).toLocaleDateString("pt-BR", {
                                year: "2-digit",
                                month: "2-digit",
                                day: "2-digit"
                            })
                        }}
                    </p>
                </li>
            </RouterLink>
        </ul>
    </div>
</template>
