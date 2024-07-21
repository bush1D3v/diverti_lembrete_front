<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { MagnifyingGlassIcon } from "@radix-icons/vue";
import { ComboboxInput, type ComboboxInputProps, useForwardProps } from "radix-vue";
import { cn } from "@/lib/utils";

defineOptions({
    inheritAttrs: false
});

const props = defineProps<
    ComboboxInputProps & {
        class?: HTMLAttributes["class"];
        iconText: string;
    }
>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <MagnifyingGlassIcon class="mr-2 h-4 w-4 shrink-0" :class="`text-${props.iconText}`" />
    <ComboboxInput
        v-bind="{ ...forwardedProps, ...$attrs }"
        autocomplete="on"
        :class="
            cn(
                'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground text-light',
                props.class
            )
        "
    />
</template>
