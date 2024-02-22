import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";


const PrivateRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    const location = useLocation()

    if (loading) {
        return <div className="w-screen h-[55vh] flex justify-center items-center"><span className="mx-auto w-40 loading loading-ring"></span></div>
    }

    if (user) {
        return children;
    }

    // return <Navigate to='/login' state={location.pathname} replace></Navigate>
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default PrivateRoute;