import mitt, { type Emitter } from "mitt";
import { useCountObjectStore } from "@/stores/reminderCountStore";
import type { CountObject } from "@/types/CountObject";
import type { Count } from "@/types/Count";

const objectCountStore = useCountObjectStore();

type CountReminderEvent = {
    count: Count;
};

const events = {
    objectReminder: (payload: CountReminderEvent) => {
        const objectData: CountObject[] = Object.entries(payload.count).map(([ name, total ]) => ({
            name,
            count: total
        }));

        objectCountStore.setCount(objectData);
    }
};

type EventSchema<T extends Record<string, (payload: CountReminderEvent) => void>> = {
    [ K in keyof T ]: Parameters<T[ K ]>[ 0 ];
};
type MittSchema = EventSchema<
    typeof events & {
        all: (payload: CountReminderEvent) => void;
    }
>;
export const bus: Emitter<MittSchema> = mitt<MittSchema>();

bus.on("*", (type: unknown, payload) => {
    events[ type as keyof typeof events ](payload);
});
