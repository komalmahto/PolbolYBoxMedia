import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <h2>LOGO</h2>
        <p>Copyright @ 2021 PolBol</p>
      </div>
    </footer>
  );
};

export default Footer;
