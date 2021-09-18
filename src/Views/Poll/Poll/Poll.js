import { useEffect, useState } from "react";
import DoughnutChart from "../Charts/Doughnut";
import * as api from "../../../api";
import styles from "./Poll.module.css";
import PropTypes from "prop-types";
import Filter from "../Filter/Filter";

const Poll = ({ match }) => {
  const { pollId } = match.params;

  const [pollData, setPollData] = useState(null);
  const [filterOptions, setFilterOptions] = useState(["Overall"]);

  useEffect(() => {
    getPollResult();
  }, []);

  const getPollResult = async () => {
    try {
      const { data } = await api.getPollResults(pollId);
      setPollData(data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const updateFilterOptions = (filterOption) => {
    if (filterOptions.includes(filterOption))
      setFilterOptions(
        filterOptions.filter((option) => option !== filterOption)
      );
    else setFilterOptions([...filterOptions, filterOption]);
  };

  return (
    <div className={styles.poll}>
      <p className={styles.question_title}>
        {pollData ? pollData.poll.question : ""}
      </p>
      <Filter updateFilterOptions={updateFilterOptions} />
      <div className={styles.chart}>
        {pollData ? (
          <DoughnutChart
            pollOptions={pollData.options}
            pollData={{
              overall: [pollData.global],
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

Poll.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Poll;
