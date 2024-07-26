<script setup lang="ts">
import type { Reminder } from "@/types/Reminder";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { reminderCheck } from "@/api";
import { EmotionsEnum } from "@/enum/EmotionsEnum";
import reminderDetail from "@/api/reminderDetail";
import CrossCheckIcon from "@/components/CrossCheckIcon.vue";
import WhatsAppIcon from "@/components/WhatsAppIcon.vue";
import TrashIcon from "@/components/TrashIcon.vue";

const route = useRoute();
const router = useRouter();
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
    <div class="flex justify-center items-center w-full">
        <li
            :key="reminder.id"
            v-if="reminder"
            class="group text-light flex flex-col relative bg-dark p-3 gap-3 w-96 h-96 shadow-2xl shadow-slate-600 rounded-md"
        >
            <CrossCheckIcon
                :checked="reminder.check"
                :function="reminderCheck"
                :id="reminder.id"
                :size-class="'w-9 h-9'"
                :tooltip="
                    reminder.check ? 'Marcar como \'não concluído\'' : 'Marcar como \'concluído\''
                "
            />
            <router-link
                :to="`/reminders/${reminder.emotion}`"
                class="w-32 h-6 rounded-full text-center items-center justify-center hover:opacity-50 ease-in-out duration-75"
                :class="EmotionsEnum.getBackgroundEmotion(reminder.emotion)"
            >
                <p class="font-medium">
                    {{ EmotionsEnum.translateEmotionToPT(reminder.emotion) }}
                </p>
            </router-link>
            <h1 class="text-3xl">
                {{ reminder.text }}
            </h1>
            <div class="absolute left-0 bottom-0 w-full p-3 flex justify-between items-end">
                <p class="text-3xl">
                    {{
                        new Date(reminder.date).toLocaleDateString("pt-BR", {
                            year: "2-digit",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit"
                        })
                    }}
                </p>
                <div class="flex gap-2 -mb-[14px]">
                    <WhatsAppIcon :text-class="'text-[40px]'" :text="reminder.text" />
                    <TrashIcon
                        :total="1"
                        :text-class="'text-5xl'"
                        :id="reminder.id"
                        :router="router"
                        :route="route"
                    />
                </div>
            </div>
        </li>
    </div>
</template>
