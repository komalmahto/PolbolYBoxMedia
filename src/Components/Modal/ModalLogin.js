import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { Select } from "antd";
import DatePicker from "react-date-picker";
import Apple from "../../assets/apple.svg";
import Play from "../../assets/play_store.png";
import logo from "../../assets/logo.png";
import OtpInput from "react-otp-input";
import axios from "../../axios";
import { fetchToken, updateUser } from "../../Actions/AuthActions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { Option, OptGroup } = Select;

const ModalLogin = ({
  isModalVisible,
  fetchToken,
  setIsModalVisible,
  updateUser,
  auth: { token, user },
}) => {
  const history = useHistory();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [resData, setResData] = useState({});
  const [valid, setValid] = useState(true);
  const [timer, setTimer] = useState({
    time: 30,
    isSet: false,
  });
  const [loginSuccessModal,setLoginSuccessModal] = useState(false);
  const [regionData, setRegionData] = useState([]);
  const [profile, setProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    gender: "",
    dateOfBirth: new Date(),
    religion: "",
    state: "",
    city: "",
  });
  const religionData = [
    "christian",
    "islam",
    "hindu",
    "sikh",
    "jain",
    "buddhist",
    "other",
  ];
  const fetchRegions = async () => {
    await axios.get("/region").then((res) => {
      setRegionData(res.data.payload);
    });
  };
  useEffect(() => {
    fetchRegions();
  }, []);
  useEffect(() => {
    // setIsModalVisible(true);
    if (timer.time > 0 && timer.isSet) {
      let timer1 = setTimeout(
        () => setTimer({ ...timer, time: timer.time - 1 }),
        1000
      );

      // this will clear Timeout when component unmount like in willComponentUnmount
      return () => {
        clearTimeout(timer1);
      };
    }
  });

  const changePhone = (e) => {
    console.log(e.target.value);
    setPhone(e.target.value);
  };
  const handleOtpChange = async (otp) => {
    setOtp(otp);
    if (otp.length === 4) {
      await axios
        .get(`user/${resData._id}/verify-otp?otp=${otp}`)
        .then((res) => {
          console.log(res);
          console.log(res.headers[`x-auth`]);
          localStorage.setItem(
            "authToken",
            JSON.stringify(res.headers[`x-auth`])
          );
          fetchToken(JSON.stringify(res.headers[`x-auth`]), res.data.payload);
          history.push("/");
          setPhone("");
          setOtp("");
          setResData("");
          setTimer({
            time: 30,
            isSet: false,
          });
          setValid(true);
          if (!res.data.payload.gender) {
            setProfile(true);
          } else {
            setLoginSuccessModal(true);
            setIsModalVisible(false);
          }
        })
        .catch((err) => {
          console.log("invalid otp");
          setValid(false);
        });
    }
  };

  const getOtp = async () => {
    if (phone.length === 10) {
      await axios
        .post(`user/login?phone=${phone}`, {
          phone: phone,
        })
        .then((res) => {
          console.log(res);
          setTimer({ ...timer, time: 30, isSet: true });
          setResData(res.data.payload);
        });
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setPhone("");
    setOtp("");
    setResData("");
    setTimer({
      time: 30,
      isSet: false,
    });
    setValid(true);

  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setPhone("");
    setOtp("");
    setResData("");
    setTimer({
      time: 30,
      isSet: false,
    });
    setValid(true);

  };
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  const handleProfileUpdate = async (e) => {
    const { gender, religion, dateOfBirth, state, city } = profileData;
    e.preventDefault();
    if (!gender || !dateOfBirth || !state || !city) {
      toast.error("Fill all fields!");
      return;
    }
    await axios
      .patch(`/user/${user._id}`, profileData, {
        headers: {
          Authorization: {
            toString() {
              return `Bearer ` + JSON.parse(token);
            }
          }
        }
      })
      .then((res) => {
        console.log(res.data.payload);
        updateUser(res.data.payload)
        toast.success("Profile updated!");
        setLoginSuccessModal(true);
        setIsModalVisible(false)
      });
  };

  return (
    <React.Fragment>
      <Modal
        visible={loginSuccessModal}
        onOk={()=>setLoginSuccessModal(false)}
        onCancel={()=>{setLoginSuccessModal(false)}}
        footer={null}
      >
        <h3>Logged in succesfully</h3>
      </Modal>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {!token && (
          <div className="signin-form-container">
            <center>
              {" "}
              <img width={100} src={logo} alt="" />
            </center>

            <div className="signin-form-container-box">
              <div className="head">
                <h2>SIGNIN</h2>
              </div>
              <div>
                <div className="input-box">
                  <input
                    value={phone}
                    onChange={changePhone}
                    type="number"
                    placeholder="Phone number"
                  />
                  <label className="label">Phone number</label>
                </div>
                {Object.keys(resData).length > 0 && (
                  <div className="otp-box">
                    <p>Please enter otp</p>
                    <OtpInput
                      value={otp}
                      onChange={handleOtpChange}
                      numInputs={4}
                      containerStyle={"container-style"}
                      inputStyle={
                        valid ? "input-style" : "input-style invalid-style"
                      }
                      isInputNum={true}
                    />
                    {!valid && <p className="invalid">Invalid otp</p>}
                  </div>
                )}
                <div className="actions">
                  <button
                    onClick={getOtp}
                    onKeyPress={(e) => console.log(e)}
                    type="submit"
                    className="get-otp-btn"
                    disabled={
                      phone.length < 10 || (timer.isSet && timer.time > 0)
                    }
                    style={
                      phone.length < 10 || (timer.isSet && timer.time > 0)
                        ? { cursor: "no-drop" }
                        : { cursor: "pointer" }
                    }
                  >
                    {Object.keys(resData).length > 0 && resData._id
                      ? `Resend Otp ${timer.time > 0 ? `in ${timer.time} s` : ""
                      } `
                      : "Get otp"}
                  </button>{" "}
                </div>
              </div>
            </div>
            <center><p style={{ fontSize: '1.1rem', color: 'grey' }}>By registering on Polbol you accept the following <a href="https://polbol-media.s3.ap-south-1.amazonaws.com/ToS.pdf">Terms and Conditions.</a></p></center>

          </div>
        )}
        {token && profile && (
          <div>
            <center>
              {" "}
              <h3>Update Profile</h3>
            </center>

            <form className="profile-form" onSubmit={handleProfileUpdate}>
              <label htmlFor="gender">
                Gender
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
              <label htmlFor="">
                Date of Birth
              <DatePicker
                  onChange={(value) =>
                    setProfileData((prev) => ({ ...prev, dateOfBirth: value }))
                  }
                  value={profileData.dateOfBirth}
                />
              </label>
              <br />
              <label htmlFor="religion">
                Religion
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
              </label>
              <br />
              <label htmlFor="state">
                State
              <select
                  value={profileData.state}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, state: e.target.value }))
                  }
                >
                  <option value="">Select State</option>
                  {regionData &&
                    regionData.length > 0 &&
                    regionData.map((rel) => (
                      <option value={rel.name}>{rel.name.toUpperCase()}</option>
                    ))}
                </select>
              </label>
              <br />
              {profileData.state && (
                <label htmlFor="city">
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
                <input type="submit" value="Update Profile" />
              </center>
            </form>
          </div>
        )}
        <ToastContainer />
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { fetchToken, updateUser })(ModalLogin);
