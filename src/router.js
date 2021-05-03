import Main from "./components/Main";
import Info from "./components/Info";

const routes = [
  { path: "/", redirect: "/Main" },
  { name: "Main", path: "/Main", component: Main },
  { name: "Info", path: "/Info", component: Info },
];

export default routes;
