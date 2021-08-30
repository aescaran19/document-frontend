import LoginView from "../views/Login";
import Login from "../components/auth/login";
import { isAuthenticated } from "@/helpers/auth.helper";
export default {
    path: "/login",
    component: LoginView,
    children: [
        {
            path: "",
            component: Login,
            name: "login",
            beforeEnter: async (to, from, next) => {
                if (await isAuthenticated()) {
                    next({name: "document" });
                } else next();
            }
        }
    ]
};