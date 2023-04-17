import { useState } from "react";
import { useRouter } from "next/router";
import apiConfig from "@/config/apiConfig";
const { apiUrl } = apiConfig;

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

      const res = await fetch(`${apiUrl}/blog`, {
        method: "POST",
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
    <div className='container mt-5 col-6 shadow-lg p-4'>
      <form onSubmit={handleCreate} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Title</label>

          <input type="text"

            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Content</label>
          <br />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <label htmlFor="image">Image:</label>
        <br />
        <input type="file" name="image" onChange={handleFileChange} />
        <br />
        <button className="btn btn-success mt-3" type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CreatePostForm;
