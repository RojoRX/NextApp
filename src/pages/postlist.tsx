import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const router = useRouter();
    
  useEffect(() => {
    fetch("http://localhost:3001/blog")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleDelete = (id: string) => {
    fetch(`http://localhost:3001/blog/${id}`, { method: "DELETE" })
      .then(() => {
        const newPosts = posts.filter((post:any) => post.id !== id);
        setPosts(newPosts);
      })
      .catch((error) => console.error(error));
  };
  const handleEdit = (id: string) => {
    router.push(`/${id}/edit`);
  };

  return (
    <div>
      {posts.map((post:any) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <Link href={`/${post.id}`}>
            Read more
          </Link>
          <button onClick={() => handleEdit(post.id)}>Edit</button>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PostList;