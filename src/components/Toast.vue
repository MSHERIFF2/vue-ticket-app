<template>
  <transition name="fade">
    <div
      v-if="visible"
      :class="`fixed top-6 right-6 px-6 py-3 rounded-lg shadow text-white ${color}`"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);
const message = ref("");
const color = ref("bg-gray-800");

function showToast(text, type = "info") {
  message.value = text;
  color.value =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-gray-800";
  visible.value = true;
  setTimeout(() => (visible.value = false), 2500);
}

defineExpose({ showToast });
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
