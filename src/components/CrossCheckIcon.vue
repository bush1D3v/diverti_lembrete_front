<script setup lang="ts">
import { CheckCircledIcon, CrossCircledIcon } from "@radix-icons/vue";
import AlertDialog from "./AlertDialog.vue";
const props = defineProps<{
    id: string;
    checked: boolean;
    tooltip: string;
    sizeClass?: string;
    function: (id: string) => void;
}>();
</script>

<template>
    <AlertDialog
        :title="'Deseja mesmo fazer isso?'"
        :description="'Fazendo isso, você estará marcando seu lembrete como \'não concluído\'.'"
        :function="props.function"
        :id="props.id"
        :tooltip="props.tooltip"
    >
        <template #trigger>
            <CheckCircledIcon
                class="text-green-500 absolute right-2 top-2 hover:opacity-50 ease-in-out duration-75 cursor-pointer"
                :class="props.sizeClass ? props.sizeClass : 'w-5 h-5'"
                v-if="props.checked"
            />
        </template>
    </AlertDialog>
    <AlertDialog
        :title="'Deseja mesmo fazer isso?'"
        :description="'Fazendo isso, você estará marcando seu lembrete como \'concluído\'.'"
        :function="props.function"
        :id="props.id"
        :tooltip="props.tooltip"
    >
        <template #trigger>
            <CrossCircledIcon
                v-if="!props.checked"
                class="text-red-500 absolute right-2 top-2 hover:opacity-50 ease-in-out duration-75 cursor-pointer"
                :class="props.sizeClass ? props.sizeClass : 'w-5 h-5'"
            />
        </template>
    </AlertDialog>
</template>
