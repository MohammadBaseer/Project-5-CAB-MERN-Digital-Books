import { ChangeEvent, useContext, useRef, useState } from "react";
import styles from "./UserProfile.module.scss";
import { BaseURL } from "../../../../Utils/URLs/ApiURL";
import { AuthContext } from "../../../../Context/AuthContext";
import { Toast } from "primereact/toast";

type InputPropsType = {
  type: string;
  fieldKey: string;
  fieldValue: string;
  readOnly: boolean;
};

const UserProfileInputs = ({ type, fieldKey, fieldValue, readOnly }: InputPropsType) => {
  const { getUserProfile } = useContext(AuthContext);
  const [editButtons, setEditButtons] = useState(true);
  const [value, setValue] = useState(fieldValue || "");
  const toast = useRef<Toast>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const userUpdate = async () => {
    const token = localStorage.getItem("token");

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append(fieldKey, value);
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
    };
    try {
      const response = await fetch(`${BaseURL}/auth/user`, requestOptions);
      if (response.ok) {
        const data = await response.json();
        setEditButtons(!editButtons);
        getUserProfile();
        toast.current?.show({ severity: "success", summary: "Success", detail: data.error, life: 3000 });
      } else {
        const data = await response.json();
        console.log(" Error", data);
        toast.current?.show({ severity: "error", summary: "Error", detail: data.error, life: 3000 });
      }
    } catch (error: any) {
      console.log("err==============>", error);
    }
  };

  const action = () => {
    setEditButtons(!editButtons);
    setValue(fieldValue);
  };

  return (
    <div className={styles.text_element}>
      <Toast ref={toast} />
      <input className={styles.inputs} type={type} disabled={editButtons} name={fieldKey} value={value} onChange={handleChange} readOnly={readOnly} />

      <div className={styles.action_buttons}>
        <div className={styles.edit_button_1} style={editButtons ? { display: "contents" } : { display: "none" }}>
          &nbsp;&nbsp;
          <i className={`${styles.pi} pi pi-pencil`} style={readOnly ? { visibility: "hidden" } : { visibility: "visible" }} onClick={action}>
            {" "}
            &nbsp;
          </i>
        </div>

        <div className={styles.edit_button_2} style={editButtons ? { display: "none" } : { display: "contents" } && readOnly ? { display: "none" } : { display: "contents" }}>
          &nbsp;&nbsp;
          <i className={`${styles.pi} pi pi-check`} onClick={userUpdate}>
            {" "}
            &nbsp;&nbsp;{" "}
          </i>
          <i className={`${styles.pi} pi pi-times`} onClick={action}>
            {" "}
            &nbsp;{" "}
          </i>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInputs;
