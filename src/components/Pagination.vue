<script setup lang="ts">
import {
    Pagination,
    PaginationEllipsis,
    PaginationFirst,
    PaginationLast,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

const props = defineProps<{
    page: number;
    total: number;
}>();
</script>

<template>
    <Pagination
        v-slot="{ page }"
        :total="props.total"
        :sibling-count="1"
        show-edges
        :default-page="props.page"
    >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
            <PaginationFirst @click="$emit('update:page', 1)" />
            <PaginationPrev @click="$emit('update:page', page - 1)" />

            <template v-for="(item, index) in items">
                <PaginationListItem
                    v-if="item.type === 'page'"
                    :key="index"
                    :value="item.value"
                    as-child
                >
                    <Button
                        class="w-9 h-9 p-0"
                        :variant="item.value === page ? 'default' : 'outline'"
                        @click="$emit('update:page', item.value)"
                    >
                        {{ item.value }}
                    </Button>
                </PaginationListItem>
                <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>

            <PaginationNext @click="$emit('update:page', page + 1)" />
            <PaginationLast @click="$emit('update:page', Math.ceil(props.total / 10))" />
        </PaginationList>
    </Pagination>
</template>
