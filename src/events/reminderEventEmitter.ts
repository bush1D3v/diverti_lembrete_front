import { type RouteLocationNormalizedLoadedGeneric, type Router } from "vue-router";
import mitt, { type Emitter } from "mitt";
import { useReminderStore } from "@/stores/reminderStore";
import { useToast } from "@/components/ui/toast/use-toast";
import { toast as sonner } from 'vue-sonner'
import reminderPush from "@/api/reminderPush";

const { toast } = useToast();
const reminderStore = useReminderStore();

type ReminderEvent = {
    id: string;
    title: string;
    router?: Router;
    route?: RouteLocationNormalizedLoadedGeneric;
}

let date = new Date().toLocaleString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
});
date = date.charAt(0).toUpperCase() + date.slice(1);

const events = {
    insertReminder: (payload: ReminderEvent) => {
        sonner(payload.title, {
            description: date,
            action: {
                label: "Visualizar",
                onClick: () => payload.router?.push(`/reminder/${payload.id}`)
            },
        })
    },
    removeReminder: (payload: ReminderEvent) => {
        reminderStore.removeReminder(payload.id);
        toast({
            title: payload.title,
            description: date
        });
    },
    checkReminder: (payload: ReminderEvent) => {
        const reminder = reminderStore.detailReminder(payload.id);
        if (!reminder) {
            toast({
                title: "Erro inesperado no servidor, tente novamente depois.",
                description: date
            });
            return;
        }
        reminderStore.checkReminder(payload.id, !reminder.check);
        toast({
            title: payload.title,
            description: date
        });
    },
    whatsappSendReminder: (payload: ReminderEvent) => {
        toast({
            title: payload.title,
            description: date
        });
    },
    pushReminder: async (payload: ReminderEvent) => {
        const page = Number(payload.route?.query?.page) || 1;
        await reminderPush(page);
    }
};

type EventSchema<T extends Record<string, (payload: ReminderEvent) => void>> = {
    [ K in keyof T ]: Parameters<T[ K ]>[ 0 ];
};
type MittSchema = EventSchema<
    typeof events & {
        all: (payload: ReminderEvent) => void;
    }
>;
export const bus: Emitter<MittSchema> = mitt<MittSchema>();

bus.on("*", (type: unknown, payload) => {
    events[ type as keyof typeof events ](payload);
});
