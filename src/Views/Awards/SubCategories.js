import React, { useState, useEffect } from "react";
import axios from "../../axios";
import styles from "./AwardCategories.module.css";
import { getSlug } from "../../helpers";
import { useHistory } from "react-router";

function SubCategories({ match }) {
  const history = useHistory();
  const { categoryId } = match.params;

  const [subCat, setSubCat] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get(
      `award/awardList?categoryId=${categoryId}`
    );
    console.log(data);
    setSubCat(data.payload);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.pHeading}>Awards</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      <div className={styles.cards}>
        {subCat.length > 0
          ? subCat.map((cat, index) => (
              <div
                key={index}
                className={styles.card}
                onClick={() => {
                  history.push(
                    `/awards/categories/subcat/award/${match.params.showId}/${categoryId}/${cat._id}`
                  );
                }}
              >
                <img className={styles.image} src={cat.image} />
                <div className={styles.nameheading}>
                  <p>{cat.heading}</p>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default SubCategories;
