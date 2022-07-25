<script setup lang="ts">
import { computed, type ComputedRef } from "vue";

import type { Contact } from "@/types";

const props = defineProps<{
  contact: Contact;
  isSelected?: boolean;
}>();

const emit = defineEmits<{
  (e: "click:item", contact: Contact): void;
  (e: "delete:item", contact: Contact): void;
}>();

const fullAddress: ComputedRef<string> = computed(() => {
  const { address_lines } = props.contact;

  return address_lines?.join(", ");
});
</script>

<template>
  <tr
    :class="{ selected: props.isSelected }"
    class="contact"
    @click="emit('click:item', props.contact)"
  >
    <td>
      {{ props.contact.name }}
    </td>
    <td>
      {{ props.contact.phone }}
    </td>
    <td>
      {{ fullAddress }}
    </td>
    <td>
      <button
        class="btn btn-danger"
        @click.stop="emit('delete:item', props.contact)"
      >
        Delete
      </button>
    </td>
  </tr>
</template>
