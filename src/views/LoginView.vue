<script setup lang="ts">
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";

const isLoading = ref(false);
const email = ref("");
const password = ref("");
const buttonText = ref("Login");

const authStore = useAuthStore();

const handleLogin = async (e: Event) => {
  e.preventDefault();
  buttonText.value = "Loading";
  isLoading.value = true;
  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    });
  } catch (error) {
    console.error("Error during login");
  }
  buttonText.value = "Log in";
  isLoading.value = false;
  router.push("/contacts");
};
</script>
<template>
  <div class="d-flex flex-column p-5 form-signin w-100 m-auto text-center">
    <form @submit="handleLogin">
      <img class="mb-4" src="/favicon.ico" />
      <h1 class="h3 mb-3 fw-normal">Please log in</h1>

      <div class="form-floating">
        <input
          v-model="email"
          type="email"
          name="email"
          id="email"
          class="form-control"
          placeholder="john.doe@example.com"
          required
        />
        <label for="email">Email address</label>
      </div>
      <div class="form-floating">
        <input
          v-model="password"
          type="password"
          name="password"
          id="password"
          class="form-control"
          placeholder="password"
          required
        />
        <label for="password">Password</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary" :disabled="isLoading">
        {{ buttonText }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
