<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <div
        :class="cn('rounded-xl border bg-dark text-card-foreground shadow w-[500px]', props.class)"
    >
        <slot />
    </div>
</template>
