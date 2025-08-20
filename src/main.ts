import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { useTimerStore } from "./stores/timerStore";
import "./style.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// 初始化应用状态
const timerStore = useTimerStore();
timerStore.loadSettings().catch(console.error);

app.mount("#app");
