import Error from "@/components/fallback/error";
import ApiTesting from "@/pages/test/api_testing";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import { createBrowserRouter } from "react-router-dom";
import UploadNoteTest from "@/pages/test/upload_note_test";
import Search from "@/pages/search";
import NoteDetails from "@/pages/note-details";
import Sell from "@/pages/sell";
import ReviewPage from "@/pages/reviewPage";
import ReviewPageDetail from "@/pages/reviewPageDetail";
import PopoverDemo from "@/pages/test";
import WatermarkTesting from "@/pages/test/watermark_testing";

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
        path: '/note/search',
        element: <Search />,
        errorElement: <Error />,
    },
    {
        path: '/note/:noteId',
        element: <NoteDetails />,
        errorElement: <Error />
    },
    {
        path: '/note/sell',
        element: <Sell />,
        errorElement: <Error />
    },
    {
        path: '/reviewPage',
        element: <ReviewPage />,
        errorElement: <Error />,
    },
    {
        path: '/reviewPageDetail/:reviewId',
        element: <ReviewPageDetail />,
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
    ,
    {
        path: '/watermark_testing',
        element: <WatermarkTesting></WatermarkTesting>,
        errorElement: <Error/>  
    }
])

export default router;