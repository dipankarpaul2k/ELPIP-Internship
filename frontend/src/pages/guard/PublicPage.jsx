import { useSelector } from "react-redux";
import { authSelector } from "../../features/auth/authSlice";
import Dashboard from "../Dashboard";


export default function PublicPage({ Component }) {
  const auth = useSelector(authSelector);
  return auth.isAuthenticated ? <Dashboard /> : <Component />;
}
