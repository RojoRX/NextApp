import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import apiConfig from "@/config/apiConfig";
import Image from 'next/image'

const { apiUrl } = apiConfig;

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${apiUrl}/blog`, {
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
    
    fetch(`${apiUrl}/blog/${id}`, {
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
    router.push(`/edit?id=${id}`);

  };
  return (
    <div className="container p-2">
      {posts.map((post: any, index: number) => (
        <div key={index} className="shadow-lg m-5 p-3 text-center col-6-auto">
          <h2 className="text-white">{post.title}</h2>
          <p>{post.content}</p>
          {post.image && (
            <Image src={post.image} alt={post.title} width={300}
            height={300} />

            

          )}
          <br/>
          <div className="m-2 p-2">
          <button
            type="button" className="btn btn-lg btn-primary"
            onClick={() => handleEdit(post._id)}
          >
            Edit
          </button>
          <button
            type="button" className="btn btn-lg btn-secondary"
            onClick={() => handleDelete(post._id)}
          >
            Delete
          </button>
          </div>
       
        </div>
      ))}
    </div>
  );
};

export default PostList;
