import { Button } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
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
    navigate("/");
  };

  return (
    <>
      {!auth.isAuthenticated ? (
        <>
          {/* Login */}
          <Button
            component={Link}
            to="/login"
            onClick={closeNav}
            variant="subtle"
            size="md"
            px={"md"}
          >
            Login
          </Button>
          {/* Register */}
          <Button
            component={Link}
            to="/register"
            onClick={closeNav}
            size="md"
            px={"md"}
          >
            Register
          </Button>
        </>
      ) : (
        <>
          {/* Home */}
          <Button component={Link} to="/" onClick={closeNav} variant="subtle" size="md" px={"md"}>
            Home
          </Button>
          {/* Shared */}
          <Button
            component={Link}
            to="/shared"
            onClick={closeNav}
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
