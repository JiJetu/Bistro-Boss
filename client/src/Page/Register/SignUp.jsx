import { Link, useNavigate } from 'react-router-dom';
import signUpImg from '../../../assets/others/authentication2.png'
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

const SignUp = () => {
    const { createUser, profileUpdate } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = data => {
        console.log(data);
        createUser(data.name, data.email, data.password)
            .then((result) => {
                const newUser = result.user;
                profileUpdate(data.name)
                    .then( () => {
                        if (newUser) {
                            Swal.fire({
                                title: "Register Successful",
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
                            navigate('/login')
                        }
                    }).catch(err => {
                        alert(err)
                    })

                console.log(newUser);

            }).catch((err) => {
                alert(err)
            });
    }

    // const handleSignUp = e => {
    //     e.preventDefault();
    //     const form = e.target;
    //     const name = form.name.value;
    //     const email = form.email.value;
    //     const password = form.password.value;
    //     console.log(name, email, password);

    //     createUser( name, email, password)
    //     .then(result => {
    //         const newUser = result.user;
    //         profileUpdate(name)
    //         if(newUser){
    //             alert(`Register Successfully`)
    //             navigate('/login')
    //         }
    //         console.log(newUser);
    //     })
    //     .catch(err => alert(err))
    // }
    return (
        <>
            <Helmet>
                <title>Bistro Boss | SignUp</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content justify-center items-center flex-col lg:flex-row">
                    <div className="flex-1">
                        <img className='w-full' src={signUpImg} alt="" />
                    </div>
                    <div className="w-full md:w-[37%] shadow-2xl bg-base-100">
                        <h1 className="text-5xl text-center mt-4 font-bold">SignUp Here</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="name..."
                                    {...register("name", { required: true })}
                                    name='name'
                                    className="input input-bordered" />
                                {errors.name && <span className='text-red-600 mt-2'>name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    {...register("email", { required: true })}
                                    name='email'
                                    className="input input-bordered" />
                                {errors.name && <span className='text-red-600 mt-2'>email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })}
                                    name='password'
                                    className="input input-bordered" />
                                {errors.password?.type === "pattern" && (
                                    <p className='text-red-600 mt-2'>Password must require one upper case, one lower case, one number and special character </p>
                                )}
                                {errors.password?.type === "required" && (
                                    <p className='text-red-600 mt-2'>Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className='text-red-600 mt-2'>Password must be 6 character</p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p className='text-red-600 mt-2'>Password must be less then 20 character</p>
                                )}
                            </div>

                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="SignUP" />
                            </div>
                        </form>
                        <p className='text-center -mt-8 p-7'>Already have an account!! <Link className='text-blue-700 font-bold' to='/login'>LogIn</Link> now</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;