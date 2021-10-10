import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styles from "./Poll1.module.css";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import "./Poll1.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Poll1({ match }) {
  const history = useHistory();

  const [value, setValue] = useState(1);
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
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleValueChange = (e) => {
    // console.log(e)
    setValue(e.target.value);
  };
  useEffect(() => {
    handleFetch();
  }, [match]);


    const notify = () => {
      navigator.clipboard.writeText(window.location.href)
      toast("Copied to clipboard");
    };
  
  return (
    <div>
      {pollData ? (
        <>
        <ToastContainer/>
          <img className={styles.center} src={pollData.payload.image}></img>
          <h3 className={styles.list}>{pollData.payload.question}</h3>

          {pollData.payload.type === "pie" ? (
            pollData.payload.options.map((val, key) => {
              return (
                <div className={styles.container}>
                  <div className={styles.list1}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="gender"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value={val.name}
                          control={<Radio />}
                          label={val.name}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              {/* <Typography component="legend">Rating</Typography>
              <Rating
                name="simple-controlled"
                max={10}
                size="large"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              /> */}
              <div className="slidecontainer">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={value}
                  onChange={handleValueChange}
                  className="slider"
                  id="myRange"
                />  {value}
              </div>
            </>
          )}
        </>
      ) : (
        ""
      )}
      <div className={styles.share}>
        <button>
          <h3 onClick={notify}>Share</h3>
        </button>
      </div>

      <div className={styles.backbtn} onClick={handleClick}>
        <button>
          <h4>Back to polls</h4>
        </button>
      </div>
    </div>
  );
}

export default Poll1;
