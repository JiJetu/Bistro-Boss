import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
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