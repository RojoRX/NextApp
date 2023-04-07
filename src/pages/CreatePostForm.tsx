import { useState } from "react";
import { useRouter } from "next/router";

interface FormData {
  title: string;
  content: string;
  image?: File;
}

const CreatePostForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    image: undefined,
  });

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      alert("Please fill in the required fields");
      return;
    }
/*
    if (!formData.image) {
      alert("Please select an image");
      return;
    }*/

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await fetch("http://localhost:3001/blog", {
        method: "POST",
        body: data,
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
    <form onSubmit={handleCreate} encType="multipart/form-data">
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
      <button type="submit">Create</button>
    </form>
  );
};

export default CreatePostForm;
