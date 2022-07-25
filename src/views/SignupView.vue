<script setup lang="ts">
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { logAxiosError } from "@/util/logging-service";
import { ref } from "vue";

const authStore = useAuthStore();

const isLoading = ref(false);
const name = ref("");
const email = ref("");
const password = ref("");
const passwordRepeat = ref("");

const handleSignup = async (e: Event) => {
  e.preventDefault();

  if (password.value !== passwordRepeat.value) {
    alert("Passwords do not match, please try again");
    return;
  }

  try {
    isLoading.value = true;
    await authStore.signup({
      name: name.value,
      email: email.value,
      password: password.value,
    });
    router.push("/contacts");
  } catch (error) {
    logAxiosError(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="d-flex flex-column p-5">
    <h1>Signup</h1>

    <form class="login-form" @submit="handleSignup">
      <input
        v-model="name"
        type="text"
        name="name"
        placeholder="Name"
        required
      />
      <input
        v-model="email"
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <input
        v-model="password"
        type="password"
        name="password"
        placeholder="Password"
        required
      />
      <input
        v-model="passwordRepeat"
        type="password"
        name="passwordRepeat"
        placeholder="Repeat password"
        required
      />

      <button :disabled="isLoading" type="submit">Signup</button>
    </form>
  </div>
</template>

<style></style>
