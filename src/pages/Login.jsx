import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
    const loginHandler = (e) => {
        e.preventDefault();
        const { email, password } = e.target;
        const data = {
            email: email.value,
            password: password.value
        }
        // Compare email and password and modify user isLogin true after login  in localStorage 
        const users = JSON.parse(localStorage.getItem('users')) || []; 
        const user = users.find(user => user.email === data.email && atob(user.password) === data.password);
        if(user){
            user.isLogin = true;
            localStorage.setItem('users', JSON.stringify(users));
            window.location.href = '/';
        }else{
            alert('email or password is incorrect');
        }
    }
  return (
    <div className='bg-gray-100 h-screen flex justify-center items-center'>
        <div className="bg-white p-10 rounded-lg">
            <div className="text-center text-3xl text-gray-700 mb-2">
                Login
            </div>
            <div className="flex justify-center items-center">
                <form onSubmit={loginHandler}>
                    <div className="w-96">
                        <div className="flex flex-col mb-2">
                            <label className="text-gray-700">Email</label>
                            <input type="email" name='email' className="border border-gray-300 px-2 py-1 rounded" required aria-required/>
                        </div>
                        <div className="flex flex-col mb-2">
                            <label className="text-gray-700">Password</label>
                            <input type="password" name='password' className="border border-gray-300 px-2 py-1 rounded" required aria-required/>
                        </div>
                        <div className="flex flex-col mb-2">
                            <button className="bg-blue-500 text-white px-2 py-1 rounded">Login</button>
                        </div>
                    </div>
                </form>
            </div>
            <p className='text-center'> don't you have your account ? <Link className='text-blue-600 font-bold' to={`/signup`}>Signup</Link> </p>
        </div>  
    </div>
  )
}
