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
import { connect } from "react-redux";
import ModalLog from "../../../Components/Modal/Modal";
import { fetchToken, updateUser } from "../../../redux/Actions/AuthActions";
import { Modal, Button } from "antd";
import axios from "../../../axios";
import DatePicker from "react-date-picker";
import * as api from "../../../api";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getSlug } from "../../../helpers";

function Poll1({ match, auth, updateUser, lang }) {
  const history = useHistory();

  const [value, setValue] = useState(1);
  const { pollId } = match.params;
  const [pollData, setPollData] = useState(null);
  const [show, setShow] = useState(false);
  const [showProf, setShowProf] = useState(false);
  const [profileData, setProfileData] = useState({
    gender: "",
    dateOfBirth: new Date(),
    religion: "",
    state: "",
    city: "",
  });
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const [allActive, setAllActive] = useState([]);
  const [regionData, setRegionData] = useState([]);
  const fetchRegions = async () => {
    await axios.get("/region").then((res) => {
      setRegionData(res.data.payload);
    });
  };

  useEffect(() => {
    fetchRegions();
  }, []);
  useEffect(() => {
    getActivePolls();
  }, [lang]);

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

  const getActivePolls = async () => {
    try {
      const { data } = await api.getActivePolls(lang);
      setAllActive(data.payload.payload);
    } catch (error) {
      console.log(error);
    }
  };
  const handleValueChange = (e) => {
    // console.log(e)
    setValue(e.target.value);
  };
  useEffect(() => {
    handleFetch();
  }, [match]);

  const notify = () => {
    navigator.clipboard.writeText(window.location.href);
    toast("Copied to clipboard");
  };

  const handleSubmit = () => {
    if (!auth.token) {
      setShow(true);
    } else {
      if (auth.token && !auth.user.gender) {
        console.log("update profile");
        setShowProf(true);
      } else {
        console.log(value);
      }
    }
  };

  const handleProfileUpdate = async (e) => {
    const { gender, dateOfBirth, state, city } = profileData;
    e.preventDefault();
    if (!gender || !dateOfBirth || !state || !city) {
      toast.error("Fill all fields!");
      return;
    }
    await axios
      .patch(`/user/${auth.user._id}`, profileData, {
        headers: {
          Authorization: {
            toString() {
              return `Bearer ` + JSON.parse(auth.token);
            },
          },
        },
      })
      .then((res) => {
        toast.success("Profile updated!");
        updateUser(res.data.payload);
        // setIsModalVisible(false)
        setShowProf(false);
      });
  };
  return (
    <div className={styles.cont}>
      {pollData ? (
        <>
          <ToastContainer />
          <Modal
            onCancel={() => setShowProf(false)}
            visible={showProf}
            footer={null}
          >
            <div>
              <center>
                {" "}
                <h3>Update Profile</h3>
              </center>

              <form className="profileForm" onSubmit={handleProfileUpdate}>
                <label className="gender" htmlFor="gender">
                  <span>Gender</span>
                  <select
                    value={profileData.gender}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </label>
                <br />
                <label className="gender" htmlFor="">
                  Date of Birth
                  <DatePicker
                    onChange={(value) =>
                      setProfileData((prev) => ({
                        ...prev,
                        dateOfBirth: value,
                      }))
                    }
                    value={profileData.dateOfBirth}
                  />
                </label>
                {/* <label htmlFor="religion">
                Religion (optional)
              <select
                  value={profileData.religion}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      religion: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Religion</option>
                  {religionData &&
                    religionData.map((rel) => (
                      <option value={rel}>{rel.toUpperCase()}</option>
                    ))}
                </select>
              </label> */}
                <br />
                <label className="gender" htmlFor="state">
                  State
                  <select
                    value={profileData.state}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        state: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select State</option>
                    {regionData &&
                      regionData.length > 0 &&
                      regionData.map((rel) => (
                        <option value={rel.name}>
                          {rel.name.toUpperCase()}
                        </option>
                      ))}
                  </select>
                </label>
                <br />
                {profileData.state && (
                  <label className="gender" htmlFor="city">
                    City
                    <select
                      value={profileData.city}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select City</option>
                      {regionData &&
                        regionData.length > 0 &&
                        regionData
                          .filter((p) => p.name === profileData.state)[0]
                          .subRegions.map((rel) => (
                            <option value={rel}>{rel}</option>
                          ))}
                    </select>
                  </label>
                )}

                <center>
                  <input
                    className="update-btn"
                    type="submit"
                    value="Update Profile"
                  />
                </center>
              </form>
            </div>{" "}
          </Modal>
          <ModalLog
            fetchToken={(token, user) => fetchToken(token, user)}
            show={show}
            onHide={() => setShow(false)}
          />
          <div className={styles.carousel}>
            <Carousel
              infinite={true}
              itemClass={styles.grid}
              responsive={responsive}
            >
              {allActive.length > 0 &&
                allActive
                  .filter((fil) => fil._id !== pollId)
                  .map((pol) => (
                    <div className={styles.carouselCard}>
                      <div
                        className={styles.carouselImage}
                        style={{ backgroundImage: `url(${pol.image})` }}
                      ></div>
                      <div className={styles.carouselText}>
                        {lang.language === "Hindi"
                          ? pol.question_hindi
                          : pol.question}
                        <center>
                          <span
                            onClick={() =>
                              history.push(
                                `/poll/${getSlug(
                                  lang.language === "Hindi"
                                    ? pol.question_hindi
                                    : pol.question
                                )}/${pol._id}`
                              )
                            }
                            className={styles.voteBtn}
                          >
                            Vote Now
                          </span>
                        </center>
                      </div>
                    </div>
                  ))}
            </Carousel>
          </div>
          <div className={styles.rel}>
            <img className={styles.center} src={pollData.payload.image}></img>

            <span onClick={notify} className={styles.sharebtn}>
              <i className="fas fa-share-alt"></i>
            </span>
            <h6 className={styles.list}>
              {lang.language === "Hindi"
                ? pollData.payload.question_hindi
                : pollData.payload.question}
            </h6>
          </div>

          {pollData.payload.type === "pie" ? (
            <div className={styles.opcont}>
              {pollData.payload.options.map((val, key) => {
                return (
                  <div
                    className={styles.container}
                    style={
                      value == val.name
                        ? {
                            border: "2px solid grey",
                            backgroundColor: "#fad5b8",
                          }
                        : { border: "2px solid transparent" }
                    }
                  >
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
                            control={
                              <Radio
                                style={{
                                  visibility: "hidden",
                                  display: "none",
                                }}
                              />
                            }
                            label={
                              <span style={{ fontSize: "12px" }}>
                                {lang.language === "Hindi"
                                  ? val.name_hindi
                                  : val.name}
                              </span>
                            }
                          />
                        </RadioGroup>
                      </FormControl>
                      {/* <label htmlFor={key}>
                      {val.name}
                      <input onChange={handleChange} style={{display:"none"}} name="options" id={key} type="radio" value={val.name} />
                    </label> */}
                    </div>
                  </div>
                );
              })}
            </div>
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
              <div className={styles.slidecontainer}>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={value}
                  onChange={handleValueChange}
                  className="slider"
                  id="myRange"
                />{" "}
                {value}
              </div>
            </>
          )}
        </>
      ) : (
        ""
      )}

      <div className={styles.actions}>
        <span className={styles.backbtn} onClick={handleClick}>
          Back to polls
        </span>
        <span className={styles.submitbtn} onClick={handleSubmit}>
          Submit
        </span>
        {/* <span onClick={notify} className={styles.sharebtn}>
          Share
        </span> */}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    lang: state.lang,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchToken: (token, user) => dispatch(fetchToken(token, user)),
  };
};

export default connect(mapStateToProps, { updateUser })(Poll1);
