import { useContext } from "react";
import styles from "./UserProfile.module.scss";
import UserProfileInputs from "./UserProfileInputs";
import { AuthContext } from "../../../../Context/AuthContext";
const UserProfile = () => {
  const { userProfile } = useContext(AuthContext);

  // console.log("user===>", userProfile);

  return (
    <div className={styles.container}>
      <br />

      <div className={styles.back_cover}>
        <div className={styles.cover}>
          <div className={styles.profile_image}>
            <img className={styles.image} src={userProfile?.avatar} alt="" />
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
              <UserProfileInputs type="text" fieldKey="name" fieldValue={userProfile.name} id={userProfile.id} readOnly={false} />
              <UserProfileInputs type="text" fieldKey="surname" fieldValue={userProfile.surname} id={userProfile.id} readOnly={false} />
              <UserProfileInputs type="date" fieldKey="dob" fieldValue={userProfile.dob} id={userProfile.id} readOnly={false} />
              <UserProfileInputs type="text" fieldKey="email" fieldValue={userProfile.email} id={userProfile.id} readOnly={true} />
              <UserProfileInputs type="text" fieldKey="address" fieldValue={userProfile.address} id={userProfile.id} readOnly={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
