<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import type { ComboboxItemEmits, ComboboxItemProps } from "radix-vue";
import { ComboboxItem, useForwardPropsEmits } from "radix-vue";
import { cn } from "@/lib/utils";
import { RouterLink } from "vue-router";

const props = defineProps<ComboboxItemProps & { class?: HTMLAttributes["class"]; to: string }>();
const emits = defineEmits<ComboboxItemEmits>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <RouterLink
        :to="props.to"
        :class="cn('relative flex items-center rounded-sm text-sm hover:bg-slate-600', props.class)"
    >
        <ComboboxItem
            v-bind="forwarded"
            :class="
                cn(
                    'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50',
                    props.class
                )
            "
        >
            <slot />
        </ComboboxItem>
    </RouterLink>
</template>
