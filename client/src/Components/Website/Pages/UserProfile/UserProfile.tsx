import { useContext } from "react";
import styles from "./UserProfile.module.scss";
import UserProfileInputs from "./UserProfileInputs";
import { AuthContext } from "../../../../Context/AuthContext";
const UserProfile = () => {
  const { userProfile } = useContext(AuthContext);
  return (
    <div className={styles.container}>
      <br />

      <div className={styles.back_cover}>
        <div className={styles.cover}>
          <div className={styles.profile_image}>
            <img className={styles.image} src={userProfile?.avatar} alt="" />
          </div>
          <div className={styles.user_profile_info}>
            <h4 className={styles.name}>Name</h4>
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
          <div className={styles.text}>
            <UserProfileInputs name={userProfile?.name} />
            <UserProfileInputs />
            <UserProfileInputs />
            <UserProfileInputs email={userProfile?.email} />
            <UserProfileInputs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
