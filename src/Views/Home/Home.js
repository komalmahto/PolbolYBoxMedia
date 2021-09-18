import Header from "./Header";
import Main from "./Main/Main";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <div className={styles.rectangle}>
        <svg
          width="640"
          height="1024"
          viewBox="0 0 640 1024"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="640" height="1024" fill="#FDF9F6" />
        </svg>
      </div>
      <div className={styles.home}>
        <Header />
        <Main />
      </div>
    </>
  );
};

export default Home;
/* LOGO */
