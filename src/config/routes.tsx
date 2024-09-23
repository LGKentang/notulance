import Error from "@/components/fallback/error";
import Home from "@/pages/home";
import Login from "@/pages/login";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <Error />,
    },
    {
        path: '/login',
        element: <Login />,
        errorElement: <Error />,
    },
])

export default router;