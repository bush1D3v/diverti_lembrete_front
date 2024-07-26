import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/home?page=1'
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import("@/views/Home.vue"),
            beforeEnter: (to, from, next) => {
                if (!to.query.page) {
                    next({ path: '/home', query: { page: '1' } });
                } else {
                    next();
                }
            }
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
            path: "/reminders/:emotion/",
            name: "List Emotion Reminders",
            component: () => import("@/views/RemindersEmotion.vue"),
            beforeEnter: (to, from, next) => {
                const emotion = to.params.emotion;
                if (!to.query.page) {
                    next({ path: `/reminders/${emotion}`, query: { page: '1' } });
                } else {
                    next();
                }
            },
            props: route => ({ key: route.params.emotion })
        },
        {
            path: "/not-found/:emotion?",
            name: "Not Found",
            component: () => import("@/views/NotFound.vue")
        },
        {
            path: "/:pathMatch(.*)*",
            redirect: { name: "Not Found" }
        }
    ]
});
