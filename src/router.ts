import { Router } from "@vaadin/router";

(() => {
  const router = new Router(document.querySelector(".root"));
  router.setRoutes([
    { path: "/FM-rock-paper-scissors/", component: "home-page" },
    { path: "/FM-rock-paper-scissors/results", component: "results-page" },
  ]);
})();
