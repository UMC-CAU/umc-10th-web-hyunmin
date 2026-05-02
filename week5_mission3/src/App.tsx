import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import GoogleCallbackPage from "./pages/GoogleCallbackPage";


const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/v1/auth/google/callback", element: <GoogleCallbackPage /> },

  { //보호된 페이지(로그인해야만 접근 가능)
    path: "/mypage",
    element: (
      <ProtectedRoute>
        <div>mypage</div> {/*로그인상태여야 보여지는 페이지*/}
      </ProtectedRoute>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}