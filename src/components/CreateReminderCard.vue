<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ref } from "vue";
import { type DateValue } from "@internationalized/date";
import reminderCreate from "@/api/reminderCreate";
import DatePicker from "./DatePicker.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const submitting = ref(false);
const dateError = ref(false);

const text = ref("");
const emotion = ref("");
const date = ref<DateValue | undefined>(undefined);
const hour = ref("");

const onsubmit = async () => {
    if (date.value === undefined) {
        dateError.value = true;
        return;
    }

    dateError.value = false;
    submitting.value = true;
    await reminderCreate({
        text: text.value,
        date: date as unknown as DateValue,
        hour: hour.value,
        emotion: emotion.value,
        router
    });
    submitting.value = false;

    text.value = "";
    emotion.value = "";
    date.value = undefined;
    hour.value = "";
};
</script>

<template>
    <Card class="w-[400px]">
        <CardHeader>
            <CardTitle>Crie um Lembrete</CardTitle>
            <CardDescription class="mb-6"> "Lembre-se de tarefas e emoções." </CardDescription>
        </CardHeader>
        <CardContent>
            <form @submit.prevent="onsubmit">
                <div class="grid items-center w-full gap-4">
                    <div>
                        <Label for="text">Texto</Label>
                        <Input
                            name="text"
                            id="text"
                            v-model="text"
                            minlength="10"
                            placeholder="Texto do seu Lembrete"
                            required
                        />
                    </div>
                    <div class="flex flex-col space-y-1.5">
                        <Label for="sentimento">Sentimento</Label>
                        <Select v-model="emotion" required>
                            <SelectTrigger id="sentimento">
                                <SelectValue placeholder="Sentimento do seu Lembrete" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="alegria"> Alegria </SelectItem>
                                <SelectItem value="raiva"> Raiva </SelectItem>
                                <SelectItem value="tristeza"> Tristeza </SelectItem>
                                <SelectItem value="medo"> Medo </SelectItem>
                                <SelectItem value="ansiedade"> Ansiedade </SelectItem>
                                <SelectItem value="vergonha"> Vergonha </SelectItem>
                                <SelectItem value="tédio"> Tédio </SelectItem>
                                <SelectItem value="inveja"> Inveja </SelectItem>
                                <SelectItem value="nojinho"> Nojinho </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="w-full flex justify-end items-end">
                        <div class="flex flex-col space-y-1.5 w-11/12">
                            <div class="flex gap-2 items-center">
                                <Label name="date">Data</Label>
                                <span
                                    v-if="dateError && !date"
                                    class="text-sm font-medium text-red-500"
                                    >Campo obrigatório.</span
                                >
                            </div>
                            <DatePicker
                                name="date"
                                v-model="date as DateValue | undefined"
                                class="w-full"
                            />
                        </div>
                        <div class="relative w-[110px]">
                            <Label class="absolute -top-[18px]" name="hour">Hora</Label>
                            <Input
                                name="hour"
                                id="hour"
                                type="time"
                                v-model="hour"
                                placeholder="Hora"
                                class="text-center"
                                required
                            />
                            <span
                                class="material-icons text-sm text-accent absolute right-4 top-2 pointer-events-none"
                            >
                                schedule
                            </span>
                        </div>
                    </div>
                </div>
                <Button
                    class="mt-5"
                    type="submit"
                    :style="{
                        pointerEvents: submitting ? 'none' : 'auto',
                        cursor: submitting ? 'not-allowed' : 'pointer'
                    }"
                >
                    {{ submitting ? "Criando..." : "Criar" }}
                </Button>
            </form>
        </CardContent>
    </Card>
</template>
