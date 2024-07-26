import type { Reminder } from "@/types/Reminder";
import { useReminderStore, useRecentRemindersStore } from "@/stores/reminderStore";
import type { Router } from "vue-router";

const reminderStore = useReminderStore();
const recentRemindersStore = useRecentRemindersStore();

interface Reminders {
    reminders: Reminder[];
    total: number;
}

interface ReminderResponse {
    statusCode: number;
    data: Reminders;
}

export default async function reminderList(page: number, router?: Router, limit: number = 10, emotion?: string): Promise<number | undefined> {
    try {
        let url: string;
        if (emotion) {
            url = `http://localhost:8888/reminders?page=${page}&limit=${limit}&emotion=${emotion}`
        } else {
            url = `http://localhost:8888/reminders?page=${page}&limit=${limit}`
        }

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status === 404) {
            if (emotion) {
                router?.push({ name: "Not Found", params: { emotion } });
            } else {
                router?.push({ name: "Not Found" });
            }
        }

        if (!response.ok) {
            throw new Error("Failed to fetch");
        }

        const jsonData: ReminderResponse = await response.json();

        if (limit === 3) {
            jsonData.data.reminders.forEach((reminder: Reminder) =>
                recentRemindersStore.addRecentReminder(reminder)
            );
        } else {
            jsonData.data.reminders.forEach((reminder: Reminder) =>
                reminderStore.addReminder(reminder)
            );
        }

        return jsonData.data.total;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
