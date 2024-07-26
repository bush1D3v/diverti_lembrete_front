<script setup lang="ts">
import { ref, watch, type PropType } from "vue";
import { DateFormatter, type DateValue, getLocalTimeZone } from "@internationalized/date";
import { CalendarIcon } from "@radix-icons/vue";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const df = new DateFormatter("pt-BR", {
    dateStyle: "long"
});

const props = defineProps({
    modelValue: Object as PropType<DateValue>
});
const emits = defineEmits(["update:modelValue"]);

const value = ref<DateValue>(props.modelValue as DateValue);

watch(
    value,
    (newValue) => {
        emits("update:modelValue", newValue);
    },
    { deep: true }
);
</script>

<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button
                variant="outline"
                :class="
                    cn(
                        'justify-start text-left font-normal flex-nowrap bg-darkAlt hover:bg-transparent w-[240px]',
                        !value && 'text-muted-foreground'
                    )
                "
            >
                <CalendarIcon class="mr-2 h-4 w-4 text-accent" />
                <p class="text-accent" aria-required="true">
                    {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Selecione uma data" }}
                </p>
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
            <Calendar v-model="value as DateValue | DateValue[] | undefined" initial-focus />
        </PopoverContent>
    </Popover>
</template>
