import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import i18n from "../i18n";

const routes = [
  {
    path: "/",
    name: i18n.t("routes.name.dashboard"),
    component: Home,
    icon: "airplay"
  },
  {
    path: "/about",
    name: "About",
    component: About,
    icon: "home"
  },
  {
    path: "/about",
    name: "Test",
    component: About,
    icon: "home"
  }
];

export default routes;
