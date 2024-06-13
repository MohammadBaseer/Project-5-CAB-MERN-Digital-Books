// import "./Login.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./Register.module.scss";
import { BaseURL } from "../../../../Utils/URLs/ApiURL";
import { NotOkType } from "../../../../@Types/Types";
import avatar from "../../../../assets/img/registrationFormAvatar/addAvatar.png";

const Register = () => {
  const [errorHandler, setErrorHandler] = useState<NotOkType | string>("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const getInputValues = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const UserRegisterFun = async (e: FormEvent<HTMLFormElement>) => {
    setErrorHandler("");
    e.preventDefault();
    console.log("user submit data =====>", newUser);

    try {
      const response = await fetch(`${BaseURL}/auth/user`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Result===> ", data);
      }
      if (!response.ok) {
        const data = (await response.json()) as NotOkType;
        setErrorHandler(data);
        console.log(" Error", data);
      }
    } catch (error) {
      const { message } = error as Error;
      setErrorHandler(message);
      console.log("err==============>", message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main_box}>
        <div className={styles.reg_head}>
          <h1>Register</h1>
        </div>
        <form className={styles.form} onSubmit={UserRegisterFun}>
          <hr />
          <div className={styles.email}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="name" onChange={getInputValues} />
          </div>

          <div className={styles.email}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required onChange={getInputValues} />
            <div className={styles.error}>{errorHandler}</div>
          </div>

          <div className={styles.password}>
            <label htmlFor="password">password</label>
            <input type="password" id="password" name="password" onChange={getInputValues} />
            <div className={styles.error}>{errorHandler}</div>
          </div>

          <div>
            <label className={styles.file} htmlFor="file">
              <img className={styles.avatar} src={avatar} alt="" />
              <span>Add an avatar</span>
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                }
              }}
            />
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
