<script setup lang="ts">
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { RouteLocationNormalizedLoadedGeneric } from "vue-router";
import type { Router } from "vue-router";

const props = defineProps<{
    id: string;
    route?: RouteLocationNormalizedLoadedGeneric;
    total?: number;
    router?: Router;
    title: string;
    description: string;
    tooltip: string;
    function: (
        id: string,
        total?: number,
        router?: Router,
        route?: RouteLocationNormalizedLoadedGeneric
    ) => void;
}>();
</script>

<template>
    <AlertDialog>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger as-child>
                    <AlertDialogTrigger as-child>
                        <slot name="trigger"></slot>
                    </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>{{ props.tooltip }}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{{ props.title }}</AlertDialogTitle>
                <AlertDialogDescription>
                    {{ props.description }}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                    @click="props.function(props.id, props.total, props.router, props.route)"
                >
                    Continuar
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>
