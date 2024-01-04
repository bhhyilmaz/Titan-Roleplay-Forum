import './App.css';
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from './components/Navbar/Login/Register';
import Login from './components/Navbar/Login/Login';
import Forum from './components/Navbar/Forum';
import Settings from './components/Navbar/Profile/Settings';
import Topic from './components/Forum/Topic/Topic';
import Profiles from './components/Navbar/Profile/Profiles';
import NotFound from './components/404';
import NewTopic from './components/Forum/Topic/New';
import Category from './components/Forum/Category';
import Test from './components/Test';

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Forum />,
    errorElement: <NotFound />
  },
  {
    path: "/profile/:usernameParam",
    element: <Profiles />,
    errorElement: <NotFound />
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <NotFound />
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />
  },
  {
    path: "/profile",
    element: <Settings />,
    errorElement: <NotFound />
  },
  {
    path: "/topic/:topicIdParam",
    element: <Topic />,
    errorElement: <NotFound />
  },
  {
    path: "/topic/new",
    element: <NewTopic />,
    errorElement: <NotFound />
  },
  {
    path: "/cat/:catParam",
    element: <Category />,
    errorElement: <NotFound />
  },
  {
    path: "/",
    element: <Category />,
    errorElement: <NotFound />
  },
  {
    path: "/profile/:receiverParam/pm",
    element: <Test />,
    errorElement: <NotFound />
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);