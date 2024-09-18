import React from 'react'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom';

export default function Blog() {
  const navigate = useNavigate()
  const users = JSON.parse(localStorage.getItem('users')) || []
  const user = users.find(user => user.isLogin);
  // console.log(user.username);
  const username = user.username;
  const handleBlog = (e) => {
    e.preventDefault();
    // take title, description, and image Data URL from form
    const title = e.target.title.value;
    const description = e.target.description.value;
    const image = e.target.image.files[0];
    // make data url from image 
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      const blog = {
        id: Date.now(),
        name: username,
        profile:user.profile,
        title,
        description,
        image: reader.result,
      }
      // get blogs from localStorage
      const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
      // push blog to blogs
      blogs.push(blog);
      // set blogs to localStorage
      localStorage.setItem('blogs', JSON.stringify(blogs));
      // redirect to home page
      // window.location.href = '/';
      navigate('/')
    }


  }
  return (
    <Layout>
      <div className='bg-gray-100 py-10 flex justify-center items-center'>
        <div className="bg-white p-10 rounded-lg">
          <div className="text-center text-3xl text-gray-700 mb-2">
            Create Blog
          </div>
          <div className="flex justify-center items-center">
            <form onSubmit={handleBlog}>
              <div className="w-96">
                <div className="flex flex-col mb-2">
                  <label className="text-gray-700">Title</label>
                  <input type="text" name='title' className="border border-gray-300 px-2 py-1 rounded focus:outline-green-500" required aria-required />
                </div>
                <div className="flex flex-col mb-2">
                  <label className="text-gray-700">Description</label>
                  <textarea name="description" className="border border-gray-300 px-2 py-1 rounded focus:outline-green-500" required aria-required></textarea>
                </div>
                {/* blog image */}
                <div className="flex flex-col mb-2">
                  <label className="text-gray-700">Image</label>
                  <input type="file" name='image' className="border border-gray-300 px-2 py-1 rounded focus:outline-green-500" required aria-required />
                </div>
                <div className="flex flex-col mb-2">
                  <button className="bg-green-500 text-white px-2 py-1 rounded capitalize">Create post</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
