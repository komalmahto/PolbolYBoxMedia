import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Modal from "../Modal/Modal";
import { connect } from "react-redux";
import { logout } from "../../redux/Actions/AuthActions";

const Navbar = ({ auth: { token, user }, logout }) => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [show, setShow] = useState(false);
  const clickHandler = () => {
    setShow(!show);
  };

  return (
    <>
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
            <li>
              <Link to="/petitions"> Petition</Link>
            </li>
            <li>News</li>
            <li>TV</li>
            <li>Quiz</li>
            {!token ? (
              <li onClick={clickHandler}> Login</li>
            ) : (
              <li onClick={logout}> Logout</li>
            )}
          </ul>
          <div
            className={styles.hamburger}
            onClick={() => setDisplayMenu(true)}
          >
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
          <li>
            {" "}
            <Link to="/petitions" onClick={() => setDisplayMenu(false)}>
              {" "}
              Petition
            </Link>
          </li>
          <li>News</li>
          <li>TV</li>
          <li>Quiz</li>
        </ul>
      </nav>
      <Modal show={show} onHide={() => setShow(false)} />
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
