import Main from "./components/Main";
import Info from "./components/Info";
import Profile from "./components/Profile";
const routes = [
  { path: "/", redirect: "/Main" },
  { name: "Main", path: "/Main", component: Main },
  { name: "Info", path: "/Info", component: Info },
  { name: "Profile", path:"/Profile", component: Profile}
];

export default routes;
