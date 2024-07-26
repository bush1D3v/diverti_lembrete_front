import { bus } from "@/events/reminderEventEmitter";

export default async function reminderCheck(id: string): Promise<void> {
    try {
        const response = await fetch(`http://localhost:8888/reminders/${id}/check`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch");
        }

        const jsonData = await response.json();
        const check: boolean = jsonData.data;

        let title: string;

        if (check) {
            title = "Lembrete marcado como 'concluído' com sucesso.";
        } else {
            title = "Lembrete marcado como 'não concluído' com sucesso.";
        }

        bus.emit("checkReminder", {
            id,
            title,
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
