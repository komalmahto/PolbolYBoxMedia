import React, { useState, useEffect } from "react";
import styles from "./Wallet.module.css";
import Button from "../../Components/Button/Button";
import * as api from "../../api/index";
import axios from "../../axios";
import { connect } from "react-redux";
import { Modal } from "antd";
import google from '../../assets/play_store.png'
import apple from '../../assets/apple.svg'

const Wallet = ({ match, auth }) => {
  const [balance, setBalance] = useState({});
  const [transaction, setTransaction] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchBal();
    fetchTrans();
  }, []);
  const fetchBal = async () => {
    let data;
    console.log(JSON.parse(auth.token));
    try {
      if (api.isAuthenticated()) {
        data = await axios.get(`wallet/fetchBalance`, {
          headers: {
            Authorization: `bearer ${JSON.parse(auth.token)}`,
          },
        });
        setBalance(data.data.payload);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTrans = async () => {
    let data;
    console.log(JSON.parse(auth.token));
    try {
      if (api.isAuthenticated()) {
        data = await axios.get(`wallet/fetchTransactions?page=1`, {
          headers: {
            Authorization: `bearer ${JSON.parse(auth.token)}`,
          },
        });
        setTransaction(data.data.payload.transaction);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal centered visible={visible} footer={null} onCancel={() => setVisible(false)}>
        <center>To Add IKC to you wallet download PolBol app</center>
        <div className={styles.down}>
          <img  className={styles.downBtn} src={google} alt="google" />
          <img className={styles.downBtn} src={apple} alt="apple" />
        </div>
      </Modal>
      <div className={styles.header}>
        <p className={styles.pHeading}>WALLET</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      <div className={styles.amount}>
        <span className={styles.amountHave}>You Have</span>
        <span className={styles.amountVal}>{balance && balance.ikc} KO</span>
      </div>

      <div className={styles.actions}>
        <Button><span style={{cursor:"pointer"}}  onClick={() => setVisible(true)}>ADD IKC</span></Button>
        <Button>REDEEM</Button>
        <Button>MY ORDERS</Button>
      </div>
      <div className={styles.transaction}>
        <div className={styles.head}>Transaction history</div>
        {transaction &&
          Object.keys(transaction).map((key, i) => (
            <div className={styles.month}>
              <p className={styles.monthHead}>{key}</p>
              {transaction[key].items.map((m) => (
                <div className={styles.history}>
                  <div className={styles.left}>
                    <span className={styles.dot}></span>{" "}
                    <div className={styles.purchase}>
                      <span className={styles.purchaseHead}>{m.type}</span>
                      <span className={styles.purchaseDate}> {m.time}</span>
                    </div>
                  </div>
                  <div className={styles.right}>
                    <span className={styles.am}>+ {m.amount} KO</span>
                    <span className={styles.status}>{m.status}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Wallet);
