import { useEffect, useRef, useState } from 'react';
import loginImg from '../../../assets/others/authentication1.png'
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

const Login = () => {
    const captchaRef = useRef(null);
    const [disable, setDisable] = useState(true);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const user = { email, password }
        console.log(user);
    }
    const handleVerifyCaptcha = () =>{
        const user_captcha_value = captchaRef.current.value;

        if(validateCaptcha(user_captcha_value)) {
            setDisable(false)
        }else{
            setDisable(true)
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content justify-center items-center flex-col lg:flex-row-reverse">
                <div className="flex-1">
                    <img className='w-full' src={loginImg} alt="" />
                </div>
                <div className="w-full md:w-[37%] shadow-2xl bg-base-100">
                    <h1 className="text-5xl text-center mt-4 font-bold">Login now!</h1>
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
                                ref={captchaRef}
                                placeholder="enter above captcha text"
                                className="input input-bordered" required />
                                <button onClick={handleVerifyCaptcha} className='btn btn-sm'>Verify</button>
                        </div>
                        <div className="form-control mt-6">
                            <input disabled={disable} className="btn btn-primary" type="submit" value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;