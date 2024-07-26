import { bus } from "@/events/countReminderEventEmitter";
import type { Count } from "@/types/Count";

interface CountResponse {
    statusCode: number;
    data: Count;
}

export default async function reminderCounts(): Promise<undefined> {
    try {
        const response = await fetch(`http://localhost:8888/reminders/count`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch");
        }

        const jsonData: CountResponse = await response.json();

        bus.emit("objectReminder", {
            count: jsonData.data
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
