import { useEffect, useState } from "react";
import { pollCategories } from "../../data";
import OverallPolls from "./OverallPolls";
import FilteredPolls from "./FilteredPolls/FilteredPolls";
import * as api from "../../api";
import Multiselect from "multiselect-react-dropdown";
import styles from "./Polls.module.css";

const Polls = () => {
  // const [polls, setPolls] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [active, setActive] = useState(true);
  const [activePolls, setActivePolls] = useState([]);
  const [expiredPolls, setExpiredPolls] = useState([]);
  const [activePollsTotal, setActivePollsTotal] = useState(0);
  const [expiredPollsTotal, setExpiredPollsTotal] = useState(0);

  useEffect(() => {
    setCategories([...pollCategories.splice(0, 4)]);
    getActivePolls();
    getExpiredPolls();
  }, []);

  useEffect(() => {
    getFilteredPolls();
  }, [selectedCategories, active]);

  const getActivePolls = async () => {
    try {
      const { data } = await api.getActivePolls();
      setActivePollsTotal(data.payload.totalActive);
      setActivePolls(data.payload.payload);
    } catch (error) {
      console.log(error);
    }
  };
  const getExpiredPolls = async () => {
    try {
      const { data } = await api.getExpiredPolls();
      setExpiredPollsTotal(data.payload.totalExpired);
      setExpiredPolls(data.payload.payload);
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

      const { data } = await api.getFilteredPolls(mode, categories);

      if (active) {
        // setActivePollsTotal(data.payload.length);
        setActivePolls([...data.payload.payload]);
      } else {
        // setExpiredPollsTotal(data.payload.length);
        setExpiredPolls([...data.payload.payload]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSelect = (selectedList, selectedItem) => {
    setSelectedCategories([...selectedCategories, selectedItem.name]);
  };

  const onRemove = (selectedList, selectedItem) => {
    setSelectedCategories(
      selectedCategories.filter((category) => category !== selectedItem.name)
    );
  };

  return (
    <div className="container">
      <div className={styles.header}>
        <p className={styles.pHeading}>Poll</p>
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
          <Multiselect
            style={{ height: "100%" }}
            options={pollCategories.map((category) => ({ name: category }))}
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue="name"
            placeholder="View All Categories"
            showArrow
          />
        </div>
      </div>
      <div
        className={`${
          active
            ? `${styles.types} ${styles.active}`
            : `${styles.types} ${styles.expired}`
        }`}
      >
        <div onClick={() => setActive(true)}>
          ACTIVE <span>{activePollsTotal}</span>
        </div>
        <div onClick={() => setActive(false)}>
          EXPIRED <span>{expiredPollsTotal}</span>
        </div>
      </div>
      {active ? (
        selectedCategories.length === 0 ? (
          <div className={styles.polls}>
            <OverallPolls polls={activePolls} />
          </div>
        ) : (
          <FilteredPolls mode="active" polls={activePolls} />
        )
      ) : selectedCategories.length === 0 ? (
        <div className={styles.polls}>
          <OverallPolls polls={expiredPolls} />
        </div>
      ) : (
        <FilteredPolls mode="expired" polls={expiredPolls} />
      )}
    </div>
  );
};

export default Polls;
