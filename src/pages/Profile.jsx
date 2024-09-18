import React from 'react'
import Layout from '../components/Layout'
import { Link, useNavigate } from 'react-router-dom';
import timeAgo from '../utilis/timeAgo';

export default function Profile() {
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem('users')) || []
  const user = users.find(user => user.isLogin);
  const blogs = JSON.parse(localStorage.getItem('blogs')) || []
  // const blog = blogs.find(blog => blog.name === user.username);
  const logoutHandler = () => {
    user.isLogin = false;
    localStorage.setItem('users', JSON.stringify(users));
    // window.location.href = '/';
    navigate('/')
  }
  return (
    <Layout>
      <div className="flex flex-col space-y-2 md:flex-row py-10 bg-gray-100 space-x-3">
        <div className="mx-4 flex flex-col justify-center items-center basis-3/12 bg-white rounded-md space-y-3 py-4 px-4">
          <img src={user.profile} alt="avatar" className="w-40 h-40 rounded-full" />
          {/* <span className="text-5xl font-semibold uppercase bg-gray-400 text-white rounded-full p-2 w-40 h-40 flex justify-center items-center">{user.username.slice(0, 2)}</span> */}
          <h2 className='text-2xl font-bold capitalize'>{user.username}</h2>
          <p className='text-gray-400'>{user.email}</p>
          <p className='text-gray-400 capitalize'>you join: <br /> {new Date(user.id).toDateString()} ({timeAgo(user.id)} ago)</p>
          <Link to={`/user/${user.id}`} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">Edit Profile</Link>
          <button onClick={logoutHandler} className="bg-red-500 hover:bg-red-600 text-white py-2 px-7 rounded-md">Logout</button>

        </div>
        <div className="basis-9/12">
          {/* if user login then show his all blog */}
          <div className="flex justify-between px-4 py-2">
            <h1 className="text-3xl font-semibold text-gray-700 mb-2">Your Blogs
              {/* if username match then count blog */}
              <span className='text-base text-gray-600'>({blogs.filter(blog => blog.name === user.username).length})</span>
            </h1>
            <Link to="/blogs" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full">Create Post</Link>
          </div>
          <div className=" flex flex-wrap">
            {
              blogs.map(blog => {
                const { id, name, title, description, profile } = blog
                if (name === user.username) {
                  return (
                    <div className="w-full md:w-1/3 px-4 mb-4" key={id}>
                      <div className="bg-white rounded-lg">
                        <div className="p-4">
                        <img loading='lazy' className='h-48 w-full rounded-lg' src={blog.image} alt="blog image" />
                          <div className="flex justify-between">
                            <h4 className="text-xl font-semibold mb-2 capitalize">{title.slice(0, 18)}</h4>
                            {/* <p className="text-gray-700 text-base">{new Date(id).toDateString()}</p> */}
                            <p className="text-gray-700 text-base">{timeAgo(id)}</p>
                          </div>
                          <p className="text-gray-700 text-base">{description.slice(0, 40)}</p>
                          {/* show user name */}
                          <div className="flex items-center mt-4">
                            <div className="bg-cover bg-center w-10 h-10 rounded-full mr-3" style={{ backgroundImage: `url(${profile})` }}></div>
                            <div>
                              <p className="font-semibold text-gray-700 text-sm capitalize">By <span className="font-bold"> {name}</span></p>
                            </div>
                          </div>
                          {/* see more */}
                          <div className="flex justify-end items-center mt-4">
                            <Link to={`/blog/${id}`} className="text-green-500 hover:underline">Read More</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              })
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}



