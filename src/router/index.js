import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/auth/Login.vue";
import Signup from "../pages/auth/Signup.vue";
import Dashboard from "../pages/Dashboard.vue";
import Tickets from "../pages/Tickets.vue";
import AuthGuard from "../components/AuthGuard.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/auth/login", component: Login },
  { path: "/auth/signup", component: Signup },

  {
    path: "/dashboard",
    component: AuthGuard,
    children: [
      {
        path: "",
        component: Dashboard,
      },
    ],
  },
  {
    path: "/tickets",
    component: AuthGuard,
    children: [
      {
        path: "",
        component: Tickets,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
