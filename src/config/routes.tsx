import Error from "@/components/fallback/error";
import ApiTesting from "@/pages/test/api_testing";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import { createBrowserRouter } from "react-router-dom";
import UploadNoteTest from "@/pages/test/upload_note_test";
import Search from "@/pages/search";

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
    {
        path: '/register',
        element: <Register />,
        errorElement: <Error />,
    },
    {
        path: '/search',
        element: <Search />,
        errorElement: <Error />,
    },




    // TESTING
    {
        path: '/api_testing',
        element: <ApiTesting/>,
        errorElement: <Error/>
    },
    {
        path: '/upload_note_test',
        element: <UploadNoteTest></UploadNoteTest>,
        errorElement: <Error/>
    }


])

export default router;