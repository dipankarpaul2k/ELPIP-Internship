import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useDisclosure } from "@mantine/hooks";

import { authSelector, clearUser } from "../features/auth/authSlice";
import { logout } from "../api/authApi";
import LogoutModal from "../components/Modals/LogoutModal";

export default function AppHeader({ closeNav }) {
  const [opened, { open, close }] = useDisclosure(false);

  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logout();
    toast(response.msg);
    dispatch(clearUser());
    close();
    closeNav();
    navigate("/");
  };

  const smoothNavigation = (path) => {
    navigate(path);
    closeNav();
  };

  return (
    <>
      {!auth.isAuthenticated ? (
        <>
          {/* Login */}
          <Button
            onClick={() => smoothNavigation("/login")}
            variant="subtle"
            size="md"
            px={"md"}
          >
            Login
          </Button>
          {/* Register */}
          <Button
            onClick={() => smoothNavigation("/register")}
            size="md"
            px={"md"}
          >
            Register
          </Button>
        </>
      ) : (
        <>
          {/* Home */}
          <Button
            onClick={() => smoothNavigation("/")}
            variant="subtle"
            size="md"
            px={"md"}
          >
            Home
          </Button>
          {/* Shared */}
          <Button
            onClick={() => smoothNavigation("/shared")}
            variant="subtle"
            size="md"
            px={"md"}
          >
            Shared
          </Button>
          {/* Logout */}
          <Button
            onClick={open}
            variant="filled"
            color="red"
            size="md"
            px="md"
            mt={{ base: "auto", sm: 0 }}
          >
            Logout
          </Button>
          {/* Logout Modal */}
          <LogoutModal
            isOpened={opened}
            onClose={close}
            onLogout={handleLogout}
          />
        </>
      )}
    </>
  );
}
