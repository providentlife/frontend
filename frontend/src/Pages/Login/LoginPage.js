import { Link } from "react-router-dom";
import Button from "../../global-components/LinkButton/Button";
import { InputTextForm } from "../../global-components/LinkButton/InputTextForm";
import { LinkButton } from "../../global-components/LinkButton/Link-Button";
import { useState, useContext } from "react";
import AppContext from "../../context";
import { useNavigate, Navigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser, setIsAuth, isAuth } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  };

  function handlePassword(e) {
    setPassword(e.target.value);
  };

  async function handleLogin(e) {
    e.preventDefault();
    const userInfo = {
      email,
      password,
    };

    const loggingIn = await fetch("http://localhost:8000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    const result = await loggingIn.json();
    if (result.token) {
      const userToken = result.token;
      window.localStorage.setItem("token", userToken);
      window.localStorage.setItem("currUser", JSON.stringify(result.user));
      const currUser = window.localStorage.getItem("currUser");
      const parsedUser = JSON.parse(currUser);
      if (window.localStorage.getItem("token")) setIsAuth(true);
      setUser(parsedUser);
      setIsAuth(true)
    } else if (!result.token) {
      setIsAuth(false);
      return;
    }
  }

  return isAuth ? <Navigate to={'/'} /> : (
    <>
      <LinkButton pathName="/" text="Home" />
    <div className="bg-[#000080] p-10 border-4 rounded-2xl bg-gradient-to-b from-sunray-200 via-salmonPink-400 to-blueRYB-400">
      <h1 className="text-white font-bold text-center text-5xl">Login</h1>
      <h3 className="text-white font-bold text-center mt-4">
        Don't have an account yet?{" "}
        <Link to="/signup">
          <span className="text-black hover:text-[#FF99A8]">Sign Up</span>
        </Link>
      </h3>

      <form onSubmit={handleLogin} className="flex justify-center pt-5">
        <div className="flex justify-center flex-col">
          <div className="relative z-0 mb-6 w-full group ">
            <input
              type="email"
              className="block py-2.5 px-0 w-96 text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-white dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
              placeholder=" "
              required=""
              value={email}
              onChange={handleEmail}
            />
            <label className="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email
            </label>
          </div>


          <div className="relative z-0 mb-6 w-full group">
            <input
              type="password"
              className="block py-2.5 px-0 w-96 text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-white dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
              placeholder=" "
              required=""
              value={password}
              onChange={handlePassword}
            />

            <label className="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Password
            </label>
          </div>

          <div className="flex justify-center">
            <Button text="Log In" />
          </div>

        </div>

      </form>

    </div>
    </>
  );
}
