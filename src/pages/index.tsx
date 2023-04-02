/*import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Post } from '@/post.interface';
import styles from '../styles/Home.module.css';
import { format } from 'date-fns';


export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/blog')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div className="container">

    <Head>
      <title>My Blog</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1>Welcome to my Blog!</h1>

      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <Link href={`/blog/${post.id}`}>
              
                
                <div className="content">
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                  <div className="actions">
                    <span className="date">{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
                  </div>
                </div>
              
            </Link>
          </div>
        ))}
      </div>
    </main>
    
</div>
  );
}
*/
import PostList from "./postlist";

export default function Home() {
  return (
    <div>
      <h1>Blog</h1>
      <PostList />
    </div>
  );
}
