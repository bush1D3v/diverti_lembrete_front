import { ref } from "vue";
import { defineStore } from "pinia";

import type { Reminder } from "@/types/Reminder";

export const useReminderStore = defineStore("reminder", () => {
    const reminders = ref<Reminder[]>([]);

    function addReminder(reminder: Reminder): void {
        reminders.value.push(reminder);
    }

    function removeReminder(id: string): void {
        reminders.value = reminders.value.filter((reminder) => reminder.id !== id);
    }

    function checkReminder(id: string, check: boolean): void {
        const reminder = reminders.value.find((reminder) => reminder.id === id);
        if (!reminder) {
            return;
        }
        reminder.check = check;
    }

    function detailReminder(id: string): Reminder | undefined {
        const reminder = reminders.value.find((reminder) => reminder.id === id);
        if (!reminder) {
            return;
        }
        return reminder;
    }

    function getChecksValue(): number {
        return reminders.value.filter((reminder) => reminder.check).length;
    }

    function getUnchecksValue(): number {
        return reminders.value.filter((reminder) => !reminder.check).length;
    }

    return { reminders, addReminder, removeReminder, checkReminder, detailReminder, getChecksValue, getUnchecksValue };
});

export const useRecentRemindersStore = defineStore("recentReminders", () => {
    const reminders = ref<Reminder[]>([]);

    function addRecentReminder(reminder: Reminder): void {
        reminders.value.push(reminder);
    }

    return { reminders, addRecentReminder };
});
