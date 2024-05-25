import { Navigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";



const AdminRoute = ({children}) => {
    const {user,loading} = useAuth();
    const [ isAdmin, isAdminLoading] = useAdmin();

   if(loading || isAdminLoading){
    return  <progress className="progress w-56 bg-cyan-500"></progress>
   }
   if(user && isAdmin){
    return children;
   }
   return <Navigate to="/" state={{from:location}} replace></Navigate>
};

export default AdminRoute;