import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserProfile } from "./features/user/userSlice";

import Header from "./components/Header";
import Home from "./pages/Home";
import SignUp from "./features/user/SignUp";
import Login from "./features/user/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./features/user/Profile";

const App = () => {

    const dispatch = useDispatch();
    const {loading : authLoading, isAuthenticated} = useSelector((state) => state.user);
    const [initialLoad, setInitialLoad] = useState(true);


    useEffect(() => {
      dispatch(getUserProfile()).then(() => setInitialLoad(false));
    }, [dispatch, isAuthenticated]);

    if (initialLoad || authLoading) {
      return (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      errorElement: <div>404 Not Found</div>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "/dashboard",
          element: <ProtectedRoute />,
          children: [
            {
              path: "profile",
              element: <Profile />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default App;
