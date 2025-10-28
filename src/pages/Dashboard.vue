<template>
   
 
  <section class="min-h-screen bg-gray-50 py-10 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-10">
        <h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
        <button
          @click="logout"
          class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <!-- Ticket Stats -->
      <div class="grid md:grid-cols-3 gap-6 mb-10">
       
        <div class="bg-white p-6 rounded-xl shadow text-center">
          <h2 class="text-2xl font-bold text-[#16a34a]">{{ openTickets }}</h2>
          <p class="text-gray-600">Open</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow text-center">
          <h2 class="text-2xl font-bold text-[#f59e0b]">{{ inProgressTickets }}</h2>
          <p class="text-gray-600">In Progress</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow text-center">
          <h2 class="text-2xl font-bold text-[#9ca3af]">{{ closedTickets }}</h2>
          <p class="text-gray-600">Closed</p>
        </div>
         <div class="bg-white p-6 rounded-xl shadow text-center">
          <h2 class="text-2xl font-bold">{{ totalTickets }}</h2>
          <p class="text-gray-600">Total Tickets</p>
        </div>
      </div>

      <RouterLink
        to="/tickets"
        class="bg-blue-600 text-white text-center flex px-6 py-3 mx-auto w-1/5 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Manage Tickets
      </RouterLink>
    </div>

    <Toast ref="toast" />
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useAuthStore } from "../stores/auth";
import Toast from "../components/Toast.vue";


const router = useRouter();
const auth = useAuthStore();
const toast = ref(null);
const tickets = ref([]);

const totalTickets = computed(() => tickets.value.length);
const openTickets = computed(() =>
  tickets.value.filter((t) => t.status === "open").length
);
const inProgressTickets = computed(() =>
  tickets.value.filter((t) => t.status === "in_progress").length
);
const closedTickets = computed(() =>
  tickets.value.filter((t) => t.status === "closed").length
);

function loadTickets() {
  tickets.value = JSON.parse(localStorage.getItem("ticketapp_tickets")) || [];
}

onMounted(loadTickets);

function logout() {
  auth.logout();
  toast.value.showToast("Logged out successfully!", "success");
  setTimeout(() => router.push("/"), 1000);
}
</script>
