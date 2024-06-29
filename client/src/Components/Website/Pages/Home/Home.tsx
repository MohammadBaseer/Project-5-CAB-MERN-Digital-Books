import { useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from 'primereact/button';
const Home = () => {




  const toast = useRef<Toast>(null);


  const showSuccess = () => {
    toast.current?.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
}





  return (
    <div>
      <h1>This is my Home Page</h1>
      <Toast ref={toast} />
      <Button label="Success" severity="success" onClick={showSuccess} />
    </div>
  );
};

export default Home;
