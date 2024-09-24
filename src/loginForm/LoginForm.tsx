import { useNavigate } from "react-router-dom";
import style from "./loginForm.module.css";
import axios from "axios";
import { Formik, Field, Form } from "formik";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const goToRegisterForm = () => {
    navigate("/register");
  };

  const handleLogin = async (values: { login: string; password: string }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          login: values.login,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
      <button className={style.button} onClick={goToRegisterForm}>
        Регистрация
      </button>
      <Formik
        initialValues={{ login: "", password: "" }}
        onSubmit={handleLogin}
      >
        {() => (
          <Form className={style.form}>
            <div>
              <Field className={style.inputField} name="login" placeholder="Введите логин" />
            </div>
            <div>
              <Field className={style.inputField}
                name="password"
                type="password"
                placeholder="Введите логин"
              />
            </div>
            <button type="submit">Войти</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
