

import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import Assignments from "../Components/Assignments";
import CreateAssignments from "../Pages/CreateAssignments";
import PendingAssignments from "../Pages/PendingAssignments";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
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
            }
        ]

    },
]);

export default router;