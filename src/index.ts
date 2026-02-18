import { createApp } from "vue";
import App from "./app/App.vue";
import router from "./app/router";

import { createPinia } from "pinia";

import { createUnhead, headSymbol } from "@unhead/vue";

const app = createApp(App);
const head = createUnhead();

app.use(createPinia());
app.use(router);
app.provide(headSymbol, head);
app.mount("#app");
