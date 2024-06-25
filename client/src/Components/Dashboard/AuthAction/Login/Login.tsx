import { ChangeEvent, useContext } from "react";
import styles from "./Login.module.scss";
import { AuthContext } from "../../../../Context/AuthContext";

const Login = () => {
  const { currentUser, setCurrentUser, userLogin, errorHandler } = useContext(AuthContext);

  const getInputValues = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.main_box}>
        <div className={styles.reg_head}>
          <h1>Login</h1>
        </div>
        <form className={styles.form} onSubmit={userLogin}>
          <hr />
          <div className={styles.email}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={currentUser.email} required onChange={getInputValues} />
          </div>

          <div className={styles.password}>
            <label htmlFor="password">password</label>
            <input type="password" id="password" name="password" value={currentUser.password} required onChange={getInputValues} />
            {errorHandler && <div className={styles.error}>{typeof errorHandler === "string" ? errorHandler : errorHandler.error}</div>}
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
