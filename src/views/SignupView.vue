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
  <div class="d-flex flex-column p-5 form-signup w-100 m-auto text-center">
    <form @submit="handleSignup">
      <img class="mb-4" src="/favicon.ico" />
      <h1 class="h3 mb-3 fw-normal">Please sign up</h1>
      <div class="form-floating">
        <input
          v-model="name"
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          class="form-control"
          required
        />
        <label for="name">Name</label>
      </div>
      <div class="form-floating">
        <input
          v-model="email"
          type="email"
          name="email"
          id="email"
          class="form-control"
          placeholder="Email"
          required
        />
        <label for="email">Email</label>
      </div>

      <div class="form-floating">
        <input
          v-model="password"
          class="form-control"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
        />
        <label for="password">Password</label>
      </div>
      <div class="form-floating">
        <input
          v-model="passwordRepeat"
          class="form-control"
          type="password"
          name="passwordRepeat"
          id="passwordRepeat"
          placeholder="Repeat password"
          required
        />
        <label for="passwordRepeat">Repeat password</label>
      </div>

      <button
        class="w-100 btn btn-lg btn-primary"
        :disabled="isLoading"
        type="submit"
      >
        Signup
      </button>
    </form>
  </div>
</template>

<style scoped>
.form-signup {
  max-width: 330px;
  padding: 15px;
}

.form-signup .form-floating:focus-within {
  z-index: 2;
}

.form-signup input[type="email"] {
  margin-bottom: -1px;
  border-radius: 0;
}

.form-signup #password {
  margin-bottom: -1px;
  border-radius: 0;
}

.form-signup #name {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.form-signup #passwordRepeat {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
