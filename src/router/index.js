import { createRouter, createWebHistory } from "vue-router";
import SearchPage from "../views/SearchPage.vue";
import PathPage from "../views/PathPage.vue";
import AboutPage from "../views/AboutPage.vue";
import CreditsPage from "../views/CreditsPage.vue";
import NotFoundPage from "../views/NotFoundPage.vue";

const routes = [
  { path: "/", component: SearchPage },
  { path: "/path/:id/:option(offline)?", component: PathPage },
  { path: "/about", component: AboutPage },
  { path: "/credits", component: CreditsPage },
  { path: "/:pathMatch(.*)*", component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
