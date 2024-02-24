import { Navigate, useLocation } from "react-router-dom";
import UseAdmin from "../hooks/UseAdmin";
import UseAuth from "../hooks/UseAuth";


const AdminRoute = ({children}) => {
    const { user, loading } = UseAuth();
    const [isAdmin, isAdminLoading] = UseAdmin();
    const location = useLocation()

    if (loading || isAdminLoading) {
        return <div className="w-screen h-[55vh] flex justify-center items-center"><span className="mx-auto w-40 loading loading-ring"></span></div>
    }

    if (user && isAdmin) {
        return children;
    }


    return <Navigate to='/' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;