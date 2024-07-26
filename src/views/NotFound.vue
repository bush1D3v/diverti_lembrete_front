<script setup lang="ts">
import { useRoute } from "vue-router";
import { EmotionsEnum } from "@/enum/EmotionsEnum";
import NotFoundImage from "@/assets/404-image.svg";
import Button from "@/components/ui/button/Button.vue";

const route = useRoute();
const emotion = route.params.emotion;
</script>

<template>
    <div
        v-if="emotion"
        class="flex flex-col items-center justify-center gap-10 min-h-[95dvh] w-full"
    >
        <div class="flex flex-col items-center text-center gap-4">
            <h1 class="text-4xl font-bold text-light max-w-2xl">
                Você tentou acessar a emoção: "{{ EmotionsEnum.translateEmotionToPT(emotion) }}",
                que ainda não existe
            </h1>
            <p class="text-base font-semibold text-accent max-w-3xl">
                A emoção que você tentou acessar não existe, mas você pode criá-la. Clique no botão
                abaixo para criar um novo lembrete emocionante.
            </p>
        </div>
        <img :src="NotFoundImage" alt="Not Found Image" />
        <div class="flex gap-20">
            <router-link to="/reminders/create" class="text-primary underline mt-2">
                <Button
                    class="mt-6 rounded-full text-lg font-semibold p-4 hover:opacity-50 duration-150 ease-in-out"
                >
                    Criar Lembrete
                </Button>
            </router-link>
        </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center gap-10 min-h-[95dvh] w-full">
        <div class="flex flex-col items-center text-center gap-4">
            <h1 class="text-4xl font-bold text-light max-w-xl">
                Você tentou acessar uma página <br />
                que se perdeu pelo caminho
            </h1>
            <p class="text-base font-semibold text-accent max-w-4xl">
                A página que você tentou acessar não existe, mas você pode começar um novo caminho
                voltando para a página inicial ou indo diretamente para os seus lembretes 😀
            </p>
        </div>
        <img :src="NotFoundImage" alt="Not Found Image" />
        <div class="flex gap-20">
            <router-link to="/" class="text-primary underline mt-2">
                <Button
                    class="mt-6 rounded-full text-lg font-semibold p-4 hover:opacity-50 duration-150 ease-in-out"
                >
                    Página Inicial
                </Button>
            </router-link>
            <router-link to="/reminders" class="text-primary underline mt-2">
                <Button
                    class="mt-6 rounded-full text-lg font-semibold p-4 hover:opacity-50 duration-150 ease-in-out"
                >
                    Seus Lembretes
                </Button>
            </router-link>
        </div>
    </div>
</template>
