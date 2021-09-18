import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [displayMenu, setDisplayMenu] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <p>Logo</p>
        </div>
        <ul className={styles.links}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/polls">Poll</Link>
          </li>
          <li>Awards</li>
          <li>Petition</li>
          <li>News</li>
          <li>TV</li>
          <li>Quiz</li>
        </ul>
        <div className={styles.hamburger} onClick={() => setDisplayMenu(true)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <ul
        className={
          displayMenu ? `${styles.menu} ${styles.display}` : `${styles.menu}`
        }
      >
        <li className={styles.cross} onClick={() => setDisplayMenu(false)}>
          <i className="fas fa-times"></i>
        </li>
        <li>
          <Link to="/" onClick={() => setDisplayMenu(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/polls" onClick={() => setDisplayMenu(false)}>
            Poll
          </Link>
        </li>
        <li>Awards</li>
        <li>Petition</li>
        <li>News</li>
        <li>TV</li>
        <li>Quiz</li>
      </ul>
    </nav>
  );
};

export default Navbar;
