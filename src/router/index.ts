import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Home",
            component: () => import("@/views/Home.vue")
        },
        {
            path: "/settings",
            name: "Settings",
            component: () => import("@/views/Settings.vue")
        },
        {
            path: "/graphs",
            name: "Graphs",
            component: () => import("@/views/Graphs.vue")
        },
        {
            path: "/reminders",
            name: "List Reminders",
            component: () => import("@/views/Reminders.vue")
        },
        {
            path: "/reminders/create",
            name: "Create Reminder",
            component: () => import("@/views/ReminderCreate.vue")
        },
        {
            path: "/reminder/:id",
            name: "Detail Reminder",
            component: () => import("@/views/ReminderDetail.vue")
        },
        {
            path: "/reminders/:emotion",
            name: "List Emotion Reminders",
            component: () => import("@/views/RemindersEmotion.vue")
        },
        {
            path: "/:pathMatch(.*)*",
            name: "Not Found",
            component: () => import("@/views/NotFound.vue")
        }
    ]
});
