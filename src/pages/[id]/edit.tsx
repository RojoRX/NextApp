import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../layout";
import { GetServerSideProps } from "next";
import styles from "./EditPostPage.module.css";

interface Post {
  _id: number;
  title: string;
  content: string;
}

interface Props {
  post: Post;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:3001/blog/${context.params?.id}`);
  const post = await res.json();
  return {
    props: {
      post,
    },
  };
};

const EditPostPage: React.FC<Props> = ({ post }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  useEffect(() => {
    setCurrentPost(post);
    setFormData({ title: post.title, content: post.content });
  }, [post]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3001/blog/${currentPost?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      setCurrentPost(data);
      router.push(`http://localhost:3000`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!currentPost) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1 className={styles.title}>Edit Post</h1>
      <form onSubmit={handleUpdate} className="form">
        <label htmlFor="title" className={styles.label}>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={styles.input}
        />
        <br />
        <label htmlFor="content" className={styles.label}>Content:</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          className={styles.textarea}
        ></textarea>
        <br />
        <button type="submit" className={styles.button}>Update</button>
      </form>
    </Layout>
  );
};

export default EditPostPage;
