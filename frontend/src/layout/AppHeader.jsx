import { UnstyledButton } from "@mantine/core";
import classes from "./Layout.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useDisclosure } from "@mantine/hooks";

import { authSelector, clearUser } from "../features/auth/authSlice";
import { logout } from "../api/authApi";
import LogoutModal from "../components/Modals/LogoutModal";

export default function AppHeader() {
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
          <UnstyledButton
            component={Link}
            to="/login"
            className={classes.control}
            py={"xs"}
            px={"md"}
          >
            Login
          </UnstyledButton>
          {/* Register */}
          <UnstyledButton
            component={Link}
            to="/register"
            className={classes.control}
            py={"xs"}
            px={"md"}
          >
            Register
          </UnstyledButton>
        </>
      ) : (
        <>
          {/* Home */}
          <UnstyledButton
            component={Link}
            to="/"
            className={classes.control}
            py={"xs"}
            px={"md"}
          >
            Home
          </UnstyledButton>
          {/* Shared */}
          <UnstyledButton
            component={Link}
            to="/shared"
            className={classes.control}
            py={"xs"}
            px={"md"}
          >
            Shared
          </UnstyledButton>
          {/* Logout */}
          <UnstyledButton
            onClick={open}
            className={`${classes.control} ${classes.logout}`}
            py="xs"
            px="md"
            c="white"
          >
            Logout
          </UnstyledButton>
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
