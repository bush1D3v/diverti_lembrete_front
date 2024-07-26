import { EmotionsEnum } from "@/enum/EmotionsEnum";
import { bus } from "@/events/reminderEventEmitter";
import { type DateValue } from "@internationalized/date";
import type { Router } from "vue-router";

interface reminderCreateBody {
    text: string;
    emotion: string;
    date: DateValue;
    hour: string;
    router: Router;
}

interface values {
    day: number;
    month: number;
    year: number;
}

interface dateValue {
    _value: values;
}

export default async function reminderCreate(reminder: reminderCreateBody): Promise<undefined> {
    try {
        const values = reminder.date as unknown as dateValue;
        const { day, month, year } = values._value;

        const date = `${year}-${month}-${day} ${reminder.hour}:00`;

        const body = {
            text: reminder.text,
            emotion: EmotionsEnum.translateEmotionToENG(reminder.emotion),
            date,
        };

        const response = await fetch(`http://localhost:8888/reminders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "Location"
            },
            body: JSON.stringify(body)
        });

        const location = response.headers.get("Location");

        bus.emit("insertReminder", {
            id: location?.split("/").pop() as string,
            title: "Lembrete criado com sucesso.",
            router: reminder.router
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
