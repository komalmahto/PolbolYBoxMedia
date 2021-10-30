import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../../../api";
import { formatDate } from "../../../helpers";
import styles from "./Main.module.css";
import { useHistory } from "react-router-dom";
import { getSlug } from "../../../helpers";
import google from '../../../assets/play_store.png'
import apple from "../../../assets/apple.svg"
const OVERLAY = "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9))";

const Main = () => {
  const history = useHistory();

  const [latestNews, setLatestNews] = useState([]);
  const [highlightedPolls, setHighlightedPolls] = useState([]);
  const [activeAwards, setActiveAwards] = useState([]);
  const [petitions, setPetitions] = useState([]);

  useEffect(() => {
    getLatestNews();
    getHighlightedPolls();
    getActiveAwards();
    getPetitions();
  }, []);

  const getLatestNews = async () => {
    try {
      const { data } = await api.getLatestNews("english");
      setLatestNews(data.payload.payload.splice(0, 20));
    } catch (error) {
      console.log(error);
    }
  };

  const getHighlightedPolls = async () => {
    try {
      const { data } = await api.getHighlightedPolls();
      console.log(data,"polls")
      setHighlightedPolls(data.payload.slice(0,4));
    } catch (error) {
      console.log(error);
    }
  };

  const getActiveAwards = async () => {
    try {
      const { data } = await api.getActiveAwards();
      setActiveAwards(data.payload.slice(0,4));
    } catch (error) {
      console.log(error);
    }
  };

  const getPetitions = async () => {
    try {
      const { data } = await api.getCommonPetitions();
      console.log(data);
      setPetitions(data.payload.payload.slice(0, 4));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className={styles.home}>
        <div className={styles.features}>
          <div className={styles.feature}>
            <h2>Polls</h2>
            <div className={styles.poll_box}>
              {highlightedPolls.map((poll) => (
                <div
                  key={poll._id}
                  className={styles.item}
                  style={{
                    backgroundImage: `${OVERLAY}, url("${poll.image}")`,
                  }}
                >
                  <div className={styles.item_container}>
                    <p>{poll.question.substring(0, 30)}...</p>
                    <Link
                      to={`/poll/${poll.question.split(" ").join("-")}/${
                        poll._id
                      }`}
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.feature}>
            <h2>Petitions</h2>
            <div className={styles.petition_box}>
              {petitions.map((pet) => (
                <div
                  key={pet._id}
                  className={styles.item}
                  style={{
                    backgroundImage: `${OVERLAY}, url("${pet.image}")`,
                  }}
                >
                  <div className={styles.item_container}>
                    <p>{pet.title.substring(0, 30)}...</p>
                    <Link
                      to={`/pet/${pet.title.split(" ").join("-")}/${pet._id}`}
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.feature}>
            <h2>Awards</h2>
            <div className={styles.award_box}>
              {activeAwards.map((award) => (
                <div key={award._id} className={styles.item}>
                  <div className={styles.award_container}>
                    <p>Expires on {formatDate(award.lifeSpan)}</p>
                    <img src={award.icon} alt={award.title} />
                    <p>{award.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.latest_news}>
          <h2>Latest News</h2>
          <div className={styles.news_list}>
            {latestNews.map((news) => (
              // <div key={news._id} className={styles.news}>
              //   <img src={news.news.images[0]} alt={news.title} />
              //   <p className={styles.title}>{news.title}</p>
              //   <button>Read More</button>
              // </div>

              <Link
              to={`/news/ss/${news.targetId}`}            >
            
              <div
              key={news._id}
              className={styles.item}
              style={{
                backgroundImage: `${OVERLAY}, url("${news.news.images[0]}")`,
              }}
            >
              <div className={styles.item_container}>
                <p>{news.title.substring(0, 30)}...</p>
               
              </div>
            </div>
            </Link>
            ))}
          </div>
          <button
            onClick={() => history.push("/news")}
            className={styles.view_all}
          >
            View All
          </button>
        </div>
      </div>
      <div className={styles.downloads}>
        <div className={styles.container}>
          <div className={styles.text}>
            <h2>Get Our App</h2>
            <p>Now available on Play Store and App Store</p>
          </div>
          <img
            src={google}
          />
          <img
            src={apple}
            alt="app-store"
          />
        </div>
      </div>
      <div className={styles.activities}>
        <div className={styles.activity}>
          <h2>Quiz</h2>
          <div className={styles.detail}>
            <img
              src="data:image/jpeg;base64,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"
              alt="quiz"
            />
            <div className={styles.text}>
              <p>Now it's Time to Test your Intelligence</p>
              <p>
                PolBol brings you an exercise for your brain in form of exciting
                quizzes in 8 different Categories
              </p>
            </div>
            <button>Play Quiz</button>
          </div>
        </div>
        <div className={styles.activity}>
          <h2 className={styles.live_tv}>Live Tv</h2>
          <div className={styles.detail}>
            <img
              src="data:image/jpeg;base64,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"
              alt="live_tv"
            />
            <div className={styles.text}>
              <p>Never miss any important update with PolBol</p>
              <p>
                Catch the Live News from top-rated news channel at once place
              </p>
            </div>
            <button>Watch Live TV</button>
          </div>
        </div>
        <div className={styles.live_tv}></div>
      </div>
    </div>
  );
};

export default Main;
