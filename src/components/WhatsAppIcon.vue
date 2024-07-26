<script setup lang="ts">
import { whatsappSender } from "@/api";
import AlertDialog from "./AlertDialog.vue";

const props = defineProps<{
    text: string;
    textClass: string;
}>();
</script>

<template>
    <AlertDialog
        :title="'Deseja mesmo fazer isso?'"
        :description="'Fazendo isso, você enviará o lembrete para o seu WhatsApp.'"
        :function="whatsappSender"
        :id="
            props.text +
            '\n\n' +
            'Data: ' +
            new Date().toLocaleString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            })
        "
        :tooltip="'Notificar WhatsApp'"
    >
        <template #trigger>
            <i
                class="fi fi-brands-whatsapp text-light hover:text-green-500 cursor-pointer ease-in-out duration-75"
                :class="props.textClass"
            />
        </template>
    </AlertDialog>
</template>
