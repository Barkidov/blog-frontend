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
        localStorage.setItem("token", response.data.token);//Когда ты вызываешь localStorage.setItem("token", response.data.token);, ты говоришь браузеру: "Сохрани, пожалуйста, этот токен под именем 'token', чтобы я мог его использовать позже."
        navigate("/posts");
      } else {
        alert("Ошибка при входе");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div>Войдите в аккаунт</div>
      <div>Зарегистрируйстесь если у вас нет аккаунта</div>
      <div>
        <button onClick={goToRegisterForm}>Регистрация</button>
      </div>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Введите логин"
          />
        </div>
        <div>
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
