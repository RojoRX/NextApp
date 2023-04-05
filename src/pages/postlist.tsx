import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./PostList.module.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3001/blog")
      .then((res) => res.json())
      .then((data) => {setPosts(data)
      console.log(data)})

  }, []);

  const handleDelete = (id: string) => {
    fetch(`http://localhost:3001/blog/${id}`, { method: "DELETE" })
      .then(() => {
        const newPosts = posts.filter((post:any) => post._id !== id);
        setPosts(newPosts);
      })
      .catch((error) => console.error(error));
  };
  const handleEdit = (id: string) => {
    router.push(`/${id}/edit`);
  };

  return (
    <div className={styles.container}>
      {posts.map((post:any, index:number) => (
  <div key={index} className={styles.post}>
    <h2 className={styles.title}>{post.title}</h2>
    <p className={styles.content}>{post.content}</p>
    <Link legacyBehavior href={`/${post.id}`}><a className={styles.readmore}>Read more</a></Link>
    <button className={styles.button} onClick={() => handleEdit(post._id)}>Edit</button>
    <button className={styles.button} onClick={() => handleDelete(post._id)}>Delete</button>
  </div>
))}

    </div>
  );
};

export default PostList;
