<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useMagicKeys } from "@vueuse/core";
import { PlusIcon, CountdownTimerIcon } from "@radix-icons/vue";
import { RoutesEnum } from "@/enum/RoutesEnum";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandDialog
} from "@/components/ui/command";

const inputValue = ref("");

const searchValue = JSON.parse(localStorage.getItem("searchValue") || "[]") as string[];

function saveToLocalStorage(): void {
    const treatedValue = RoutesEnum.findClosestTextMatch(inputValue.value) as string;
    if (!searchValue.includes(treatedValue)) {
        if (searchValue.length === 4) {
            searchValue.shift();
        }
        searchValue.push(treatedValue);
    }

    localStorage.setItem("searchValue", JSON.stringify(searchValue));
    inputValue.value = "";
    blur();
}

const isFocused = ref(false);

function focus() {
    isFocused.value = true;
}

function blur() {
    isFocused.value = false;
}

function handleOpenChange() {
    isFocused.value = !isFocused.value;
}

const { Meta_J, Ctrl_J } = useMagicKeys({
    passive: false,
    onEventFired(e) {
        if (e.key === "j" && (e.metaKey || e.ctrlKey)) e.preventDefault();
    }
});

watch([Meta_J, Ctrl_J], (v) => {
    if (v[0] || v[1]) handleOpenChange();
});

onMounted(() => {
    blur();
});
</script>

<template>
    <Command class="group rounded-lg border shadow-md max-w-[450px] mx-0 z-50 relative">
        <div class="flex items-center border-b bg-light pl-4" cmdk-input-wrapper>
            <CommandInput
                @click="focus"
                :icon-text="'dark'"
                placeholder="Pesquisar..."
                class="w-full"
            />
        </div>
        <kbd
            class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 absolute right-4"
        >
            <span class="text-xs">⌘</span>J
        </kbd>
        <CommandDialog v-model:open="isFocused" class="flex">
            <div class="flex items-center border-b bg-darkAlt pl-4" cmdk-input-wrapper>
                <CommandInput
                    placeholder="Pesquisar..."
                    @input="inputValue = $event.target.value"
                    @keyup.enter="saveToLocalStorage"
                    :icon-text="'light'"
                />
            </div>
            <CommandList>
                <CommandGroup
                    heading="Recentes"
                    v-if="searchValue.length > 0 && inputValue.length === 0"
                >
                    <CommandItem
                        @click="saveToLocalStorage"
                        v-for="item in searchValue"
                        :key="item"
                        :to="RoutesEnum.findClosestRouteMatch(item)"
                        :value="item"
                    >
                        <CountdownTimerIcon class="mr-2 h-4 w-4 text-light" />
                        <span class="text-light">{{ item }}</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                <CommandGroup heading="Sugestões" v-if="inputValue.length === 0">
                    <CommandItem value="Criar" to="/reminders/create" @click="saveToLocalStorage">
                        <PlusIcon class="mr-2 h-4 w-4 text-light" />
                        <span class="text-light">Criar</span>
                    </CommandItem>
                    <CommandItem value="Seus Lembretes" to="/reminders" @click="saveToLocalStorage">
                        <span class="material-icons mr-2 text-base text-light">table_view</span>
                        <span class="text-light">Seus Lembretes</span>
                    </CommandItem>
                </CommandGroup>
                <CommandGroup heading="Recomendado" v-if="inputValue.length > 0">
                    <CommandItem value="Configurações" to="/settings" @click="saveToLocalStorage">
                        <span class="material-icons mr-2 text-base text-light">settings</span>
                        <span class="text-light">Configurações</span>
                    </CommandItem>
                    <CommandItem value="Página Inicial" to="/" @click="saveToLocalStorage">
                        <span class="material-icons mr-2 text-base text-light">home</span>
                        <span class="text-light">Página Inicial</span>
                    </CommandItem>
                    <CommandItem value="Seus Lembretes" to="/reminders" @click="saveToLocalStorage">
                        <span class="material-icons mr-2 text-base text-light">table_view</span>
                        <span class="text-light">Seus Lembretes</span>
                    </CommandItem>
                    <CommandItem value="Gráficos" to="/graphs" @click="saveToLocalStorage">
                        <span class="material-icons mr-2 text-base text-light">view_kanban</span>
                        <span class="text-light">Gráficos</span>
                    </CommandItem>
                    <CommandItem value="Criar" to="/reminders/create" @click="saveToLocalStorage">
                        <span class="material-icons mr-2 text-base text-light">add</span>
                        <span class="text-light">Criar</span>
                    </CommandItem>
                    <CommandItem value="Raiva" to="/reminders/angry" @click="saveToLocalStorage">
                        <i class="fi fi-rr-angry mt-1 mr-2 text-light"></i>
                        <span class="text-light">Raiva</span>
                    </CommandItem>
                    <CommandItem
                        value="Ansiedade"
                        to="/reminders/anxiety"
                        @click="saveToLocalStorage"
                    >
                        <i class="fi fi-rr-face-explode mt-1 mr-2 text-light"></i>
                        <span class="text-light">Ansiedade</span>
                    </CommandItem>
                    <CommandItem value="Tristeza" to="/reminders/sad" @click="saveToLocalStorage">
                        <i class="fi fi-rr-sad-tear mt-1 mr-2 text-light"></i>
                        <span class="text-light">Tristeza</span>
                    </CommandItem>
                    <CommandItem value="Inveja" to="/reminders/envy" @click="saveToLocalStorage">
                        <i class="fi fi-rr-face-unamused mt-1 mr-2 text-light"></i>
                        <span class="text-light">Inveja</span>
                    </CommandItem>
                    <CommandItem
                        value="Nojinho"
                        to="/reminders/disgust"
                        @click="saveToLocalStorage"
                    >
                        <i class="fi fi-rr-face-confounded mt-1 mr-2 text-light"></i>
                        <span class="text-light">Nojinho</span>
                    </CommandItem>
                    <CommandItem value="Tédio" to="/reminders/boredom" @click="saveToLocalStorage">
                        <i class="fi fi-rr-meh mt-1 mr-2 text-light"></i>
                        <span class="text-light">Tédio</span>
                    </CommandItem>
                    <CommandItem
                        value="Alegria"
                        to="/reminders/happiness"
                        @click="saveToLocalStorage"
                    >
                        <i class="fi fi-rr-grin mt-1 mr-2 text-light"></i>
                        <span class="text-light">Alegria</span>
                    </CommandItem>
                    <CommandItem value="Medo" to="/reminders/fear" @click="saveToLocalStorage">
                        <i class="fi fi-rr-face-sad-sweat mt-1 mr-2 text-light"></i>
                        <span class="text-light">Medo</span>
                    </CommandItem>
                    <CommandItem value="Vergonha" to="/reminders/shame" @click="saveToLocalStorage">
                        <i class="fi fi-rr-tired mt-1 mr-2 text-light"></i>
                        <span class="text-light">Vergonha</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    </Command>
</template>
