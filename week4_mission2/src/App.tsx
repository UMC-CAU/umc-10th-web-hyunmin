import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage.tsx";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}