import { UnstyledButton, Modal, Text, Group, Button } from "@mantine/core";
import classes from "./Layout.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { authSelector, clearUser } from "../features/auth/authSlice";
import { logout } from "../api/authApi";
import { useDisclosure } from "@mantine/hooks";

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
          <UnstyledButton
            component={Link}
            to="/login"
            className={classes.control}
            py={"xs"}
            px={"md"}
          >
            Login
          </UnstyledButton>
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
          <UnstyledButton
            component={Link}
            to="/"
            className={classes.control}
            py={"xs"}
            px={"md"}
          >
            Home
          </UnstyledButton>
          <UnstyledButton
            component={Link}
            to="/shared"
            className={classes.control}
            py={"xs"}
            px={"md"}
          >
            Shared
          </UnstyledButton>
          {/* Logout Button */}
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
          <Modal
            opened={opened}
            onClose={close}
            size="auto"
            withCloseButton={false}
            centered
          >
            <Text>Are you sure you want to logout?</Text>
            <Group mt={"sm"}>
              <Button flex={1} onClick={close}>
                Cancel
              </Button>
              <Button flex={1} onClick={handleLogout} color={"red"}>
                Logout
              </Button>
            </Group>
          </Modal>
        </>
      )}
    </>
  );
}
