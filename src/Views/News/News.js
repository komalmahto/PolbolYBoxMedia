import { useEffect, useState } from "react";
import { pollCategories as newsCategories } from "../../data";
import OverallNews from "./OverallNews";
import FilteredNews from "./FilteredNews";
import * as api from "../../api";
import Multiselect from "multiselect-react-dropdown";
import styles from "./News.module.css";

const News = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [y, setY] = useState(0);

  useEffect(() => {
    setCategories([...newsCategories]);
    getNews();
  }, []);

  useEffect(() => {
    getFilteredNews();
  }, [selectedCategories]);
  
const loadMorePage = () => {
    let pos = window.scrollY;
    console.log(pos, 'poss');
    setY(pos);
    setPage(page + 1);
    console.log('len');
    // const len = newsBasedOnCategory.payload.data.length;
    let pageLen = page * 12;
  };

  const getNews = async () => {
    try {
      const { data } = await api.getNews();
      setNews([...data.payload.payload]);
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

  const getFilteredNews = async () => {
    try {
      let categories = selectedCategories.join(",");

      const { data } = await api.getFilteredNews(categories);

      setNews([...data.payload.payload]);
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
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.pHeading}>News</p>
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
            options={newsCategories.map((category) => ({ name: category }))}
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue="name"
            placeholder="View All Categories"
            showArrow
          /> */}
        </div>
      </div>

      {selectedCategories.length === 0 ? (
        <div className={styles.polls}>
          <OverallNews page={page} news={news} />
        </div>
      ) : (
        <div className={styles.fill}>
          <FilteredNews page={page} news={news} />
        </div>
      )}
    {news.length>page*12 &&  <center className={styles.load}><span className={styles.loadMore} onClick={loadMorePage}>Load more</span></center>}
    </div>
  );
};

export default News;
