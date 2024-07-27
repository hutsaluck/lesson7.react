import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import UsersPage from "./pages/UsersPage";
import PostsPage from "./pages/PostsPage";
import CustomErrorLayout from "./layouts/CustomErrorLayout";
import HomePage from "./pages/HomePage";
import React from "react";
import CommentsPage from "./pages/CommentsPage";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

let router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        errorElement: <CustomErrorLayout/>,
        children: [
            {index: true, element: <HomePage/>},
            {path: 'users', element: <UsersPage/>},
            {path: 'users/:id', element: <UserPage/>},
            {path: 'users/:id/posts', element: <PostsPage/>},
            {path: 'users/:id/posts/:id/comments', element: <CommentsPage/>},
            {path: 'posts', element: <PostsPage/>},
            {path: 'posts/:id', element: <PostPage/>},
            {path: 'posts/:id/comments', element: <CommentsPage/>},
            {path: 'comments', element: <CommentsPage/>},
        ]
    },
]);

root.render(
    <RouterProvider router={router}/>
);