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

export default async function remindersList() {
    try {
        const response = await fetch(`http://localhost:8888/reminders`, {
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
