import { ChangeEvent, FormEvent, useRef, useState } from "react";
import styles from "./Contact.module.scss";
import { Toast } from "primereact/toast";

type MessagesInputType = {
  name: string;
  email: string;
  messages: string;
};

const Contact = () => {
  const toast = useRef<Toast>(null);
  const [messagesInput, setMessagesInput] = useState<MessagesInputType>({
    name: "",
    email: "",
    messages: "",
  });

  const inputsChangeHandler = (e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setMessagesInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const insertContactFormMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!messagesInput.name) {
      toast.current?.show({ severity: "error", summary: "Error", detail: "Name is missing!", life: 3000 });
      return;
    }
    if (!messagesInput.email) {
      toast.current?.show({ severity: "error", summary: "Error", detail: "Email is missing!", life: 3000 });
      return;
    }
    if (!messagesInput.messages) {
      toast.current?.show({ severity: "error", summary: "Error", detail: "Text is missing!", life: 3000 });
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("name", messagesInput.name);
    urlencoded.append("email", messagesInput.email);
    urlencoded.append("messages", messagesInput.messages);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };
    try {
      const response = await fetch("http://localhost:5000/api/messages", requestOptions);
      if (!response.ok) {
        toast.current?.show({ severity: "error", summary: "Error", detail: "Response Failed", life: 3000 });
        return;
      }
      if (response.ok) {
        await response.json();
        toast.current?.show({ severity: "success", summary: "Success", detail: "Sent", life: 3000 });
        setMessagesInput({ name: "", email: "", messages: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className={styles.container}>
        <br />
        <h1>Contact</h1>
        <br />
        <br />
        <div className={styles.box}>
          <div className={styles.info}>
            <div className={styles.info_elements}>
              <p>
                <span className="pi pi-envelope">
                  &nbsp;Email:
                  <a href="mailto:someone@example.com" className={styles.email}>
                    {" "}
                    someone@example.com
                  </a>
                </span>
              </p>
              <p>
                <span className="pi pi-phone">&nbsp;Phone: 1234567</span>
              </p>
              <p>
                <span className="pi pi-map-marker">&nbsp;Address: Xyz Str 44 Berlin</span>
              </p>
            </div>
          </div>

          <div className={styles.input_elements}>
            <form action="" onSubmit={insertContactFormMessage}>
              <div className={styles.contact_tile}>
                <div className={styles.elements}>
                  <input className={styles.input_name} type="text" name="name" placeholder="Name" value={messagesInput.name} onChange={inputsChangeHandler} />
                  <input className={styles.input_email} type="email" name="email" placeholder="Email" value={messagesInput.email} onChange={inputsChangeHandler} />
                </div>
                <div className={styles.elements}>
                  <textarea className={styles.text} name="messages" id="" placeholder="Text" value={messagesInput.messages} onChange={inputsChangeHandler}></textarea>
                </div>
                <button className={styles.Submit_button} name="submit">
                  Sent
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
