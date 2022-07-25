<script setup lang="ts">
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { getToken } from "@/util/storage-service";
import { computed, onMounted } from "vue";

const authStore = useAuthStore();

onMounted(() => {
  const token = getToken();

  if (token) {
    router.push("/contacts");
  }
});

const isAuthenticated = computed(() => !!authStore.token);
const userName = computed(() => authStore.name);

const handleLogout = () => {
  authStore.logout();
};
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <a class="navbar-brand px-2 m-0" href="#">Phone Book</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 flex-grow-1">
            <li class="nav-item">
              <RouterLink
                class="nav-link active"
                v-if="isAuthenticated"
                to="/contacts"
              >
                Contacts
              </RouterLink>
            </li>
            <li v-if="isAuthenticated" class="nav-item dropdown ms-auto">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ userName }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <RouterLink
                    class="nav-link dropdown-item"
                    v-if="isAuthenticated"
                    to="/logout"
                    @click="handleLogout"
                  >
                    Logout
                  </RouterLink>
                </li>
              </ul>
            </li>
            <li v-if="!isAuthenticated" class="nav-item dropdown ms-auto">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Welcome
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <RouterLink
                    class="nav-link dropdown-item"
                    v-if="!isAuthenticated"
                    to="/login"
                    >Login</RouterLink
                  >
                </li>
                <li>
                  <RouterLink
                    class="nav-link dropdown-item"
                    v-if="!isAuthenticated"
                    to="/signup"
                  >
                    Signup
                  </RouterLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  border-left: 1px solid var(--color-border);
}
</style>
