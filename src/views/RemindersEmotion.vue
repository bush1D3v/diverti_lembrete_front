<script setup lang="ts">
import { reminderList, reminderCheck } from "@/api";
import { useReminderStore } from "@/stores/reminderStore";
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { EmotionsEnum } from "@/enum/EmotionsEnum";
import CrossCheckIcon from "@/components/CrossCheckIcon.vue";
import WhatsAppIcon from "@/components/WhatsAppIcon.vue";
import TrashIcon from "@/components/TrashIcon.vue";
import Pagination from "@/components/Pagination.vue";
import ReminderSkeleton from "@/components/ReminderSkeleton.vue";

const route = useRoute();
const router = useRouter();

const reminderStore = useReminderStore();

const page = ref(route.query.page);
const total = ref(0);
let emotion = String(route.params.emotion);

async function updatePage(value: number) {
    router.push({ query: { ...route.query, page: value.toString() } });
    reminderStore.reminders = [];
    total.value = (await reminderList(value, router, 10, emotion)) as number;
}

onMounted(async () => {
    reminderStore.reminders = [];
    total.value = (await reminderList(Number(page.value) || 1, router, 10, emotion)) as number;
});

onBeforeRouteLeave(() => {
    reminderStore.reminders = [];
});
</script>

<template>
    <div class="flex flex-col justify-around items-center h-[95dvh] w-full">
        <ReminderSkeleton v-if="reminderStore.reminders.length === 0" />
        <ul v-else class="text-light grid grid-cols-5 justify-center grid-rows-2 gap-20">
            <li
                v-for="reminder in reminderStore.reminders"
                :key="reminder.id"
                class="group flex flex-col relative bg-dark p-3 gap-3 w-56 h-56 shadow-2xl shadow-slate-600 rounded-md"
            >
                <CrossCheckIcon
                    :checked="reminder.check"
                    :function="reminderCheck"
                    :id="reminder.id"
                    :tooltip="
                        reminder.check
                            ? 'Marcar como \'não concluído\''
                            : 'Marcar como \'concluído\''
                    "
                />
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
                    <div class="flex gap-2 -mb-1">
                        <WhatsAppIcon :text-class="'text-lg mt-1'" :text="reminder.text" />
                        <TrashIcon
                            :total="total"
                            :text-class="'text-2xl'"
                            :id="reminder.id"
                            :router="router"
                            :route="route"
                        />
                    </div>
                </div>
            </li>
        </ul>
        <Pagination :total="total" :page="Number(page)" @update:page="updatePage($event)" />
    </div>
</template>
