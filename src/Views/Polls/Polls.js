import { useEffect, useState } from "react";
import { pollCategories } from "../../data/index";
import OverallPolls from "./OverallPolls";
import FilteredPolls from "./FilteredPolls/FilteredPolls";
import * as api from "../../api";
import Multiselect from "multiselect-react-dropdown";
import styles from "./Polls.module.css";
import { connect } from "react-redux";


const Polls = ({lang}) => {
  // const [polls, setPolls] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [active, setActive] = useState(true);
  const [activePolls, setActivePolls] = useState([]);
  const [expiredPolls, setExpiredPolls] = useState([]);
  const [activePollsTotal, setActivePollsTotal] = useState(0);
  const [expiredPollsTotal, setExpiredPollsTotal] = useState(0);
  const [page, setPage] = useState({
    activeNonfiltered: 1,
    activeFiltered: 1,
    expiredNonfiltered: 1,
    expiredFiltered: 1,
  });
  const [y, setY] = useState(0);
  useEffect(() => {
    setCategories(pollCategories);
    console.log(categories);
   
  }, []);

  useEffect(()=>{
    getActivePolls();
    getExpiredPolls();
  },[lang])

  useEffect(() => {
    getFilteredPolls();
  }, [selectedCategories, active,lang]);

  const loadMorePage = (type) => {
    if (type === "ANF") {
      let pos = window.scrollY;
      console.log(pos, "poss");
      setY(pos);
      setPage((prevState) => ({
        ...prevState,
        activeNonfiltered: prevState.activeNonfiltered + 1,
      }));
      console.log("len");
    }
    if (type === "AF") {
      let pos = window.scrollY;
      console.log(pos, "poss");
      setY(pos);
      setPage((prevState) => ({
        ...prevState,
        activeFiltered: prevState.activeFiltered + 1,
      }));
      console.log("len");
    }
    if (type === "ENF") {
      let pos = window.scrollY;
      console.log(pos, "poss");
      setY(pos);
      setPage((prevState) => ({
        ...prevState,
        expiredNonfiltered: prevState.expiredNonfiltered + 1,
      }));
      console.log("len");
    }
    if (type === "EF") {
      let pos = window.scrollY;
      console.log(pos, "poss");
      setY(pos);
      setPage((prevState) => ({
        ...prevState,
        expiredFiltered: prevState.expiredFiltered + 1,
      }));
      console.log("len");
    }
  };

  const getActivePolls = async () => {
    try {
      const { data } = await api.getActivePolls(lang);
      setActivePollsTotal(data.payload.totalActive);
      setActivePolls(data.payload.payload);
    } catch (error) {
      console.log(error);
    }
  };
  const getExpiredPolls = async () => {
    try {
      const { data } = await api.getExpiredPolls(lang);
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
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.pHeading}>Poll</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
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
        <hr className={styles.hr} />
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

      {active ? (
        selectedCategories.length === 0 ? (
          <>
          <div className={styles.polls}>
            <OverallPolls
            lang={lang}
              page={page.activeNonfiltered}
              mode="active"
              polls={activePolls}
            />
            
          </div>
          <div>{activePolls.length > page.activeNonfiltered * 3 && (
              <center className={styles.loadmore}>
                <span onClick={() => loadMorePage("ANF")}>Load more</span>
              </center>
            )}</div>
          </>
        ) : (
          <div>
            <FilteredPolls
                        lang={lang}

              page={page.activeFiltered}
              mode="active"
              polls={activePolls}
            />
            {activePolls.length > page.activeFiltered * 3 && (
              <center className={styles.loadmore}>
                <span onClick={() => loadMorePage("AF")}>Load more</span>
              </center>
            )}{" "}
          </div>
        )
      ) : selectedCategories.length === 0 ? (
        <>
        <div className={styles.polls}>
          <OverallPolls
                      lang={lang}

            page={page.expiredNonfiltered}
            mode="expired"
            polls={expiredPolls}
          />
         
        </div>
        <div> {expiredPolls.length > page.expiredNonfiltered * 3 && (
            <center className={styles.loadmore}>
              <span onClick={() => loadMorePage("ENF")}>Load more</span>
            </center>
          )}</div>
        </>
      ) : (
        <div>
          <FilteredPolls
                      lang={lang}

            page={page.expiredFiltered}
            mode="expired"
            polls={expiredPolls}
          />
          {expiredPolls.length > page.expiredFiltered * 9 && (
            <center className={styles.loadmore}>
              <span onClick={() => loadMorePage("EF")}>Load more</span>
            </center>
          )}
        </div>
      )}
    </div>
  );
};


const mapStateToProps = (state) => ({
  lang: state.lang,
});

export default connect(mapStateToProps)(Polls);