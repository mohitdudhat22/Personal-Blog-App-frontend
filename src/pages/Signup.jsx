import React from 'react';
import { generateChapture } from '../utilis/generateChapture';
import { Link, Navigate, useNavigate } from 'react-router-dom';


export default function Signup() {
    const navigate = useNavigate();
    const signupHandler = (e) => {
        e.preventDefault();
        const { username, email, password, c_pass, chapture, cp, profile } = e.target;
        //    console.log(username.value, email.value, password.value, c_pass.value, cp.value);
        if (password.value !== c_pass.value) {
            alert('password is not match');
            return;
        }

        if (chapture.value !== cp.value) {
            alert('chapture is wrong');
            return;
        }
        // existing email dont signup 
        const userss = JSON.parse(localStorage.getItem('users')) || []
        const user = userss.find(user => user.email === email.value);
        if (user) {
            alert('email already exist');
            return;
        }
        // make data url from image 
        const reader = new FileReader();
        reader.readAsDataURL(profile.files[0]);
        reader.onload = () => {
            const newUser = {
                id: Date.now(),
                username: username.value,
                email: email.value,
                password: btoa(password.value),
                profile: reader.result,
                isLogin: false,
            }
            const users = JSON.parse(localStorage.getItem('users')) || []
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            navigate('/login');
        }


    }
    return (
        <div className='bg-gray-100 h-screen flex justify-center items-center'>
            <div className="bg-white p-10 rounded-lg">
                <div className="text-center text-3xl text-gray-700 mb-2">
                    Sign Up
                </div>
                <div className="flex justify-center items-center">
                    <form onSubmit={signupHandler} >
                        <div className="w-96">
                            <div className="flex flex-col mb-2">
                                <label className="text-gray-700">Name</label>
                                <input type="text" name='username' placeholder='Enter Usernmae' className="border border-gray-300 px-2 py-1 rounded" required aria-required />
                            </div>
                            <div className="flex flex-col mb-2">
                                <label className="text-gray-700">Email</label>
                                <input type="email" name='email' placeholder='Enter Email' className="border border-gray-300 px-2 py-1 rounded" required aria-required />
                            </div>
                            <div className="flex flex-col mb-2">
                                <label className="text-gray-700">Password</label>
                                <input type="password" name='password' placeholder='Enter password' className="border border-gray-300 px-2 py-1 rounded" required aria-required />
                            </div>
                            <div className="flex flex-col mb-2">
                                <label className="text-gray-700">Confirm Password</label>
                                <input type="password" name='c_pass' placeholder='Enter Confirm password ' className="border border-gray-300 px-2 py-1 rounded" required aria-required />
                            </div>
                            <div className="flex flex-col mb-2">
                                <label className="text-gray-700">Chapture</label>
                                <div className="py-2 font-elite text-xl font-bold">
                                    <input type="text" name='cp' value={generateChapture(6)} className="text-center border border-gray-300 px-2 py-1 rounded focus:outline-none border-none " readOnly />
                                </div>
                                <input type="text" name='chapture' placeholder='Enter above chapture' className="placeholder:capitalize border border-gray-300 px-2 py-1 rounded" required aria-required />
                            </div>
                            {/* add profile pic */}
                            <div className="flex flex-col mb-2">
                                <label className="text-gray-700">Profile Picture</label>
                                <input type="file" name='profile' className="border border-gray-300 px-2 py-1 rounded" required aria-required />
                            </div>

                            <div className="flex flex-col mb-2">
                                <button className="bg-blue-500 text-white px-2 py-1 rounded">Sign Up</button>
                            </div>
                        </div>
                    </form>
                </div>
                <p className='text-center'> do you have an account ? <Link className='text-blue-600 font-bold' to={`/login`}>Login</Link> </p>
            </div>
        </div>
    )
}
