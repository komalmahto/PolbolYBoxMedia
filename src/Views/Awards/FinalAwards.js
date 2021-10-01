import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./AwardCategories.css";
import { getSlug } from "../../helpers";
import { useHistory } from "react-router";

function FinalAwards({ match }) {
  const history = useHistory();
  const { categoryId } = match.params;
  const { id } = match.params;
  const [catAwards, setCatAwards] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get(
      `award/awardList?categoryId=${categoryId}`
    );

    setCatAwards(data.payload.filter((d) => d._id === id));
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(catAwards);
  return (
    <div className="container">
      <div className="header">
        <p className="pHeading">{catAwards.length>0?catAwards[0].heading:""}</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      <div className="cards">
        {catAwards.length > 0
          ? catAwards[0].nominations.map((cat, index) => (
              <div key={index} className="card" onClick={() => {}}>
                <img className="image" src={cat.image} />
                <div className="name">
                  <p>{cat.name}</p>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default FinalAwards;
