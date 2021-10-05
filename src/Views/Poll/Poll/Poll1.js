import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styles from "./Poll1.module.css";
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

function Poll1({ match }) {
  const history = useHistory();

    const [value,setValue]=useState(0)
  const { pollId } = match.params;
  const [pollData, setPollData] = useState(null);

  const handleFetch = () => {
    fetch(`https://backend.polbol.in/backend/poll/${pollId}`)
      .then((res) => res.json())
      .then((data) => setPollData(data));
  };
  console.log(pollData);

  const handleClick = () => {
    history.push("/polls");
  };

  useEffect(() => {
    handleFetch();
  }, [match]);

  return (
    <div>
      {pollData ? (
        <>
          <img className={styles.center} src={pollData.payload.image}></img>
          <h3 className={styles.list}>{pollData.payload.question}</h3>

        
            {pollData.payload.type==="pie"?pollData.payload.options.map((val, key) => {
              return (
                <div className={styles.container}>
                <div key={key} className={styles.list}>
                  {val.name}
                </div>
                </div>
              );
            }):<div className={styles.rating}><Typography component="legend">Rating</Typography>
            <Rating
              name="simple-controlled"
              max={10}
              size='large'
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            </div>
           }
        </>
      ) : (
        ""
      )}

      <div className={styles.backbtn} onClick={handleClick}>
        <button>
          {" "}
          <h4>Back to polls</h4>
        </button>
      </div>
    </div>
  );
}

export default Poll1;
