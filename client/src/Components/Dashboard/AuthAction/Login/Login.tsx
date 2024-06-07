// import "./Login.scss";
import styles from "./Login.module.scss";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main_box}>
        <div className={styles.reg_head}>
          <h1>Login</h1>
        </div>
        <form className={styles.form}>
          <hr />
          <div className={styles.email}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
            <div className={styles.error}>Please provide a valid email.</div>
          </div>

          <div className={styles.password}>
            <label htmlFor="password">password</label>
            <input type="password" id="password" required />
            <div className={styles.error}>Password should be 8 characters.</div>
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
