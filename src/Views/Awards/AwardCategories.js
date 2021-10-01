import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./AwardCategories.css";
import { getSlug } from "../../helpers";
import { useHistory } from "react-router";

function AwardCategories({ match }) {
  const history = useHistory();
  const { showId } = match.params;

  const [awards, setAwards] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get(`award/awardCategoryList?id=${showId}`);
    setAwards(data.payload);
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
        {awards.length > 0
          ? awards.map((award, index) => (
              <div
                key={index}
                className="card"
                onClick={() => {
                  history.push(
                    `/awards/categories/subcat/${showId}/${award._id}`
                  );
                }}
              >
                <img className="image" src={award.image} />
                <div className="name">
                  <p>{award.name}</p>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default AwardCategories;
