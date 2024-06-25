// import "./Login.scss";
import { ChangeEvent, useContext, useEffect} from "react";
import styles from "./Register.module.scss";
import avatar from "../../../../assets/img/registrationFormAvatar/addAvatar.png";
import { AuthContext } from "../../../../Context/AuthContext";

const Register = () => {

const {setNewUser,previewImg, setPreviewImg, errorHandler,newUser,selectedFile, UserRegisterFun} = useContext(AuthContext)



  



  const getInputValues = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser((prev:any) => {
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
