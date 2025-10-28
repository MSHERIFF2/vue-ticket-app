<template>
  <section class="relative overflow-hidden bg-white">
    <!-- Decorative circles -->
    <div class="absolute top-10 left-10 w-40 h-40 bg-blue-500 rounded-full border opacity-20"></div>
    <div class="absolute -top-20 right-10 w-80 h-80 bg-blue-500 rounded-full border opacity-10"></div>

    <!-- Hero -->
    <div class="max-w-6xl mx-auto flex flex-col items-center text-center px-6 py-24 relative z-10">
      <h1 class="text-5xl font-extrabold text-gray-900 mb-4">TicketApp</h1>
      <p class="text-lg text-gray-600 max-w-xl mb-8">
        Manage your tickets easily across projects — fast, clean, and consistent.
      </p>

      <div class="flex flex-col sm:flex-row gap-4">
        <RouterLink
          to="/auth/login"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Login
        </RouterLink>
        <RouterLink
          to="/auth/signup"
          class="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
        >
          Get Started
        </RouterLink>
      </div>
    </div>

    <!-- Smooth Wavy Background -->
    <div
      class="absolute bottom-0 left-0 w-full h-64 bg-blue-100"
      style="clip-path: polygon(0 65%, 25% 75%, 50% 65%, 75% 80%, 100% 65%, 100% 100%, 0 100%)"
    ></div>
  </section>

  <!-- Features Section -->
  <section class="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6 py-20">
    <div class="bg-white rounded-2xl shadow p-8 text-center">
      <h2 class="font-semibold text-xl mb-2">Track Tickets</h2>
      <p class="text-gray-600">Stay organized with open, in-progress, and closed states.</p>
    </div>
    <div class="bg-white rounded-2xl shadow p-8 text-center">
      <h2 class="font-semibold text-xl mb-2">Secure Access</h2>
      <p class="text-gray-600">Login simulation powered by localStorage tokens.</p>
    </div>
    <div class="bg-white rounded-2xl shadow p-8 text-center">
      <h2 class="font-semibold text-xl mb-2">Unified Design</h2>
      <p class="text-gray-600">Same layout across React, Vue, and Twig.</p>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white py-8">
    <div class="max-w-6xl mx-auto text-center text-sm">
      © {{ new Date().getFullYear() }} TicketApp — All rights reserved.
    </div>
  </footer>
</template>

<script setup>
// Nothing needed here yet — static layout
</script>
