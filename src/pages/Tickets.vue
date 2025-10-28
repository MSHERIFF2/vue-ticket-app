<template>
  <section class="min-h-screen bg-gray-50 py-10 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">My Tickets</h1>
        <button
          @click="openModal"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + New Ticket
        </button>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="ticket in tickets"
          :key="ticket.id"
          class="bg-white rounded-xl shadow p-4 flex flex-col justify-between"
        >
          <div>
            <h3 class="text-lg font-semibold mb-2">{{ ticket.title }}</h3>
            <p class="text-sm text-gray-600 mb-3">
              {{ ticket.description || "No description" }}
            </p>
            <span
              :class="statusClass(ticket.status)"
              class="text-xs px-3 py-1 rounded-full"
            >
              {{ ticket.status }}
            </span>
          </div>
          <div class="flex justify-end gap-3 mt-4">
            <button
              @click="editTicket(ticket)"
              class="text-blue-600 text-sm hover:underline"
            >
              Edit
            </button>
            <button
              @click="deleteTicket(ticket.id)"
              class="text-red-600 text-sm hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
        <p v-if="tickets.length === 0" class="text-gray-500">
          No tickets yet. Click "New Ticket" to create one.
        </p>
      </div>

      <div class="mt-10">
        <RouterLink
          to="/dashboard"
          class="text-blue-600 hover:underline text-sm"
        >
          ← Back to Dashboard
        </RouterLink>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center"
    >
      <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 class="text-2xl font-semibold mb-4">
          {{ editId ? "Edit Ticket" : "Add Ticket" }}
        </h2>

        <form @submit.prevent="saveTicket" class="space-y-4">
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Title</label>
            <input
              v-model="form.title"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Status</label>
            <select
              v-model="form.status"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div class="flex justify-end gap-3">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>

    <Toast ref="toast" />
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Toast from "../components/Toast.vue";

const toast = ref(null);
const tickets = ref([]);
const showModal = ref(false);
const editId = ref(null);
const form = ref({ title: "", description: "", status: "open" });

onMounted(() => {
  loadTickets();
});

function loadTickets() {
  tickets.value = JSON.parse(localStorage.getItem("ticketapp_tickets")) || [];
}

function saveTickets() {
  localStorage.setItem("ticketapp_tickets", JSON.stringify(tickets.value));
}

function openModal() {
  form.value = { title: "", description: "", status: "open" };
  editId.value = null;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function saveTicket() {
  if (!form.value.title.trim()) {
    toast.value.showToast("Title is required", "error");
    return;
  }

  if (editId.value) {
    const idx = tickets.value.findIndex((t) => t.id === editId.value);
    tickets.value[idx] = { ...tickets.value[idx], ...form.value };
    toast.value.showToast("Ticket updated successfully!", "success");
  } else {
    tickets.value.push({
      id: Date.now().toString(),
      ...form.value,
      createdAt: new Date().toISOString(),
    });
    toast.value.showToast("Ticket created successfully!", "success");
  }

  saveTickets();
  closeModal();
  loadTickets();
}

function editTicket(ticket) {
  form.value = { ...ticket };
  editId.value = ticket.id;
  showModal.value = true;
}

function deleteTicket(id) {
  if (confirm("Are you sure you want to delete this ticket?")) {
    tickets.value = tickets.value.filter((t) => t.id !== id);
    saveTickets();
    toast.value.showToast("Ticket deleted!", "warning");
  }
}

function statusClass(status) {
  return status === "open"
    ? "bg-green-100 text-green-700"
    : status === "in_progress"
    ? "bg-amber-100 text-amber-700"
    : "bg-gray-200 text-gray-700";
}
</script>
