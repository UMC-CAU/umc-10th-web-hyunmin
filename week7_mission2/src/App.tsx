import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LPListPage from "./pages/LPListPage.tsx";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import GoogleCallbackPage from "./pages/GoogleCallbackPage";
import LPDetailPage from "./pages/LPDetailPage";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import MyPage from "./pages/MyPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/lps", element: <LPListPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/v1/auth/google/callback", element: <GoogleCallbackPage /> },

  {path: "/lp/:lpid",
    element:(
        <ProtectedRoute>
          <LPDetailPage />
        </ProtectedRoute> ), },

  { //보호된 페이지(로그인해야만 접근 가능)
    path: "/mypage",
    element: (
        <ProtectedRoute> {/*로그인상태여야 보여지는 페이지*/}
          <Layout>
            <MyPage />
          </Layout>
        </ProtectedRoute>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}