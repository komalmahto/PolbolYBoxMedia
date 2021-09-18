import styles from "./Home.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.intro_section}>
        <div className={styles.wrapper}>
          <iframe
            title="Intro-Video"
            src="https://www.youtube.com/embed/zYH1H4gHDiU?autoplay=1&mute=1&loop=1&playlist=zYH1H4gHDiU"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
        <div className={styles.features}>
          <h2>Lorem Ipsum</h2>
          <div className={styles.features_list}>
            <div className={styles.feature}>
              <div className={styles.img}></div>
              <div className={styles.feature_detail}>
                <div className={styles.feature_name}>
                  <p>Poll</p>
                </div>
                <h2>Lorem Ipsum</h2>
                <span>Lorem ipsum Lorem ipsum</span>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.img}></div>
              <div className={styles.feature_detail}>
                <div className={styles.feature_name}>
                  <p>Awards</p>
                </div>
                <h2>Lorem Ipsum</h2>
                <span>Lorem ipsum Lorem ipsum</span>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.img}></div>
              <div className={styles.feature_detail}>
                <div className={styles.feature_name}>
                  <p>Petition</p>
                </div>
                <h2>Lorem Ipsum</h2>
                <span>Lorem ipsum Lorem ipsum</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
