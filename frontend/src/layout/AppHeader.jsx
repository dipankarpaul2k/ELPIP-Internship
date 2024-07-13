import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useDisclosure } from "@mantine/hooks";
import toast from "react-hot-toast";

import { authSelector, clearUser } from "../features/auth/authSlice";
import { logout } from "../api/authApi";
import LogoutModal from "../components/Modals/LogoutModal";
import AuthButtons from "./AuthButtons";
import UserButtons from "./UserButtons";

export default function AppHeader({ closeNav }) {
  const [opened, { open, close }] = useDisclosure(false);

  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout();
      toast.success(response.msg);
      dispatch(clearUser());
      close();
      closeNav();
      navigate("/");
    } catch (error) {
      toast.error("Failed to logout");
      console.error(error);
    }
  };

  const smoothNavigation = (path) => {
    navigate(path);
    closeNav();
  };

  const openLogoutModal = useMemo(() => open, [open]);

  return (
    <>
      {!auth.isAuthenticated ? (
        <AuthButtons smoothNavigation={smoothNavigation} />
      ) : (
        <UserButtons
          smoothNavigation={smoothNavigation}
          openLogoutModal={openLogoutModal}
        />
      )}
      {/* Logout Modal */}
      <LogoutModal isOpened={opened} onClose={close} onLogout={handleLogout} />
    </>
  );
}
