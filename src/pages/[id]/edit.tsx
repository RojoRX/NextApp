import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface FormData {
  title: string;
  content: string;
  image?: File;
}

const EditPostForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    image: undefined,
  });

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem('token');
      const headers = new Headers();
      headers.append('Authorization', `Bearer ${token}`);
      try {
        const res = await fetch(`http://localhost:3001/blog/${id}`, {
          headers: headers,
        });
        const data = await res.json();
        setFormData({
          title: data.title,
          content: data.content,
          image: undefined,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [id]);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      alert("Please fill in the required fields");
      return;
    }

    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await fetch(`http://localhost:3001/blog/${id}`, {
        method: "PUT",
        body: data,
        headers: headers,
      });
      const json = await res.json();
      router.push(`http://localhost:3000/`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  return (
    <form onSubmit={handleEdit} encType="multipart/form-data">
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <br />
      <label htmlFor="content">Content:</label>
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        required
      ></textarea>
      <br />
      <label htmlFor="image">Image:</label>
      <input type="file" name="image" onChange={handleFileChange} />
      <br />
      <button type="submit">Edit</button>
    </form>
  );
};

export default EditPostForm;
