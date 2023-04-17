import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import apiConfig from "@/config/apiConfig";

const { apiUrl } = apiConfig;

interface Post {
  _id: string;
  title: string;
  content: string;
  slug: string;
}

interface Props {
  post: Post;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const token = localStorage.getItem('token');
      const headers = new Headers();
      headers.append('Authorization', `Bearer ${token}`);

  const res = await fetch(`${apiUrl}/blog`, {
          headers: headers,
        });
  const posts: Post[] = await res.json();

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${apiUrl}/blog?slug=${params?.slug}`);
  const post: Post = await res.json();

  return {
    props: { post },
  };
};

const PostPage: React.FC<Props> = ({ post }) => {
  const router = useRouter();
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  useEffect(() => {
    setCurrentPost(post);
  }, [post]);

  const handleEdit = () => {
    router.push(`/${currentPost?._id}/edit`);
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
