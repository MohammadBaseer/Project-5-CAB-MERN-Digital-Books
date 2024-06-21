// import "./Login.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./Login.module.scss";
import { BaseURL } from "../../../../Utils/URLs/ApiURL";
import { LoginOkResponse } from "../../../../@Types/Types";

const Login = () => {
  const [errorHandler, setErrorHandler] = useState<string | any>("");
  const [newUser, setNewUser] = useState({ email: "", password: "" });

  const getInputValues = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const UserLoginFun = async (e: FormEvent<HTMLFormElement>) => {
    setErrorHandler("");
    e.preventDefault();

    if (!newUser.email.trim()) {
      setErrorHandler("Email is missing");
      return;
    }
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      const body = new URLSearchParams();
      body.append("email", newUser.email);
      body.append("password",  newUser.password);
      const requestOption = {
        method: "POST",
        headers: headers,
        body: body,
      }

      const res = await fetch(`${BaseURL}/auth/login`, requestOption);
      const result = await res.json() as LoginOkResponse;
      if (res.status !== 200) {
       return setErrorHandler(result.error)
      }
      if (!res.ok) {
   setErrorHandler("Login failed");    
   }
      if (res.ok) {

        if (result.token) {
                   localStorage.setItem("token", result.token);
      //  localStorage.setItem("user", JSON.stringify(result.user));
        }
  
      console.log(result);
      setNewUser({ email: "", password: "" });
      setErrorHandler("Login Successful");    
      }



    } catch (error) {
      setErrorHandler(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main_box}>
        <div className={styles.reg_head}>
          <h1>Login</h1>
        </div>
        <form className={styles.form} onSubmit={UserLoginFun}>
          <hr />
          <div className={styles.email}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={newUser.email} required onChange={getInputValues} />
          </div>

          <div className={styles.password}>
            <label htmlFor="password">password</label>
            <input type="password" id="password" name="password" value={newUser.password} required onChange={getInputValues} />
            {errorHandler && <div className={styles.error}>{typeof errorHandler === "string" ? errorHandler : errorHandler.error}</div>}
            {/* {errorHandler && <div className={styles.error}>{errorHandler}</div>} */}
          </div>

          <div className={styles.sub_btn_box}>
            <button className={styles.form_btn} type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
