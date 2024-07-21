import type { Reminder } from "@/types/Reminder";

interface ReminderResponse {
    statusCode: number;
    data: Reminder;
}

export default async function remindersList(id: string): Promise<ReminderResponse | undefined> {
    try {
        const response = await fetch(`http://localhost:8888/reminders/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch");
        }

        return await response.json() as ReminderResponse;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
