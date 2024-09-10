import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      // Запрос к API с использованием axios
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        login,
        password
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      // Проверка успешного ответа
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
    <div>
      <div>Регистрация аккаунта</div>
      <div>
        <div>Войдите в аккаунт если у вас он уже есть</div>
        <button onClick={goToLoginForm}>Войти в аккаунт</button>
      </div>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegisterForm;
