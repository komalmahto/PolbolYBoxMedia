import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import OtpInput from "react-otp-input";
import axios from "../../axios";
import { connect } from "react-redux";
import { fetchToken } from "../../redux/Actions/AuthActions";

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
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Phone number</h4>
          <input type="number" onChange={handleChange}></input>
          <br />
          <Button disabled={!btnshow} onClick={getOtp}>
            Get Otp
          </Button>
          {Object.keys(phoneData).length > 0 && (
            <div className="otp-box">
              <p>Please enter otp</p>
              <OtpInput
                value={otp}
                onChange={handleOtpChange}
                numInputs={4}
                containerStyle={"container-style"}
                inputStyle={valid ? "input-style" : "input-style invalid-style"}
                isInputNum={true}
              />
              {!valid && <p className="invalid">Invalid otp</p>}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchToken: (token, user) => dispatch(fetchToken(token, user)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyVerticallyCenteredModal);
