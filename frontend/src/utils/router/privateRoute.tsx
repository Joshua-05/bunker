import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../../store";


const PrivateRoute = () => {
  const log = useUserStore(state => state.isLogged)
  return ( 
    log ? <Outlet /> : <Navigate to="login" />
  );
};

export default PrivateRoute
