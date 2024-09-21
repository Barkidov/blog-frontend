import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./loginForm.module.css";
import axios from "axios";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const goToRegisterForm = () => {
    navigate("/register");
  };

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        login,
        password
      }, { headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("token", response.data.token);
        navigate("/posts");
      } else {
        alert("Ошибка при входе");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.title}>Войдите в аккаунт</div>
      <button className={style.button} onClick={goToRegisterForm}>Регистрация</button>
      <form className={style.form} onSubmit={handleLogin}>
        <div className={style.inputField}>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Введите логин"
          />
        </div>
        <div className={style.inputField}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginForm;
