<script setup lang="ts">
import { reminderDelete } from "@/api";
import AlertDialog from "./AlertDialog.vue";
import type { RouteLocationNormalizedLoadedGeneric, Router } from "vue-router";

const props = defineProps<{
    id: string;
    total: number;
    textClass: string;
    router: Router;
    route: RouteLocationNormalizedLoadedGeneric;
}>();
</script>

<template>
    <AlertDialog
        :title="'Deseja mesmo fazer isso?'"
        :description="'Fazendo isso, você estará excluindo seu lembrete para sempre. Isso não pode ser desfeito.'"
        :function="reminderDelete"
        :router="props.router"
        :route="props.route"
        :total="props.total"
        :id="props.id"
        :tooltip="'Excluir lembrete'"
    >
        <template #trigger>
            <span
                class="material-icons text-light hover:text-red-500 cursor-pointer ease-in-out duration-75"
                :class="props.textClass"
                >delete_forever</span
            >
        </template>
    </AlertDialog>
</template>
