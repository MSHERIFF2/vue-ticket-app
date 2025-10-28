<template>
  <section class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="bg-white p-8 rounded-2xl shadow w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="email" type="email" class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input v-model="password" type="password" class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" required />
        </div>

        <button class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Login</button>

        <p class="text-center text-sm mt-4">
          Don’t have an account?
          <RouterLink to="/auth/signup" class="text-blue-600 hover:underline">Sign up</RouterLink>
        </p>
      </form>
    </div>

    <Toast ref="toast" />
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { z } from "zod";
import Toast from "../../components/Toast.vue";

const router = useRouter();
const auth = useAuthStore();
const toast = ref(null);

const email = ref("");
const password = ref("");

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Password too short"),
});

function handleLogin() {
  try {
    schema.parse({ email: email.value, password: password.value });

    const storedUser = JSON.parse(localStorage.getItem("ticketapp_user"));
    if (!storedUser || storedUser.email !== email.value || storedUser.password !== password.value) {
      toast.value.showToast("Invalid credentials!", "error");
      return;
    }

    auth.login(storedUser);
    toast.value.showToast("Login successful!", "success");
    setTimeout(() => router.push("/dashboard"), 1000);
  } catch (err) {
    toast.value.showToast(err.errors[0].message, "error");
  }
}
</script>
