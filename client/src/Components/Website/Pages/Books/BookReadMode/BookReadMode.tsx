import styles from "./BookReadMode.module.scss";

const BookReadMode = () => {
  return (
    <div className={styles.container}>
      <div className={styles.nav_side_elements}>
        <div className={styles.switch_container}>
          <button type="button" className={styles.switch_item}>
            Context
          </button>
          <button type="button" className={styles.switch_item}>
            Title
          </button>
          <button type="button" className={styles.switch_item}>
            Page
          </button>
        </div>

        <div className={styles.nav_side_container}>
          <div className={styles.side_a_container}>
            <div className={styles.nav_side_a}>
              <input type="search" placeholder="Search" />
              <a href="/1" className={styles.link_base}>
                <div className={styles.sidebar_navigation_listItem}>
                  <span className={styles.sidebar_navigation_chapter_number}>1</span>
                  <span className={styles.chapter_title}> Getting started with TypeScript</span>
                </div>
              </a>
              <a href="/1" className={styles.link_base}>
                <div className={styles.sidebar_navigation_listItem}>
                  <span className={styles.sidebar_navigation_chapter_number}>2</span>
                  <span className={styles.chapter_title}> Getting started with TypeScript</span>
                </div>
              </a>
            </div>
          </div>

          <div className={styles.side_b_container}>
            <div className={styles.nav_side_b}>
              <input type="search" placeholder="Search" />
              <a href="/1" className={styles.link_base}>
                <div className={styles.sidebar_navigation_listItem}>
                  <span className={styles.chapter_title}> Installation and setup</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookReadMode;
