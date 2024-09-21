import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from './registerForm.module.css'; // Импорт модульных стилей

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const goToLoginForm = () => {
    navigate("/");
  };

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Простая валидация
    if (login.length <= 4) {
      alert("Логин должен содержать 4 и более символов");
      return;
    }
    if (password.length <= 4) {
      alert("Пароль должен содержать 4 и более символов");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        login,
        password
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status === 200 || response.status === 201) {
        navigate("/");
      } else {
        alert("Ошибка регистрации");
      }
    } catch (err) {
      console.error('Error during registration:', err);
      alert("Ошибка регистрации");
    }

    // Очистка формы
    setLogin('');
    setPassword('');
  };

  return (
    <div className={style.container}>
      <div className={style.title}>Регистрация аккаунта</div>
      <button className={style.button} onClick={goToLoginForm}>Войти в аккаунт</button>
      <form className={style.form} onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Введите логин"
            className={style.input}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            className={style.input}
          />
        </div>
        <button type="submit" >Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegisterForm;


