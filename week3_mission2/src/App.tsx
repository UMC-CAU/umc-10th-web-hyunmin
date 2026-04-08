import './App.css';
import MoviePage from "./pages/MoviePage.tsx";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import NotFoundPage from "./pages/NotFoundPage.tsx";
import MovieDetailPage from "./pages/MovieDetailPage.tsx";
import Layout from "./layout/Layout.tsx";

//라우터 설정
const router = createBrowserRouter ([
    {
        path: '/', //홈
        element: <Layout />,
        errorElement: <NotFoundPage />,
        children : [
            {
                path:'movies/:category',
                element: <MoviePage />
            },
            {
                path:'movies/:movieId',
                element: <MovieDetailPage />
            }
        ]
    },
]);

function App() {
  return <RouterProvider router = {router} />; //라우팅 가능하게 해줌
}
export default App;