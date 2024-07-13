import { useCallback, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Center, Loader } from "@mantine/core";

import PrivatePage from "./pages/guard/PrivatePage";
import PublicPage from "./pages/guard/PublicPage";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import SharedTasks from "./pages/SharedTasks";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { getCurrentUser } from "./api/authApi";
import { setUser } from "./features/auth/authSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <PrivatePage Component={Dashboard} />,
      },
      {
        path: "shared",
        element: <PrivatePage Component={SharedTasks} />,
      },
      {
        path: "login",
        element: <PublicPage Component={Login} />,
      },
      {
        path: "register",
        element: <PublicPage Component={Register} />,
      },
    ],
  },
]);

export default function App() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // Check Current User State
  const getUser = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCurrentUser();
      dispatch(setUser(response));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (loading) {
    return (
      <Box mih={"100vh"}>
        <Center mih={"100vh"}>
          <Loader color="blue" size="lg" type="bars" />
        </Center>
      </Box>
    );
  }

  return <RouterProvider router={router} />;
}
