import Main from "./components/Main";
import Info from "./components/Info";
import Profile from "./components/Profile";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
const routes = [
  { path: "/", redirect: "/Login" },
  { name: "Login", path: "/Login", component: Login },
  { name: "SignUp", path: "/SignUp", component: SignUp },
  { name: "Main", path: "/Main", component: Main },
  { name: "Info", path: "/Info/:id", component: Info },
  { name: "Profile", path: "/Profile", component: Profile },
];

export default routes;
