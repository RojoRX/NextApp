import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import PostList from './postlist';
import Link from 'next/link';
import Layout from './layout';

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    } else {
      router.push('/loginpage');
    }
  }, []);

  const handleAuthenticated = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    router.push('/loginpage');
  };

  return (
    <div>
      {authenticated && (
        <>
        <Layout/>
          
          <PostList/>
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