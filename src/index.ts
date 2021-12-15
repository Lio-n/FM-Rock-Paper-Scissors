// ? COMPONENTS
import "./components/header-score/header-score";
import "./components/my-hand/my-hand";
import "./components/rules/rules";
// ? PAGES
import "./pages/home/home";
import "./pages/results/results";
// ? SOMETHING ELSE
import "./router.ts";
import { state } from "./state";

(() => {
  state.init();
})();
