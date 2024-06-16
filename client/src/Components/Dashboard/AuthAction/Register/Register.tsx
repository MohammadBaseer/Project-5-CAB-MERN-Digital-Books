// import "./Login.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./Register.module.scss";
import { BaseURL } from "../../../../Utils/URLs/ApiURL";
import { NotOkType } from "../../../../@Types/Types";
import avatar from "../../../../assets/img/registrationFormAvatar/addAvatar.png";

const Register = () => {
  const [image, setImage] = useState<any>(null);
  const [errorHandler, setErrorHandler] = useState<NotOkType | string | any>("");
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", avatar: null as File | null });

  const getInputValues = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      setNewUser({ ...newUser, [name]: files[0] });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const UserRegisterFun = async (e: FormEvent<HTMLFormElement>) => {
    setErrorHandler("");
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("name", newUser.name);
    formdata.append("email", newUser.email);
    formdata.append("password", newUser.password);

    if (newUser.avatar) {
      formdata.append("avatar", newUser.avatar);
    }

    try {
      const response = await fetch(`${BaseURL}/auth/user`, { method: "POST", body: formdata });
      if (response.ok) {
        const data = await response.json();
        console.log("Result ===> ", data);
        setNewUser({ name: "", email: "", password: "", avatar: null });
      }
      if (!response.ok) {
        const data = (await response.json()) as NotOkType;
        setErrorHandler(data);
        console.log(" Error", data);
      }
    } catch (error: any) {
      setErrorHandler(error.message || "An unknown error occurred");
      console.log("err==============>", error);
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
          <div>
            <label htmlFor="name">Username</label>
            <input type="text" id="name" name="name" value={newUser.name} onChange={getInputValues} />
          </div>

          <div className={styles.email}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={newUser.email} required onChange={getInputValues} />
          </div>

          <div className={styles.password}>
            <label htmlFor="password">password</label>
            <input type="password" id="password" name="password" value={newUser.password} onChange={getInputValues} />
          </div>

          <div>
            <label className={styles.file} htmlFor="file">
              <img className={styles.avatar} src={image === null ? avatar : image} alt="" />
              <span>Add an avatar</span>
            </label>
            <input style={{ display: "none" }} type="file" id="file" name="avatar" onChange={getInputValues} />
          </div>

          {errorHandler && <div className={styles.error}>{typeof errorHandler === "string" ? errorHandler : errorHandler.error}</div>}

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
