import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import timeAgo from '../utilis/timeAgo'


export default function Dashboard() {
  const blogs = JSON.parse(localStorage.getItem('blogs')) || []
  const users = JSON.parse(localStorage.getItem('users')) || null
  // const user = users.find(user => user.isLogin);

  // search 
  const [search, setSearch] = React.useState('')
  const handleChange = (e) => {
    setSearch(e.target.value)
    // console.log(search)
  }
  return (
    <Layout>
      <div className='bg-gray-100 py-10'>
        <div className="container mx-auto px-4">
          <div className="flex justify-between flex-col md:flex-row space-y-3 items-center py-2">
            <h2 className="text-2xl font-semibold capitalize">All Post <span className='text-base text-gray-600'>({blogs.length})</span> </h2>
            {/* search box */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg className="h-5 w-8 text-gray-500" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <input type="text" onChange={handleChange} value={search} name='search' className="w-64 pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline" placeholder="Search Post" />
            </div>

            {/* {user ? <Link to="/blogs" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full">Create Post</Link>:null } */}
          </div>
          <div className="flex flex-wrap -mx-4">

            {/* if length 0 then show not post otherwise show all post */}
            {
              blogs.length > 0 ?
                blogs
                  .filter(
                    blog => blog.title.toLowerCase().includes(search.toLowerCase()) || blog.description.toLowerCase().includes(search.toLowerCase())
                  )
                  .map(blog => {
                    const { id, name, title, description, image } = blog
                    return (
                      <div className="w-full md:w-1/3 px-4 mb-4" key={id}>
                        <div className="bg-white rounded-lg">
                          <div className="p-4">
                            <img loading='lazy' className='h-48 w-full rounded-lg' src={image} alt="blog image" />
                            <div className="flex justify-between">
                              <h4 className="text-xl font-semibold mb-2 capitalize">{title.slice(0, 22)}</h4>
                              {/* <p className="text-gray-700 text-base">{new Date(id).toDateString()}</p> */}
                              <p className="text-gray-700 text-base">{timeAgo(id)}</p>
                            </div>
                            <p className="text-gray-700 text-base">{description.slice(0, 40)}</p>
                            {/* show user name */}
                            <div className="flex items-center mt-4">
                              <div className="bg-cover bg-center w-10 h-10 rounded-full mr-3" style={{ backgroundImage: `url(${blog.profile})` }}></div>
                              {/* <span className="font-semibold uppercase bg-gray-400 text-white w-10 h-10 rounded-full p-2 text-center">{user.username.slice(0, 2)}</span> */}
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
                  }) : (
                  <div className="w-full text-center text-2xl">No Post Found</div>
                )
            }
          </div>
        </div>
      </div>

    </Layout>

  )
}
