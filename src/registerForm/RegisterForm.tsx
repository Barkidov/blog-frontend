import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./registerForm.module.css";
import * as Yup from "yup";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const goToLoginForm = () => {
    navigate("/");
  };

  const validationSchema = Yup.object().shape({
    login: Yup.string().required("Обязательно"),
    password: Yup.string()
      .min(4, "Пароль должен содержать минимум 4 символа")
      .required("Обязательно"),
  });

  const handleRegister = async (values: {
    login: string;
    password: string;
  }) => {
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
        validationSchema={validationSchema}
      >
        <Form className={style.form}>
          <div>
            <Field type="text" name="login" placeholder="Введите логин" />
            <ErrorMessage name="login" component="div" />
          </div>
          <div>
            <Field
              type="password"
              name="password"
              placeholder="Введите пароль"
            />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit">Зарегистрироваться</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
