import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import { connect } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { petitionCategories } from "../../data";
import axios from "../../axios";
import { fetchToken, updateUser } from "../../redux/Actions/AuthActions";
import { Modal } from "antd";
import DatePicker from "react-date-picker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Profile = ({ match, auth, updateUser }) => {
  useEffect(() => {
    setSelectedCategories(auth.user.newsInterests);
    setProfile({
      ...profile,
      firstName: auth.user.firstName ? auth.user.firstName : "",
      lastName: auth.user.lastName ? auth.user.lastName : "",
      avatar: auth.user.avatar,
      city: auth.user.city ? auth.user.city : "",
      state: auth.user.state ? auth.user.state : "",
      dateOfBirth: auth.user.dateOfBirth
        ? new Date(auth.user.dateOfBirth)
        : new Date(),
    });

    fetchRegions();
  }, []);

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
    city: "",
    state: "",
    dateOfBirth: new Date(),
  });

  const [regionData, setRegionData] = useState([]);
  const fetchRegions = async () => {
    await axios.get("/region").then((res) => {
      setRegionData(res.data.payload);
    });
  };
  const onSelect = async (selectedList, selectedItem) => {
    let newArr = [];
    newArr = selectedList.map((m) => {
      return m.name;
    });
    console.log(newArr);
    await axios
      .patch(
        `/user/${auth.user._id}`,
        { newsInterests: newArr },
        {
          headers: {
            Authorization: {
              toString() {
                return `Bearer ` + JSON.parse(auth.token);
              },
            },
          },
        }
      )
      .then((res) => {
        updateUser(res.data.payload);
      });

    setSelectedCategories([...selectedCategories, selectedItem.name]);
  };

  const onRemove = async (selectedList, selectedItem) => {
    let newArr = [];
    newArr = selectedList.map((m) => {
      return m.name;
    });
    console.log(newArr);
    await axios
      .patch(
        `/user/${auth.user._id}`,
        { newsInterests: newArr },
        {
          headers: {
            Authorization: {
              toString() {
                return `Bearer ` + JSON.parse(auth.token);
              },
            },
          },
        }
      )
      .then((res) => {
        updateUser(res.data.payload);
      });

    setSelectedCategories(
      selectedCategories.filter((category) => category !== selectedItem.name)
    );
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    if (
      !profile.firstName ||
      !profile.dateOfBirth ||
      !profile.state ||
      !profile.city
    ) {
      toast("Fill all required fields!");
      return;
    } else {
      console.log("sss");

      await axios
        .patch(`/user/${auth.user._id}`, profile, {
          headers: {
            Authorization: {
              toString() {
                return `Bearer ` + JSON.parse(auth.token);
              },
            },
          },
        })
        .then((res) => {
          updateUser(res.data.payload);
          setVisible(false);
          toast("Profile updated!");
        });
    }
  };

  const Upprofile = async (e) => {
    console.log(e);
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("image", file);
    await axios
      .post(`/upload/image`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: {
            toString() {
              return `Bearer ` + JSON.parse(auth.token);
            },
          },
        },
      })
      .then(async(res) => {
        console.log(res);
        setProfile((prev) => ({
          ...prev,
          avatar: res.data.payload,
        }));
        await axios
        .patch(`/user/${auth.user._id}`, {avatar:res.data.payload}, {
          headers: {
            Authorization: {
              toString() {
                return `Bearer ` + JSON.parse(auth.token);
              },
            },
          },
        })
        .then((res) => {
          updateUser(res.data.payload);
          toast("Profile Picture Updated!!!");
        });
      });
  };
  return (
    <>
      <ToastContainer />
      <Modal
        onCancel={() => setVisible(false)}
        footer={null}
        centered
        visible={visible}
        title="Edit Profile"
      >
        <form onSubmit={updateProfile} action="" className={styles.form}>
          <label className="gender" htmlFor="">
            Avatar
            <div className={styles.lol}>
              <div
                style={{ backgroundImage: `url(${profile.avatar})` }}
                className={styles.ava}
              ></div>
              <input onChange={Upprofile} type="file" />
            </div>
          </label>
          <label className="gender" htmlFor="">
            <span>First name</span>
            <input
              className={styles.inp}
              type="text"
              value={profile.firstName}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
            />
          </label>
          <label className="gender" htmlFor="">
            <span>Last name</span>
            <input
              className={styles.inp}
              type="text"
              value={profile.lastName}
              placeholder="optional"
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
            />
          </label>

          <label className="gender" htmlFor="state">
            State
            <select
              className={styles.inp}
              value={profile.state}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  state: e.target.value,
                  city: "",
                }))
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

          {profile.state && (
            <label className="gender" htmlFor="city">
              City
              <select
                className={styles.inp}
                value={profile.city}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
              >
                <option value="">Select City</option>
                {regionData &&
                  regionData.length > 0 &&
                  regionData
                    .filter((p) => p.name === profile.state)[0]
                    .subRegions.map((rel) => (
                      <option value={rel}>{rel}</option>
                    ))}
              </select>
            </label>
          )}
          <label className="gender" htmlFor="">
            Date of Birth
            <DatePicker
              onChange={(value) =>
                setProfile((prev) => ({
                  ...prev,
                  dateOfBirth: value,
                }))
              }
              value={profile.dateOfBirth}
            />
          </label>
          <input
            className={styles.deactivate}
            type="submit"
            value="Update profile"
          />
        </form>
      </Modal>
      <div className={styles.profile}>
        <div className={styles.timeline}>
          <div className={styles.left}>
            <div
              style={{ backgroundImage: `url(${auth.user.avatar})` }}
              className={styles.propic}
            ></div>
            <span
              style={{ cursor: "pointer" }}
              className={styles.edit}
              onClick={() => setVisible(true)}
            >
              Edit profile
            </span>
          </div>
        </div>
        <div className={styles.right}>
          <h2>{auth.user.userName}</h2>
          <p>
            <i className="far fa-user"></i> {auth.user.firstName}{" "}
            {auth.user.lastName}
          </p>
          <div className={styles.gri}>
            {auth.user.phone && <span>{auth.user.phone}</span>}
            {auth.user.email && <span>{auth.user.email}</span>}
            {auth.user.dateOfBirth && (
              <span>{getAge(auth.user.dateOfBirth)}</span>
            )}
            {auth.user.city && (
              <span>
                {auth.user.city},{auth.user.state}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className={styles.newsInterests}>
        <center className={styles.headd}>News Interests</center>
        <div
          style={{
            width: "80%",
            fontSize: "0.8rem",
            margin: "15px auto",
          }}
        >
          <Multiselect
            selectedValues={selectedCategories.map((p) => {
              return { name: p };
            })}
            style={{ height: "100%" }}
            options={petitionCategories.map((category) => ({ name: category }))}
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue="name"
            placeholder="View All News Intrests"
            showArrow
          />
        </div>
        <center>
          <span className={styles.deactivate}>Deactivate account</span>
        </center>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { updateUser })(Profile);
