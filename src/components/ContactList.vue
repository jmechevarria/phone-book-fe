<script setup lang="ts">
import { UnauthorizedException } from "@/errors";
import { onMounted, ref } from "vue";

import { deleteContacts, fetchContacts } from "@/api";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import type { Contact } from "@/types";
import { logAxiosError } from "../util/logging-service";
import ContactItem from "./ContactItem.vue";

const isLoading = ref(false);
const contacts = ref<Contact[]>([]);
const selectedContact = ref<Contact | null>(null);
const noMoreContacts = ref(false);
const limit = 2;
let offset = 0;

const authStore = useAuthStore();

onMounted(async () => {
  try {
    loadMore();
  } catch (error: any) {
    logAxiosError(error);

    if (
      error instanceof UnauthorizedException ||
      error.response?.status == 403 ||
      error.response?.status == 401
    ) {
      authStore.logout();
    }
  }
});

const createContact = async () => {
  router.push("/contacts/new");
};

const loadMore = async () => {
  if (noMoreContacts.value) return;

  try {
    isLoading.value = true;
    const data = await fetchContacts({ limit, offset });

    const newContacts = data.result.contacts;
    if (newContacts?.length) {
      contacts.value = newContacts;
    }
    if (newContacts?.length < limit) noMoreContacts.value = true;

    offset += newContacts.length;
  } catch (error: any) {
    logAxiosError(error);

    if (
      error instanceof UnauthorizedException ||
      error.response?.status == 403 ||
      error.response?.status == 401
    ) {
      authStore.logout();
    }
  }

  isLoading.value = false;
};

const onItemClick = (contact: Contact) => {
  selectedContact.value = contact;
  router.push({
    name: "contact-details",
    params: { id: contact.id },
  });
};

const onItemDelete = (contact: Contact) => {
  const index: number = contacts.value.findIndex((c) => c.id === contact.id);
  contacts.value.splice(index, 1);
  if (contact.id === selectedContact.value?.id) {
    selectedContact.value = null;
  }

  try {
    deleteContacts({
      id: contact.id,
    });
    offset--;
  } catch (error: any) {
    logAxiosError(error);

    if (
      error instanceof UnauthorizedException ||
      error.response?.status == 403 ||
      error.response?.status == 401
    ) {
      authStore.logout();
    }
  }
};
</script>

<template>
  <div v-if="isLoading" id="loading">Loading...</div>
  <div v-if="!isLoading" id="actions" class="row justify-content-end">
    <div class="col-auto">
      <button class="btn btn-primary" v-if="!isLoading" @click="loadMore">
        Load More
      </button>
    </div>

    <div class="col-auto">
      <button class="btn btn-success" v-if="!isLoading" @click="createContact">
        Create Contact
      </button>
    </div>
  </div>

  <table v-if="!isLoading" class="table p-5 text-center align-middle">
    <thead>
      <tr>
        <th
          v-for="key in Object.keys(contacts?.[0] || {})
            .filter((k) => k !== 'id' && k !== 'user_id')
            .concat('Actions')"
          :key="key"
        >
          {{ key }}
        </th>
      </tr>
    </thead>
    <tbody>
      <ContactItem
        v-for="contact in contacts"
        :key="contact.id"
        :contact="contact"
        :isSelected="contact.id === selectedContact?.id"
        @click:item="onItemClick"
        @delete:item="onItemDelete"
      />
    </tbody>
  </table>
</template>

<style scoped>
.selected {
  color: white;
  background-color: black;
  font-weight: bold;
}
</style>
