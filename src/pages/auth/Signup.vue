<template>
  <section class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="bg-white p-8 rounded-2xl shadow w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Sign Up</h1>

      <form @submit.prevent="handleSignup" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input v-model="name" class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="email" type="email" class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input v-model="password" type="password" class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" required />
        </div>

        <button class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Create Account</button>

        <p class="text-center text-sm mt-4">
          Already have an account?
          <RouterLink to="/auth/login" class="text-blue-600 hover:underline">Login</RouterLink>
        </p>
      </form>
    </div>

    <Toast ref="toast" />
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { z } from "zod";
import Toast from "../../components/Toast.vue";

const router = useRouter();
const toast = ref(null);

const name = ref("");
const email = ref("");
const password = ref("");

const schema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Password too short"),
});

function handleSignup() {
  try {
    schema.parse({ name: name.value, email: email.value, password: password.value });

    localStorage.setItem("ticketapp_user", JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value,
    }));

    toast.value.showToast("Signup successful!", "success");
    setTimeout(() => router.push("/auth/login"), 1000);
  } catch (err) {
    toast.value.showToast(err.errors[0].message, "error");
  }
}
</script>
