import { useEffect, useState } from "react";
import OverallAwards from "./OverallAwards";
import * as api from "../../api";

import "./Awards.css";

const Awards = () => {
  const [active, setActive] = useState(true);
  const [activeAwards, setActiveAwards] = useState([]);
  const [expiredAwards, setExpiredAwards] = useState([]);

  useEffect(() => {
    getActiveAwards();
    getExpiredAwards();
  }, []);

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

  return (
    <div className="container">
      <div className="header">
        <p className="pHeading">Awards</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      <div className="categories">
        <div
          style={{
            width: "250px",
            fontSize: "0.8rem",
            margin: "15px 0",
          }}
        ></div>
      </div>
      <div className={`${active ? "types active" : "types expired"}`}>
        <div onClick={() => setActive(true)}>
          ACTIVE <span>{activeAwards.length}</span>
        </div>
        <div onClick={() => setActive(false)}>
          EXPIRED <span>{expiredAwards.length}</span>
        </div>
      </div>
      {active ? (
        <div className="polls">
          <OverallAwards mode="active" awards={activeAwards} />
        </div>
      ) : (
        <div className="polls">
          <OverallAwards mode="expired" awards={expiredAwards} />
        </div>
      )}
    </div>
  );
};

export default Awards;
