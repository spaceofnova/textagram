import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

import "./index.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OptionsPage from "./pages/OptionsPage";
import NewPostPage from "./pages/NewPostPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "notifications",
        element: <h1>Notifications</h1>,
      },
      {
        path: "newpost",
        element: <NewPostPage />,
      },
      {
        path: "options",
        element: <OptionsPage />,
      },
      {
        path: "search",
        element: <h1>Search</h1>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
