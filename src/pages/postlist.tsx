import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./PostList.module.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3001/blog", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id: string) => {
    const token = localStorage.getItem("token");
    
    fetch(`http://localhost:3001/blog/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        const newPosts = posts.filter((post: any) => post._id !== id);
        setPosts(newPosts);
      })
      .catch((error) => console.error(error));
  };

  const handleEdit = (id: string) => {
    router.push(`/${id}/edit`);

  };

  return (
    <div className={styles.container}>
      {posts.map((post: any, index: number) => (
        <div key={index} className={styles.post}>
          <h2 className={styles.title}>{post.title}</h2>
          <p className={styles.content}>{post.content}</p>
          {post.image && (
            <img className={styles.image} src={post.image} alt={post.title} />

          )}
          <Link legacyBehavior href={`/${post.id}`}>
            <a className={styles.readmore}>Read more</a>
          </Link>
          <button
            className={styles.button}
            onClick={() => handleEdit(post._id)}
          >
            Edit
          </button>
          <button
            className={styles.button}
            onClick={() => handleDelete(post._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default PostList;
