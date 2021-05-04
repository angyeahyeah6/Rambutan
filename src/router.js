import Main from "./components/Main";
import Info from "./components/Info";
import Profile from "./components/Profile";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
const routes = [
  { name: "Login", path: "/", component: Login },
  { name: "Main", path: "/SignUp", component: SignUp },
  { name: "Main", path: "/Main", component: Main },
  { name: "Info", path: "/Info", component: Info },
  { name: "Profile", path:"/Profile", component: Profile}
];

export default routes;
