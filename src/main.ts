import { createApp } from "vue";
import { createPinia } from "pinia";
import * as LucideIcons from "lucide-vue-next";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

// 全局注册 Lucide 图标
Object.entries(LucideIcons).forEach(([name, component]) => {
  app.component(name, component);
});

app.use(pinia);
app.mount("#app");
