import { useEffect } from "react";

const Home = () => {
  const fetchAPI = async () => {
    const response = await fetch("http://localhost:5000/api/products/all");
    const result = await response.json();
    console.log("result", result);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div>
      <h1>This is my Home Page</h1>
    </div>
  );
};

export default Home;
