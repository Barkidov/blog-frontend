import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./loginForm/LoginForm";
import MyPosts from "./myPosts/MyPosts";
import RegisterForm from "./registerForm/RegisterForm";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginForm />}/>
        <Route path='/register' element={<RegisterForm />}/>
        <Route path='/posts' element={<MyPosts />}/>
      </Routes>
    </>
  );
}

export default App;
