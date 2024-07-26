import { bus } from "@/events/reminderEventEmitter";
import { type RouteLocationNormalizedLoadedGeneric, type Router } from "vue-router";

export default async function reminderDelete(id: string, total?: number, router?: Router, route?: RouteLocationNormalizedLoadedGeneric): Promise<void> {
    try {
        const response = await fetch(`http://localhost:8888/reminders/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch");
        }

        bus.emit("removeReminder", {
            id,
            title: "Lembrete excluído com sucesso.",
        });
        if (total && total > 10) {
            bus.emit("pushReminder", {
                id,
                title: "Lembrete excluído com sucesso.",
                route,
            })
        }
        if (total === 1) {
            router?.push({ name: "Home" });
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
