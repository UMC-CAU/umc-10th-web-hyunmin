import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/login", element: <LoginPage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}