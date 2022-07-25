<script setup lang="ts">
import { fetchContacts } from "@/api";
import { logAxiosError } from "@/util/logging-service";
import { onMounted, ref } from "vue";

const isLoading = ref(false);
const name = ref("");
const phone = ref("");
const addressLines = ref([""]);

const props = defineProps<{
  id: string;
}>();

onMounted(async () => {
  isLoading.value = true;
  try {
    const details = await fetchContacts({ id: parseInt(props.id) });
    const contact = details?.result?.contacts?.[0];

    if (!contact) throw new Error("Unable to fetch details");

    name.value = contact.name;
    phone.value = contact.phone;
    addressLines.value = contact.address_lines;
  } catch (error) {
    logAxiosError(error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="d-flex flex-column p-5">
    <h1>Contact details</h1>

    <form class="d-flex flex-column">
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
          <button class="btn btn-success w-100" :disabled="isLoading || true">
            Update
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
