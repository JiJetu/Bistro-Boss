import { Link, useNavigate } from 'react-router-dom';
import signUpImg from '../../../assets/others/authentication2.png'
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

const SignUp = () => {
    const {createUser, profileUpdate} = useContext(AuthContext);
    const navigate = useNavigate()

    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        createUser( name, email, password)
        .then(result => {
            const newUser = result.user;
            profileUpdate(name)
            if(newUser){
                alert(`Register Successfully`)
                navigate('/login')
            }
            console.log(newUser);
        })
        .catch(err => alert(err))
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content justify-center items-center flex-col lg:flex-row">
                <div className="flex-1">
                    <img className='w-full' src={signUpImg} alt="" />
                </div>
                <div className="w-full md:w-[37%] shadow-2xl bg-base-100">
                    <h1 className="text-5xl text-center mt-4 font-bold">SignUp Here</h1>
                    <form onSubmit={handleSignUp} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="name..."
                                name='name'
                                className="input input-bordered" required />
                        </div>
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

                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="SignUP" />
                        </div>
                    </form>
                    <p className='text-center -mt-8 p-7'>Already have an account!! <Link className='text-blue-700 font-bold' to='/login'>LogIn</Link> now</p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;