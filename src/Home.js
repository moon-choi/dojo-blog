import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from './useFetch';
import BlogList from './BlogList';

const Home = () => {
  const [name, setName] = useState('mario');
  const [age, setAge] = useState(25);
  const { data: blogs, isPending, error } = useFetch('http://localhost:8000/blogs/');
  const history = useHistory();

  const handleDelete = (id) => {
    fetch('http://localhost:8000/blogs/' + id, {
      method: 'DELETE'
    }).then(() => {
      history.push('/');
    })
  }

  const handleClick = (name, e) => {
    console.log('hello ' + name, e.target)
  }

  const changeName = () => {
    setName('luigi'); //this is reactive value. it changes the template. it triggers react to re-render the component.
    setAge(30);
  }


  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && //conditional rendering: logical and.
        <>
          <BlogList blogs={blogs} title="All blogs" handleDelete={handleDelete} />
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