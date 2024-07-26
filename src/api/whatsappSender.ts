import { bus } from "@/events/reminderEventEmitter";

export default async function whatsappSender(reminder: string): Promise<void> {
    try {
        const tokenKey = import.meta.env.VITE_APP_TOKEN_KEY;
        const authKey = import.meta.env.VITE_APP_AUTH_KEY;
        const instanceKey = import.meta.env.VITE_APP_INSTANCE_KEY;

        const response = await fetch(
            `https://api.z-api.io/instances/${instanceKey}/token/${tokenKey}/send-text`,
            {
                method: "POST",
                body: JSON.stringify({
                    phone: `5521995727079`,
                    message: reminder
                }),
                headers: {
                    "Content-Type": "application/json",
                    "client-token": `${authKey}`
                }
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch");
        }

        bus.emit("whatsappSendReminder", {
            id: reminder,
            title: "Lembrete enviado para o seu WhatsApp com sucesso.",
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
