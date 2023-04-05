import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { useRouter } from "next/router";
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
  console.log(context.params?.id);
  return {
    props: {
      post,
    },
  };
};

const PostPage: React.FC<Props> = ({ post }) => {
  const router = useRouter();
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  useEffect(() => {
    setCurrentPost(post);
  }, [post]);

  const handleEdit = () => {
    router.push(`/${currentPost?.id}/edit`);
  };

  if (!currentPost) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1>{currentPost.title}</h1>
      <p>{currentPost.content}</p>
      <button onClick={handleEdit}>Edit</button>
    </Layout>
  );
};

export default PostPage;
