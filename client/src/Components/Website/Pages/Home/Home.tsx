import { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthContext";

const Home = () => {

  const {getUserProfile}= useContext(AuthContext)








  return (
    <div>
      <h1>This is my Home Page</h1>
      <button onClick={getUserProfile}>Test Me</button>
    </div>
  );
};

export default Home;
