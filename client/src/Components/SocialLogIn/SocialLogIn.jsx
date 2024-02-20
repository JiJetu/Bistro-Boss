import { useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import UseAxiosPublic from "../../hooks/UseAxiosPublic";


const SocialLogIn = () => {
    const { googleSignIn } = UseAuth()
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = UseAxiosPublic()

    const from = location.state?.from?.pathname || '/';


    const handleGoogleLogIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        Swal.fire({
                            title: "LogIn Successful",
                            showClass: {
                                popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                            },
                            hideClass: {
                                popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                            }
                        });
                        navigate(from, { replace: true });
                    })
            }).catch((err) => {
                alert(err)
            });
    }
    return (
        <div>
            <div className="divider -mt-2">Social Login</div>
            <button onClick={handleGoogleLogIn} className='text-center my-2 w-full bg-red-600 text-white py-2 flex justify-center items-center gap-2'><FaGoogle></FaGoogle> Google</button>
        </div>
    );
};

export default SocialLogIn;