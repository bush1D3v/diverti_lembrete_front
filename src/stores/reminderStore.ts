import { ref } from "vue";
import { defineStore } from "pinia";

import type { Reminder } from "@/types/Reminder";

export const useReminderStore = defineStore("reminder", () => {
    const reminders = ref<Reminder[]>([]);

    function addReminder(reminder: Reminder) {
        reminders.value.push(reminder);
    }

    function removeReminder(id: string) {
        reminders.value = reminders.value.filter((reminder) => reminder.id !== id);
    }

    function updateReminder(updatedReminder: Reminder) {
        const index = reminders.value.findIndex((reminder) => reminder.id === updatedReminder.id);
        if (index !== -1) {
            reminders.value[index] = updatedReminder;
        }
    }

    return { reminders, addReminder, removeReminder, updateReminder };
});
