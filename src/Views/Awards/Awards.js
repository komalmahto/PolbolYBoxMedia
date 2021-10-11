import { useEffect, useState } from "react";
import OverallAwards from "./OverallAwards";
import * as api from "../../api";
import { pollCategories } from "../../data/index";

import styles from"./Awards.module.css";

const Awards = () => {
  const [active, setActive] = useState(true);
  const [activeAwards, setActiveAwards] = useState([]);
  const [expiredAwards, setExpiredAwards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  useEffect(() => {
    setCategories(pollCategories);
    getActiveAwards();
    getExpiredAwards();
  }, []);
  useEffect(() => {
    getFilteredPolls();
  }, [selectedCategories, active]);

  const getActiveAwards = async () => {
    try {
      const { data } = await api.getActiveAwards();
      setActiveAwards(data.payload);
    } catch (error) {
      console.log(error);
    }
  };
  const getExpiredAwards = async () => {
    try {
      const { data } = await api.getExpiredAwards();
      setExpiredAwards(data.payload);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCategoryClick = (category) => {
    if (!selectedCategories.includes(category))
      setSelectedCategories([...selectedCategories, category]);
    else
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
  };

  const getFilteredPolls = async () => {
    try {
      let mode = active ? "active" : "expired";
      let categories = selectedCategories.join(",");

      const { data } = await api.getFilteredAwards(mode, categories);

      if (active) {
        // setActivePollsTotal(data.payload.length);
        setActiveAwards([...data.payload.payload]);
      } else {
        // setExpiredPollsTotal(data.payload.length);
        setExpiredAwards([...data.payload.payload]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.pHeading}>Awards</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      <div className={styles.categories}>
        <span
          className={
            selectedCategories.length === 0
              ? `${styles.category} ${styles.selected}`
              : styles.category
          }
          onClick={() => setSelectedCategories([])}
        >
          Overall
        </span>
        {categories.map((category, index) => (
          <span
            key={index}
            className={
              selectedCategories.includes(category)
                ? `${styles.category} ${styles.selected}`
                : styles.category
            }
            onClick={(_) => handleCategoryClick(category)}
          >
            {category}
          </span>
        ))}
        <div
          style={{
            width: "250px",
            fontSize: "0.8rem",
            margin: "15px 0",
          }}
        >
          {/* <Multiselect
            style={{ height: "100%" }}
            options={pollCategories.map((category) => ({ name: category }))}
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue="name"
            placeholder="View All Categories"
            showArrow
          /> */}
        </div>
      </div>
      <div className={`${active ? `${styles.types} ${styles.active}` : `${styles.types} ${styles.expired}`}`}>
        <div onClick={() => setActive(true)}>
          ACTIVE <span>{activeAwards.length}</span>
        </div>
        <div onClick={() => setActive(false)}>
          EXPIRED <span>{expiredAwards.length}</span>
        </div>
      </div>
      {active ? (
        <div className={styles.polls}>
          <OverallAwards mode="active" awards={activeAwards} />
        </div>
      ) : (
        <div className={styles.polls}>
          <OverallAwards mode="expired" awards={expiredAwards} />
        </div>
      )}
    </div>
  );
};

export default Awards;
