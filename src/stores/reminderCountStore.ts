import { ref } from "vue";
import { defineStore } from "pinia";

import type { CountObject } from "@/types/CountObject";

export const useCountObjectStore = defineStore("countObject", () => {
    const count = ref<CountObject[]>([]);

    function setCount(countData: CountObject[]) {
        count.value = countData;
    }

    function getCheckComplete() {
        const check = count.value.find((object) => object.name === "checks");
        const uncheck = count.value.find((object) => object.name === "unchecks");

        if (!check || !uncheck) {
            return [
                {
                    name: "Erro",
                    count: 404
                }
            ]
        };

        return [
            {
                name: "Concluídos",
                count: check.count
            },
            {
                name: "Não concluídos",
                count: uncheck.count
            }
        ]
    }

    function getEmotionsComplete(): {
        name: string;
        count: number;
    }[] {
        const emotions = [
            { key: "happiness", name: "Alegria" },
            { key: "sad", name: "Tristeza" },
            { key: "angry", name: "Raiva" },
            { key: "envy", name: "Inveja" },
            { key: "shame", name: "Vergonha" },
            { key: "fear", name: "Medo" },
            { key: "disgust", name: "Nojinho" },
            { key: "boredom", name: "Tédio" },
            { key: "anxiety", name: "Ansiedade" }
        ];

        const results = emotions.map(emotion => {
            const found = count.value.find(object => object.name === emotion.key);
            return found ? { name: emotion.name, count: found.count } : {
                name: "Erro",
                count: 404
            };
        });

        if (!results || !emotions) {
            return [
                {
                    name: "Erro",
                    count: 404
                }
            ]
        };

        return results;
    }

    return { count, setCount, getCheckComplete, getEmotionsComplete };
});
