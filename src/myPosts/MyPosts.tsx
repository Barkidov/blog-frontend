import { useEffect, useState } from "react";
import axios from "axios";
import style from "./myPosts.module.css";

interface Post {
  _id: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

const MyPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  // Загрузка постов при монтировании компонента
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await axios.get("http://localhost:5000/api/posts", {
          headers: {
            "x-auth-token": token,
          },
        });

        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  // Обработчик отправки формы
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/posts/create",
        formData,
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPosts([response.data, ...posts]);
      setContent("");
      setImage(null);
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Мои Посты</h2>
      <form onSubmit={handleCreatePost}>
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Введите текст поста"
          />
        </div>
        <div>
          <input
            type="file"
            accept="image"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>
        <button type="submit">Создать пост</button>
      </form>

      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <p>{post.content}</p>
            {post.imageUrl && (
              <img src={`http://localhost:5000${post.imageUrl}`} alt="Post" />
            )}
            <span>{new Date(post.createdAt).toLocaleString()}</span>
            <div>
              <button onClick={() => handleDeletePost(post._id)}>
                Удалить пост
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
