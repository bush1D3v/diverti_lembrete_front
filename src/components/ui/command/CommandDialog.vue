<script setup lang="ts">
import { useForwardPropsEmits } from "radix-vue";
import type { DialogRootEmits, DialogRootProps } from "radix-vue";
import Command from "./Command.vue";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const props = defineProps<DialogRootProps>();
const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <Dialog v-bind="forwarded">
        <DialogContent>
            <Command>
                <slot />
            </Command>
        </DialogContent>
    </Dialog>
</template>
