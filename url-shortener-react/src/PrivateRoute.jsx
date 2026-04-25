import { Navigate } from "react-router-dom";
import { useStoreContext } from "./contextApi/ContextApi";

export default function PrivateRoute({ children, publicPage }) {
  const context = useStoreContext();

  // ✅ safety check (prevents crash if context is undefined)
  if (!context) return null;

  const { token } = context;

  // ✅ Public routes (login/register)
  if (publicPage) {
    return token ? <Navigate to="/dashboard" replace /> : children;
  }

  // ✅ Private routes (dashboard, create, etc.)
  return token ? children : <Navigate to="/login" replace />;
}