import { useSelector } from "react-redux";
import { authSelector } from "../../features/auth/authSlice";
import Home from "../Home";

export default function PageGuard({ Component }) {
  const auth = useSelector(authSelector);
  return !auth.isAuthenticated ? <Home /> : <Component />;
}
