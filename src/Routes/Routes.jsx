

import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Components/Home";
import Assignments from "../Components/Assignments";
import CreateAssignments from "../Components/CreateAssignments";

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
            }
        ]

    },
]);

export default router;