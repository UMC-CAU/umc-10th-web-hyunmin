import {Outlet} from 'react-router-dom';
import {NavBar} from "../components/NavBar.tsx";

const HomePage = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>)
};
export default HomePage;