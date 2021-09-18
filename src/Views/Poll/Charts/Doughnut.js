import { Doughnut } from "react-chartjs-2";
import styles from "./Charts.module.css";
import palette from "../../../colors";

export default function DoughnutChart({ pollOptions, pollData }) {
  let labels = [];
  for (const key in pollOptions) labels.push(pollOptions[key]);

  // let data = [];

  const getData = (pollData) => {
    let data = [];
    for (const keys in pollData) data.push(pollData[keys]);

    return data;
  };

  const getColors = (pollData) => {
    let length = 0;
    for (const keys in pollData) length++;

    let backgroundColors = [];
    for (let i = 0; i < length; i++) backgroundColors[i] = palette[i];

    return backgroundColors;
  };

  const overallData = {
    labels,
    datasets: [
      {
        label: "# of Votes",
        data: getData(pollData.overall[0]),
        backgroundColor: getColors(pollData.overall[0]),
        borderColor: getColors(pollData.overall[0]),
        borderWidth: 1,
      },
    ],
  };

  console.log(pollData);

  return (
    <>
      <div className={styles.overall}>
        <div className={styles.grid}>
          <Doughnut
            data={overallData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
          {/* <p>Total Votes: {getTotalVotes()}</p> */}
        </div>
      </div>
    </>
  );
}
