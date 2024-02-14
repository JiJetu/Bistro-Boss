import { useContext, useEffect, useState } from 'react';
import loginImg from '../../../assets/others/authentication1.png'
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    const [disable, setDisable] = useState(true);
    const { signIn } = useContext(AuthContext)

    // number of character for captcha
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    // captcha validation
    const handleVerifyCaptcha = e => {
        const user_captcha_value = e.target.value;

        if (validateCaptcha(user_captcha_value)) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }

    const handleLogin = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then((result) => {
                const user = result.user;
                if(user){
                    alert("LogIn Successful")
                }
                console.log(user);
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <Helmet>
                <title>Bistro Boss | LogIn</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content justify-center items-center flex-col lg:flex-row-reverse">
                    <div className="flex-1">
                        <img className='w-full' src={loginImg} alt="" />
                    </div>
                    <div className="w-full md:w-[37%] shadow-2xl bg-base-100">
                        <h1 className="text-5xl text-center mt-4 font-bold">LogIn Now!</h1>
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    name='email'
                                    className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password"
                                    name='password'
                                    className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input type="text"
                                    onBlur={handleVerifyCaptcha}
                                    placeholder="enter above captcha text"
                                    className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <input disabled={disable} className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className='text-center -mt-3 pb-4'>New here? please <Link className='text-blue-700 font-bold' to='/signUp'>Register</Link> now</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;