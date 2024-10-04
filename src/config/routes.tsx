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
import ReviewPage from "@/pages/review";
import ReviewPageDetail from "@/pages/review-detail";
import WatermarkTesting from "@/pages/test/watermark_testing";
import Profile from "@/pages/profile";
import NoteDetailsPreview from "@/pages/note-details-preview";
import SellerProfile from "@/pages/seller-profile";

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
        path: '/note/preview/:noteId',
        element: <NoteDetailsPreview />,
        errorElement: <Error />
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
        path: '/review',
        element: <ReviewPage />,
        errorElement: <Error />,
    },
    {
        path: '/review/:reviewId',
        element: <ReviewPageDetail />,
        errorElement: <Error />,
    },
    {
        path: '/profile',
        element: <Profile />,
        errorElement: <Error />,
    },
    {
        path: '/seller-profile',
        element: <SellerProfile />,
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