import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../layout";
import { GetServerSideProps } from "next";

interface Post {
  id: number;
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
        `http://localhost:3001/blog/${currentPost?.id}`,
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
      <h1>Edit Post</h1>
      <form onSubmit={handleUpdate}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="content">Content:</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
        ></textarea>
        <br />
        <button type="submit">Update</button>
      </form>
    </Layout>
  );
};

export default EditPostPage;
