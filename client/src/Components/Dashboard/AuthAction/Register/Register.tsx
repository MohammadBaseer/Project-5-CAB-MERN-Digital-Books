// import "./Login.scss";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import styles from "./Register.module.scss";
import { BaseURL } from "../../../../Utils/URLs/ApiURL";
import { NotOkType } from "../../../../@Types/Types";
import avatar from "../../../../assets/img/registrationFormAvatar/addAvatar.png";

const Register = () => {
  const selectedFile = useRef<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [errorHandler, setErrorHandler] = useState<NotOkType | string | any>("");
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  const UserRegisterFun = async (e: FormEvent<HTMLFormElement>) => {
    setErrorHandler("");
    e.preventDefault();

    if (!newUser.name.trim()) {
      setErrorHandler("Username is missing");
      return;
    }
    if (!newUser.email.trim()) {
      setErrorHandler("Email is missing");
      return;
    }
    if (!newUser.password.trim()) {
      setErrorHandler("Password is missing");
      return;
    }

    const formdata = new FormData();
    formdata.append("name", newUser.name);
    formdata.append("email", newUser.email);
    formdata.append("password", newUser.password);

    if (selectedFile.current) {
      formdata.append("avatar", selectedFile.current);
    }
    try {
      const response = await fetch(`${BaseURL}/auth/user`, { method: "POST", body: formdata });

      console.log("response", response);
      if (response.ok) {
        const data = await response.json();
        console.log("Result ===> ", data);
        setNewUser({ name: "", email: "", password: "" });
        selectedFile.current = null;
        setPreviewImg(null);
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

  const getInputValues = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (previewImg) {
      URL.revokeObjectURL(previewImg);
    }
    if (e.target.files && e.target.files.length > 0) {
      selectedFile.current = e.target.files[0];
      const tempURL = URL.createObjectURL(e.target.files[0]);
      setPreviewImg(tempURL);
    } else {
      if (previewImg) {
        URL.revokeObjectURL(previewImg);
      }
    }
  };

  console.log("previewImg=====>", previewImg);

  useEffect(() => {
    return () => {
      if (previewImg) {
        URL.revokeObjectURL(previewImg);
      }
    };
  }, []);

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
              <img className={styles.avatar} src={previewImg === null ? avatar : previewImg} alt="preview of selected file" />
              <span>Add an avatar</span>
            </label>
            <input style={{ display: "none" }} type="file" id="file" name="avatar" onChange={handleFileChange} />
          </div>
          {errorHandler && <div className={styles.error}>{typeof errorHandler === "string" ? errorHandler : errorHandler.error}</div>}
          {/* <div className={styles.error}>{errorHandler}</div> */}

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
