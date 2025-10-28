import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("ticketapp_user")) || null,
    session: localStorage.getItem("ticketapp_session") || null,
  }),

  actions: {
    login(user) {
      this.user = user;
      this.session = "session_" + Date.now();
      localStorage.setItem("ticketapp_user", JSON.stringify(user));
      localStorage.setItem("ticketapp_session", this.session);
    },

    logout() {
      this.user = null;
      this.session = null;
      localStorage.removeItem("ticketapp_user");
      localStorage.removeItem("ticketapp_session");
    },

    isAuthenticated() {
      return !!this.session;
    },
  },
});
