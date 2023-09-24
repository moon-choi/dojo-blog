import { useState } from 'react';
import BlogList from './BlogList';
import useFetch from './useFetch';

const Home = () => {
  const [name, setName] = useState('mario');
  const [age, setAge] = useState(25);
  const handleClick = (name, e) => {
    console.log('hello ' + name, e.target)
  }

  // const handleDelete = (id) => {
  //   const newBlogs = blogs.filter(blog => blog.id !== id)
  //   setBlogs(newBlogs);
  // }

  const changeName = () => {
    setName('luigi'); //this is reactive value. it changes the template. it triggers react to re-render the component.
    setAge(30);
  }

  const { body: blogs, isPending, error } = useFetch('http://localhost:8000/blogs');

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && //conditional rendering: logical and.
        <>
          <BlogList blogs={blogs} title="All blogs" />
          {/* <BlogList
            blogs={blogs.filter((blog) => blog.author === 'mario')}
            title="Mario's blogs" /> */}
        </>}

      <p>{name} is {age} years old.</p>
      <button onClick={(e) => handleClick('mario', e)}>Click me</button>
      <button onClick={changeName}>Change name</button>
    </div>
  );
}

export default Home;