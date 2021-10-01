import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./AwardCategories.css";
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
    <div className="container">
      <div className="header">
        <p className="pHeading">Awards</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      <div className="cards">
        {subCat.length > 0
          ? subCat.map((cat, index) => (
              <div
                key={index}
                className="card"
                onClick={() => {
                  history.push(
                    `/awards/categories/subcat/award/${match.params.showId}/${categoryId}/${cat._id}`
                  );
                }}
              >
                <img className="image" src={cat.image} />
                <div className="nameheading">
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
