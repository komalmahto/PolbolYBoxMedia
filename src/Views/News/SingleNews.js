import React, { useState, useEffect } from "react";
import "./SingleNews.css";
import axios from "../../axios";

function SingleNews({ match }) {
  const { newsId } = match.params;
  const [newsData, setNewsData] = useState(null);

 

  const fetchNews = async () => {
    const { data } = await axios.get(`common/newsById/${newsId}`);
    setNewsData(data.payload);
  };

  useEffect(() => {
    fetchNews();
  }, [match]);
  console.log(newsData);
  return (
    <div className="container">
      <div className="header">
        <p className="pHeading">News</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      <div className="top">
        <h4>{newsData ? newsData.categories[0] : ""}</h4>
        <hr />
        <p>
          {newsData
            ? "By " + newsData.user.firstName + " " + newsData.user.lastName
            : ""}
        </p>
      </div>
      <div className="content">
          <img className="image" src={newsData?newsData.images[0]:""} />
          <h3 className="title">{newsData?newsData.headline:""}</h3>
          <div>
              <p class="desc">{newsData?newsData.description:""}</p>
          </div>
          <a className="link" href={newsData?newsData.source:""}>Read Full Article</a>
      </div>
     
    </div>
  );
}

export default SingleNews;
