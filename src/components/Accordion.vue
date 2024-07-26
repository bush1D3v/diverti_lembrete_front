<script setup lang="ts">
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { EmotionsEnum } from "@/enum/EmotionsEnum";

const defaultValue = "item-1";

const accordionItems = [
    {
        value: "anxiety",
        title: "Ansiedade",
        emoji: "fi fi-rr-face-explode",
        content:
            "“A minha função é proteger ela das coisas que ela não pode ver. Eu planejo o futuro!”"
    },
    {
        value: "angry",
        title: "Raiva",
        emoji: "fi fi-rr-angry",
        content: "“Agora já é hora daquele palavrão?”"
    },
    {
        value: "envy",
        title: "Inveja",
        emoji: "fi fi-rr-face-unamused",
        content: "“Desculpa, invejosas recalcadas.”"
    },
    {
        value: "sad",
        title: "Tristeza",
        emoji: "fi fi-rr-sad-tear",
        content: "“Chorar faz eu me acalmar e suportar o peso dos meus problemas.”"
    },
    {
        value: "disgust",
        title: "Nojinho",
        emoji: "fi fi-rr-face-confounded",
        content: "“Isso não é colorido e também não parece um dinossauro. Espere... É brócolis!”"
    },
    {
        value: "boredom",
        title: "Tédio",
        emoji: "fi fi-rr-meh",
        content: "É o quê? Meu telefone? Onde é que tá? "
    },
    {
        value: "happiness",
        title: "Alegria",
        emoji: "fi fi-rr-grin",
        content:
            "“Quer saber? Você não pode se concentrar somente no que dá errado. Sempre há uma maneira de encontrar alguma diversão nas coisas”"
    },
    {
        value: "fear",
        title: "Medo",
        emoji: "fi fi-rr-face-sad-sweat",
        content: "“⁠Vivemos mais um dia! Isso é o que eu chamo de um verdadeiro sucesso.”"
    },
    {
        value: "shame",
        title: "Vergonha",
        emoji: "fi fi-rr-tired",
        content: "Uhul! É, não é? Porquê... hahaha..."
    }
];
</script>

<template>
    <Accordion
        type="single"
        class="w-full text-light overflow-x-hidden"
        collapsible
        :default-value="defaultValue"
    >
        <AccordionItem v-for="item in accordionItems" :key="item.value" :value="item.value">
            <div class="flex items-center">
                <router-link :to="`/reminders/${item.value}`" class="flex items-center">
                    <i
                        :class="item.emoji + ' ' + EmotionsEnum.getTextEmotion(item.value)"
                        class="mt-1 mr-2 no-underline text-4xl hover:opacity-50 ease-in-out duration-75"
                    ></i>
                </router-link>
                <AccordionTrigger>
                    <p class="text-4xl">{{ item.title }}</p>
                </AccordionTrigger>
            </div>
            <AccordionContent>
                <p class="text-2xl">{{ item.content }}</p>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
</template>
