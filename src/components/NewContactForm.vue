<script setup lang="ts">
import { createContact } from "@/api";
import router from "@/router";
import { logAxiosError } from "@/util/logging-service";
import { ref } from "vue";

const isLoading = ref(false);
const name = ref("");
const phone = ref("");
const addressLines = ref([]);

const createNewContact = async (e: Event) => {
  e.preventDefault();
  isLoading.value = true;

  try {
    await createContact({
      name: name.value,
      phone: phone.value,
      addressLines: addressLines.value,
    });
    router.push("/contacts");
  } catch (error: any) {
    logAxiosError(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="d-flex flex-column p-5">
    <h1>New Contact</h1>

    <form class="d-flex flex-column" @submit="createNewContact">
      <div class="row">
        <div class="col">
          <input
            v-model="name"
            type="text"
            name="name"
            placeholder="Name"
            required
          />
        </div>
        <div class="col">
          <input
            v-model="phone"
            type="text"
            name="phone"
            placeholder="Phone"
            pattern="^\+?\d{4,15}$"
            required
          />
        </div>
      </div>
      <div class="row mt-3 gy-2 flex-column">
        <label class="form-label">Address lines</label>
        <div class="col">
          <input
            v-model="addressLines[0]"
            type="text"
            class="address-line"
            name="addressLines"
            placeholder="Address line 1"
          />
        </div>
        <div class="col">
          <input
            v-model="addressLines[1]"
            type="text"
            class="address-line"
            name="addressLines"
            placeholder="Address line 2"
          />
        </div>
        <div class="col">
          <input
            v-model="addressLines[2]"
            type="text"
            class="address-line"
            name="addressLines"
            placeholder="Address line 3"
          />
        </div>
      </div>

      <div class="row mt-3">
        <div class="col">
          <button class="btn btn-success w-100" :disabled="isLoading">
            Create
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
input {
  width: 100%;
}
</style>
