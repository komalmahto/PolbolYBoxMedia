import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Modal from "../Modal/Modal";
import { connect } from "react-redux";
import { fetchToken } from "../../redux/Actions/AuthActions";
import { logout } from "../../redux/Actions/AuthActions";
import { updateLanguage } from "../../redux/Actions";
import hind from "./ind.png";
import eng from "./United-kingdom_flag_icon_round.svg.png";

const Navbar = ({
  auth: { token, user },
  logout,
  fetchToken,
  updateLanguage,
  lang,
}) => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [show, setShow] = useState(false);
  const clickHandler = () => {
    setShow(!show);
  };

  const handleLanguage = () => {
    if (lang.language === "English") {
      updateLanguage("Hindi");
    }
    if (lang.language === "Hindi") {
      updateLanguage("English");
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <p>LOGO</p>
          </div>
          <ul className={styles.links}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/polls">Poll</Link>
            </li>
            <li>
              <Link to="/awards">Awards</Link>
            </li>
            <li>
              <Link to="/petitions"> Petition</Link>
            </li>
            <li>
              {" "}
              <Link to="/news">News</Link>
            </li>
            <li>
              <Link to="/livetv">TV</Link>
            </li>
            <li>
              <Link to="/quiz">Quiz</Link>
            </li>
          </ul>
          <div className={styles.navRight}>
            <span onClick={handleLanguage}>
              {lang.language === "Hindi" ? (
                <span className={styles.lang}>
                  <img src={hind} alt="z" width="20" height="20" />
                  {lang.language}
                </span>
              ) : (
                <span className={styles.lang}>
                  <img src={eng} height="20" width="20" alt="image" />
                  {lang.language}
                </span>
              )}
            </span>
            {token&& <Link to="/" className={styles.ico}><i className="fas fa-user-circle"></i></Link>}
            {console.log(user._id)}
            {token&& <Link to={`/user/${user._id}/wallet`} className={styles.ico}><i className="fas fa-wallet"></i></Link>}
            {!token ? (
              <span onClick={clickHandler} className={styles.auth}>
                {" "}
                Login
              </span>
            ) : (
              <span onClick={logout} className={styles.auth}> Logout</span>
            )}
          </div>
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
      <Modal
        fetchToken={(token, user) => fetchToken(token, user)}
        show={show}
        onHide={() => setShow(false)}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  lang: state.lang,
});
const mapDispatchToProps = (dispatch) => {
  return {
    fetchToken: (token, user) => dispatch(fetchToken(token, user)),
    logout: () => dispatch(logout()),
    updateLanguage: (lang) => dispatch(updateLanguage(lang)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
