import styles from "./Contact.module.scss";
const Contact = () => {
  return (
    <div>
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
            <div className={styles.contact_tile}>
              <div className={styles.elements}>
                <input className={styles.input_name} type="text" placeholder="Name" />
                <input className={styles.input_email} type="email" placeholder="Email" />
              </div>
              <div className={styles.elements}>
                <textarea className={styles.text} name="" id="" placeholder="Text"></textarea>
              </div>
              <button className={styles.Submit_button}>Sent</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
