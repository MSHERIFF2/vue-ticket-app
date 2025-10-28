<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { onMounted, ref } from "vue";

const router = useRouter();
const auth = useAuthStore();
const ready = ref(false);

onMounted(() => {
  if (!auth.isAuthenticated()) {
    router.push("/auth/login");
  } else {
    ready.value = true;
  }
});
</script>

<template>
  <router-view v-if="ready" />
</template>
