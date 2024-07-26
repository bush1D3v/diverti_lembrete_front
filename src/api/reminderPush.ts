import type { Reminder } from "@/types/Reminder";
import { useReminderStore } from "@/stores/reminderStore";

const reminderStore = useReminderStore();

interface Reminders {
    reminders: Reminder[];
}

interface ReminderResponse {
    statusCode: number;
    data: Reminders;
}

export default async function reminderPush(page: number): Promise<void> {
    try {
        const offset = ((page - 1) * 10) + 9;
        const response = await fetch(`http://localhost:8888/reminders?limit=1&offset=${offset}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch");
        }

        const jsonData: ReminderResponse = await response.json();
        jsonData.data.reminders.forEach((reminder: Reminder) =>
            reminderStore.addReminder(reminder)
        );
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
