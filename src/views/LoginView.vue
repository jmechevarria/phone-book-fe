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
  buttonText.value = "Login";
  isLoading.value = false;
  router.push("/contacts");
};
</script>

<template>
  <div class="about">
    <h1>Welcome</h1>

    <form class="login-form" @submit="handleLogin">
      <input
        v-model="email"
        type="email"
        name="email"
        placeholder="john.doe@example.com"
        required
      />

      <input
        v-model="password"
        type="password"
        name="password"
        placeholder="password"
        required
      />

      <button :disabled="isLoading">{{ buttonText }}</button>
    </form>
  </div>
</template>

<style></style>
