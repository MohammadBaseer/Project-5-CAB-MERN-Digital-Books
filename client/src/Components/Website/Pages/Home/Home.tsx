import { ChevronRight } from "lucide-react";
import styles from "./page.module.css";
import { useContext } from "react";
import { FetchApiContext } from "../../../../Context/FetchApiContext";
import { AuthContext } from "../../../../Context/AuthContext";
import Loading from "../../../../Loaders/Loading/Loading";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, loading, likeFunction } = useContext(FetchApiContext);
  const { userProfile } = useContext(AuthContext);

  const itemSlice = data?.slice(0, 18);
  console.log("itemSlice", itemSlice);
  return (
    <div className={styles.container}>
      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Discover a New World of Reading
            </h1>
            <p className={styles.heroSubtitle}>
              Immerse yourself in our digital library with thousands of titles
              at your fingertips.
            </p>
            <a href="/books" className={styles.primaryButton}>
              Browse Collection <ChevronRight size={16} />
            </a>
          </div>
          <div className={styles.heroImage}>
            <img
              src={
                "https://static.vecteezy.com/system/resources/previews/020/598/559/non_2x/e-books-library-concept-with-people-characters-technology-and-literature-digital-culture-on-media-library-outline-design-style-minimal-illustration-for-landing-page-web-banner-hero-images-vector.jpg"
              }
              alt="Book collection"
              width={400}
              height={500}
              className={styles.bookImage}
            />
          </div>
        </section>
        {loading && <Loading />}

        <section className={styles.featuredSection}>
          <h2 className={styles.sectionTitle}>Featured Books</h2>
          <div className={styles.bookGrid}>
            {itemSlice &&
              itemSlice.map((book, i) => (
                <div className={styles.bookCard} key={i}>
                  <img
                    src={book.image}
                    alt={`Book ${book.title}`}
                    className={styles.bookCover}
                  />
                  <h3 className={styles.bookTitle}>{book.title}</h3>
                  <p className={styles.bookAuthor}>{book.authors}</p>

                  {(book.detail && (
                    <Link to={`books/${book._id}`}>
                      <button className={styles.readButton}>
                        Book Details
                      </button>
                    </Link>
                  )) || <div></div>}

                  <div className={styles.likeButton}>
                    <Link to={"#"} onClick={() => likeFunction(book._id)}>
                      <span
                        className={`pi pi-thumbs-up${
                          userProfile && book.likes.includes(userProfile?.id)
                            ? "-fill"
                            : ""
                        } ${styles.like}`}
                      ></span>
                    </Link>
                    <span className={styles.likeCount}>
                      {" "}
                      {book.likes.length || ""}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to start reading?</h2>
            <p className={styles.ctaText}>
              Sign up today and get access to our entire digital library.
            </p>
          </div>
        </section>
      </main>

      {/* {footer()} */}
    </div>
  );
};

export default Home;

export const footer: any = () => {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()} Digital Book. All rights reserved.
      </p>
    </footer>
  );
};
