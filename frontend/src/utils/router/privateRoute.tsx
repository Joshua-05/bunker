import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../../store";


const PrivateRoute = () => {
  const log = true
  return ( 
    log ? <Outlet /> : <Navigate to="login" />
  );
};

export default PrivateRoute
