// import "./Login.scss";
import styles from "./Register.module.scss";

const Register = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main_box}>
        <div className={styles.reg_head}>
          <h1>Register</h1>
        </div>
        <form className={styles.form}>
          <hr />
          <div className={styles.email}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required />
          </div>

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
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
