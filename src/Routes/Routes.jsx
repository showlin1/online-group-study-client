

import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import Assignments from "../Components/Assignments";
import CreateAssignments from "../Pages/CreateAssignments";
import PendingAssignments from "../Pages/PendingAssignments";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ContactUs from "../Pages/ContactUs";
import Page404 from "../Pages/Page404";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <Page404></Page404>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path:'/assignments',
                element:<Assignments></Assignments>,
            },
            {
                path:'/createAssignments',
                element:<CreateAssignments></CreateAssignments>,
            },
            {
                path:'/pendingAssignments',
                element:<PendingAssignments></PendingAssignments>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/contactUs',
                element:<ContactUs></ContactUs>
            }
        ]

    },
]);

export default router;