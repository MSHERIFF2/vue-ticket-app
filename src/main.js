import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import { createPinia } from "pinia"; // Pinia import
import router from "./router";

// 1. Create the Pinia store instance
const pinia = createPinia(); 

createApp(App)
  .use(router)
  .use(pinia) // 2. Use the Pinia instance
  .mount("#app");