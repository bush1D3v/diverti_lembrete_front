<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import logoURL from "@/assets/logo.svg";

const is_expanded = ref(localStorage.getItem("is_expanded") === "true");

function toggleMenu() {
    is_expanded.value = !is_expanded.value;
    localStorage.setItem("is_expanded", is_expanded.value.toString());
}

let intervalId: number;

onUnmounted(() => {
    clearInterval(intervalId);
});
</script>

<template>
    <aside :class="`${is_expanded ? 'is-expanded' : ''} left-0`">
        <div class="mb-10">
            <img class="w-8" :src="logoURL" alt="Vue" />
        </div>

        <div class="menu-toggle-wrap">
            <button class="menu-toggle" @click="toggleMenu">
                <span class="material-icons">keyboard_double_arrow_right</span>
            </button>
        </div>

        <h3>Menu</h3>
        <div class="menu">
            <router-link to="/home" class="button">
                <span class="material-icons">home</span>
                <span class="text">Página Inicial</span>
            </router-link>
            <router-link to="/reminders" class="button">
                <span class="material-icons">table_view</span>
                <span class="text">Lembretes</span>
            </router-link>
            <router-link to="/graphs" class="button">
                <span class="material-icons">view_kanban</span>
                <span class="text">Gráficos</span>
            </router-link>
            <router-link to="/reminders/create" class="button">
                <span class="material-icons">add</span>
                <span class="text">Criar</span>
            </router-link>
        </div>

        <div class="flex"></div>

        <div class="menu">
            <router-link to="/settings" class="button">
                <span class="material-icons">settings</span>
                <span class="text">Configurações</span>
            </router-link>
        </div>
    </aside>
</template>

<style scoped>
aside {
    display: flex;
    flex-direction: column;

    background-color: var(--dark);
    color: var(--light);

    width: calc(2rem + 32px);
    overflow: hidden;
    min-height: 95dvh;
    padding: 1rem;

    transition: 0.2s ease-in-out;

    .flex {
        flex: 1 1 0%;
    }

    .menu-toggle-wrap {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;
        position: relative;
        top: 0;
        transition: 0.2s ease-in-out;

        .menu-toggle {
            transition: 0.2s ease-in-out;
            .material-icons {
                font-size: 2rem;
                color: var(--light);
                transition: 0.2s ease-out;
            }

            &:hover {
                .material-icons {
                    color: var(--primary);
                    transform: translateX(0.5rem);
                }
            }
        }
    }

    h3,
    .button .text {
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }

    h3 {
        color: var(--grey);
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
    }

    .menu {
        margin: 0 -1rem;

        .button {
            display: flex;
            align-items: center;
            text-decoration: none;

            transition: 0.2s ease-in-out;
            padding: 0.5rem 1rem;

            .material-icons {
                font-size: 2rem;
                color: var(--light);
                transition: 0.2s ease-in-out;
            }
            .text {
                color: var(--light);
                transition: 0.2s ease-in-out;
            }

            &:hover {
                background-color: var(--dark-alt);

                .material-icons,
                .text {
                    color: var(--primary);
                }
            }

            &.router-link-exact-active {
                background-color: var(--dark-alt);
                border-right: 5px solid var(--primary);

                .material-icons,
                .text {
                    color: var(--primary);
                }
            }
        }
    }

    .footer {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;

        p {
            font-size: 0.875rem;
            color: var(--grey);
        }
    }

    &.is-expanded {
        width: var(--sidebar-width);

        .menu-toggle-wrap {
            top: -3rem;

            .menu-toggle {
                transform: rotate(-180deg);
            }
        }

        h3,
        .button .text {
            opacity: 1;
        }

        .button {
            .material-icons {
                margin-right: 1rem;
            }
        }

        .footer {
            opacity: 0;
        }
    }

    @media (max-width: 1024px) {
        position: absolute;
        z-index: 99;
    }
}
</style>
