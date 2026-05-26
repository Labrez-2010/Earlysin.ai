import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./Dashboard";
import AIInsights from "./pages/AIInsights";
import AIChat from "./pages/AIChat";

export const router = createBrowserRouter([
  { path: "/", Component: Login },
  { path: "/login", Component: Login },
  { path: "/signup", Component: Signup },
  { path: "/forgot-password", Component: ForgotPassword },
  { path: "/dashboard", Component: Dashboard },
  { path: "/insights", Component: AIInsights },
  { path: "/chat", Component: AIChat },
  { path: "*", Component: Login },
]);
