import { FormEvent, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./registerForm.module.css";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const goToLoginForm = () => {
    navigate("/");
  };

  const handleRegister = async (values: {
    login: string;
    password: string;
  }) => {
    if (values.login.length <= 4) {
      alert("Логин должен содержать 4 и более символов");
      return;
    }
    if (values.password.length <= 4) {
      alert("Пароль должен содержать 4 и более символов");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
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
        navigate("/");
      } else {
        alert("Ошибка регистрации");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      alert("Ошибка регистрации");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.title}>Регистрация аккаунта</div>
      <button className={style.button} onClick={goToLoginForm}>
        Войти в аккаунт
      </button>
      <Formik
        initialValues={{ login: "", password: "" }}
        onSubmit={handleRegister}
      >
        <Form className={style.form}>
          <div>
            <Field type="text" name="login" placeholder="Введите логин" />
          </div>
          <div>
            <Field
              type="password"
              name="password"
              placeholder="Введите пароль"
            />
          </div>
          <button type="submit">Зарегистрироваться</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
