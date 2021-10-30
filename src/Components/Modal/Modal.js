import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import OtpInput from "react-otp-input";
import axios from "../../axios";
import styles from "./Modal.module.css";
import { Link } from "react-router-dom";
import log from "./logo.png";

function MyVerticallyCenteredModal(props) {
  const [num, setNum] = useState(null);
  const [otp, setOtp] = useState(null);
  const [btnshow, setBtnshow] = useState(false);
  const [phoneData, setPhoneData] = useState("");
  const [valid, setValid] = useState(true);

  const handleChange = (e) => {
    setNum(e.target.value);
    if (e.target.value.length === 10) {
      setBtnshow(true);
    } else {
      setBtnshow(false);
    }
  };
  const googleLogin = async () => {
    await axios
      .get("https://backend.polbol.in/backend/user/login/socialAuth/google")
      .then((res) => {
        window.location.assign(res.data.payload);
        console.log(res);
      });
  };
  const getOtp = async () => {
    await axios
      .post(`user/login?phone=${num}`, {
        phone: num,
      })
      .then((res) => {
        console.log(res);
        setPhoneData(res.data.payload);
      });
  };

  const handleOtpChange = async (otp) => {
    setOtp(otp);
    if (otp.length === 4) {
      await axios
        .get(`user/${phoneData._id}/verify-otp?otp=${otp}`)
        .then((res) => {
          console.log(res);
          console.log(res.headers[`x-auth`]);
          localStorage.setItem(
            "authToken",
            JSON.stringify(res.headers[`x-auth`])
          );
          props.fetchToken(
            JSON.stringify(res.headers[`x-auth`]),
            res.data.payload
          );
          setNum("");
          setOtp("");
          setPhoneData("");
          setValid(true);
          props.onHide();
        })
        .catch((err) => {
          console.log("invalid otp");
          setValid(false);
        });
    }
  };
  const handleCancel = () => {
    props.onHide();
    setNum("");
    setOtp("");
    setPhoneData("");
    setValid(true);
  };
  return (
    <>
      <Modal
        {...props}
        onExited={handleCancel}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h4 >Phone number</h4> */}
          <div className={styles.center}>
            <input
              className={styles.inp}
              type="tel"
              onChange={handleChange}
              placeholder="Phone Number"
            ></input>
            <br />

            <button
              className={styles.otpBtn}
              disabled={!btnshow}
              onClick={getOtp}
            >
              Get Otp
            </button>
            <br />
            <center style={{ color: "grey" }}>Or login using</center>
            <br />
            <center>
              <span onClick={googleLogin} className={styles.google}>
                <img src={log} height="20px" width="20px" />
                Google
              </span>
            </center>
            <br />
          </div>
          {Object.keys(phoneData).length > 0 && (
            <div className={styles.OtpBox}>
              <p>Please enter otp</p>
              <OtpInput
                value={otp}
                onChange={handleOtpChange}
                numInputs={4}
                containerStyle={styles.container}
                inputStyle={valid ? styles.valid : styles.invalid}
                isInputNum={true}
              />
              {!valid && <p className="invalid">Invalid otp</p>}
            </div>
          )}
          <center className={styles.terms}>
            <i className="fas fa-shield-alt"></i>
            <p>
              We are not storing any private information .By continuing you
              agree to our{" "}
              <span className={styles.cond}>
                <a
                  target="_blank"
                  href="https://polbol-media.s3.ap-south-1.amazonaws.com/ToS.pdf"
                >
                  Terms and conditons
                </a>
              </span>
            </p>
          </center>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyVerticallyCenteredModal;
