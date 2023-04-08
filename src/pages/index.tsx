import { useState, useEffect } from 'react';
import PostList from './postlist';
import LoginForm from './loginpage';
import Link from 'next/link';

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined') {
      setAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
  };

  return (
    <div>
      {!authenticated ? (
        <LoginForm onAuthenticated={() => setAuthenticated(true)} />
      ) : (
        <>
          <h1>Blog</h1>
          <PostList />
          <hr />
          <Link legacyBehavior href="/create-post">
            <a>Create Post</a>
          </Link>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </>
      )}
    </div>
  );
}
