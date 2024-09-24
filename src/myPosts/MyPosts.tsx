import axios from "axios";
import { useEffect, useRef, useState } from "react";
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Not found token");
        }

        const response = await axios.get("http://localhost:5000/api/posts", {
          headers: {
            "x-auth-token": token,
          },
        });

        setPosts(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

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

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error(err);
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
    <div className={style.container}>
      <div className={style.title}>Мои посты</div>
      <form onSubmit={handleCreatePost}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>
        <div>
          <button type="submit">Добавить пост</button>
        </div>
      </form>
      <div>
        {posts.map((post) => (
          <div className={style.post} key={post._id}>
            <div>{post.content}</div>
            <div>
              {post.imageUrl && (
                <img
                  src={`http://localhost:5000${post.imageUrl}`}
                  alt="Post image"
                />
              )}
            </div>
            <div>{post.createdAt}</div>
            <button onClick={() => handleDeletePost(post._id)}>
              Удалить пост
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
