<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { onMounted } from "vue";

const themeColors: { [key: string]: string } = {
    happiness: "#f0aa0a",
    angry: "#d21400",
    anxiety: "#dc6f1e",
    sad: "#224b9c",
    boredom: "#4240c6",
    shame: "#d33793",
    fear: "#632d93",
    disgust: "#39922b",
    envy: "#029286"
};

function setTheme(theme: string) {
    const color = themeColors[theme] || "#f0aa0a";
    localStorage.setItem("theme", theme);
    document.documentElement.style.setProperty("--primary", color);
}

onMounted(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        setTheme(savedTheme);
    }
});
</script>

<template>
    <div class="absolute right-2">
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="outline" class="scale-90 bg-dark text-light"> Tema </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-56">
                <DropdownMenuLabel>Emoção</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem class="flex justify-between" @click="setTheme('happiness')">
                        <span>Alegria</span>
                        <div class="w-2 h-2 rounded-full bg-happiness" />
                    </DropdownMenuItem>
                    <DropdownMenuItem class="flex justify-between" @click="setTheme('angry')">
                        <span>Raiva</span>
                        <div class="w-2 h-2 rounded-full bg-angry" />
                    </DropdownMenuItem>
                    <DropdownMenuItem class="flex justify-between" @click="setTheme('anxiety')">
                        <span>Ansiedade</span>
                        <div class="w-2 h-2 rounded-full bg-anxiety" />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem class="flex justify-between" @click="setTheme('sad')">
                        <span>Tristeza</span>
                        <div class="w-2 h-2 rounded-full bg-sad" />
                    </DropdownMenuItem>
                    <DropdownMenuItem class="flex justify-between" @click="setTheme('boredom')">
                        <span>Tédio</span>
                        <div class="w-2 h-2 rounded-full bg-boredom" />
                    </DropdownMenuItem>
                    <DropdownMenuItem class="flex justify-between" @click="setTheme('shame')">
                        <span>Vergonha</span>
                        <div class="w-2 h-2 rounded-full bg-shame" />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem class="flex justify-between" @click="setTheme('fear')">
                        <span>Medo</span>
                        <div class="w-2 h-2 rounded-full bg-fear" />
                    </DropdownMenuItem>
                    <DropdownMenuItem class="flex justify-between" @click="setTheme('disgust')">
                        <span>Nojinho</span>
                        <div class="w-2 h-2 rounded-full bg-disgust" />
                    </DropdownMenuItem>
                    <DropdownMenuItem class="flex justify-between" @click="setTheme('envy')">
                        <span>Inveja</span>
                        <div class="w-2 h-2 rounded-full bg-envy" />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
</template>
