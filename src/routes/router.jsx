import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";
import MainLayout from "../layout/MainLayout";
import HomeLayout from "../Pages/Home/HomeLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import AddItems from "../Pages/AddItems/AddItems";
import AuthProvider from "../Provider/AuthProvider";
import LostandFoundItems from "../Pages/Lost&Found/LostandFoundItems";
import ItemDetails from "../Pages/DetailsPage/ItemDetails";
import MyItems from "../Pages/MyItems/MyItems";
import RecoveredItems from "../Pages/RecoveredItems/RecoveredItems";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "",
        element: <HomeLayout></HomeLayout>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/addItems",
        element: (
          <PrivateRoutes>
            <AddItems></AddItems>
          </PrivateRoutes>
        ),
      },
      {
        path: "/allItems",
        element: (
          <PrivateRoutes>
            <LostandFoundItems></LostandFoundItems>
          </PrivateRoutes>
        ),
      },
      {
        path: "/items/:id",
        element: (
          <PrivateRoutes>
            <ItemDetails></ItemDetails>
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`https://searching-server.vercel.app/items/${params.id}`),
      },
      {
        path: "/myItems",
        element: (
          <PrivateRoutes>
            <MyItems></MyItems>
          </PrivateRoutes>
        ),
      },
      {
        path: "/recoveredItems",
        element: (
          <PrivateRoutes>
            <RecoveredItems></RecoveredItems>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;
