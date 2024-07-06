import { useContext, useEffect, useRef, useState } from "react";
import styles from "./UserProfile.module.scss";
import UserProfileInputs from "./UserProfileInputs";
import { AuthContext } from "../../../../Context/AuthContext";
import { BaseURL } from "../../../../Utils/URLs/ApiURL";
import { Toast } from "primereact/toast";

const UserProfile = () => {
  const toast = useRef<Toast>(null);
  const { userProfile, getUserProfile } = useContext(AuthContext);

  const [displayToggle, setDisplayToggle] = useState<boolean>(false);

  const selectedFile = useRef<File | null>(null);

  const [image, setImage] = useState<string | null | any>(null);

  const userProfileImageUpdate = async () => {
    const token = localStorage.getItem("token");

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const formdata = new FormData();
    if (selectedFile.current) {
      formdata.append("avatar", selectedFile.current);
    }

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formdata,
    };
    try {
      const response = await fetch(`${BaseURL}/auth/user`, requestOptions);
      if (response.ok) {
        const data = await response.json();
        console.log("Success", data);
        setImage(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (image) {
      URL.revokeObjectURL(image);
    }
    if (e.target.files && e.target.files.length > 0) {
      selectedFile.current = e.target.files[0];
      const tempURL = URL.createObjectURL(e.target.files[0]);
      setImage(tempURL);
    } else {
      if (image) {
        URL.revokeObjectURL(image);
      }
      setImage(null); //test
    }
  };

  useEffect(() => {
    image ? setDisplayToggle(true) : setDisplayToggle(false);
  }, [image]);

  const close = () => {
    setImage(null);
  };

  return (
    <div className={styles.container}>
      <Toast ref={toast} />

      <br />
      <div className={styles.back_cover}>
        <div className={styles.cover}>
          <div className={styles.profile_image}>
            <label htmlFor="profileImage">
              <img className={styles.image} src={image !== null ? image : userProfile?.avatar} alt="" style={{ opacity: displayToggle ? "0.5" : undefined }} />
            </label>
            <input type="file" id="profileImage" name="image" style={{ display: "none" }} onChange={handleFileChange} />
          </div>

          <div className={`${styles.profile_image_action}`} style={{ display: !displayToggle ? "none" : "flex" }}>
            &nbsp;&nbsp;
            <i className={`${styles.pi} pi pi-check`} onClick={userProfileImageUpdate}>
              {" "}
              &nbsp;&nbsp;{" "}
            </i>
            <i className={`${styles.pi} pi pi-times`} onClick={close}>
              {" "}
              &nbsp;{" "}
            </i>
          </div>

          <div className={styles.user_profile_info}>
            <h4 className={styles.name}>{userProfile?.name}</h4>
            <h5 className={styles.joined_date}>Joined Date</h5>
          </div>
        </div>
      </div>

      <div className={styles.user_details}>
        <div className={styles.detail}>
          <div className={styles.text}>
            <h3>Name:</h3>
            <h3>Nick Name:</h3>
            <h3>Date of birth:</h3>
            <h3>Email:</h3>
            <h3>Address:</h3>
          </div>

          {userProfile && (
            <div className={styles.text}>
              <UserProfileInputs type="text" fieldKey="name" fieldValue={userProfile.name} readOnly={false} />
              <UserProfileInputs type="text" fieldKey="surname" fieldValue={userProfile.surname} readOnly={false} />
              <UserProfileInputs type="date" fieldKey="dob" fieldValue={userProfile.dob} readOnly={false} />
              <UserProfileInputs type="text" fieldKey="email" fieldValue={userProfile.email} readOnly={true} />
              <UserProfileInputs type="text" fieldKey="address" fieldValue={userProfile.address} readOnly={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
