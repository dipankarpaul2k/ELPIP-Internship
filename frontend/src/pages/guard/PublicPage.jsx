import { useSelector } from "react-redux";
import { authSelector } from "../../features/auth/authSlice";
import { Navigate } from "react-router-dom";

export default function PublicPage({ Component }) {
  const auth = useSelector(authSelector);
  return auth.isAuthenticated ? (
    <Navigate to="/" replace={true} />
  ) : (
    <Component />
  );
}
