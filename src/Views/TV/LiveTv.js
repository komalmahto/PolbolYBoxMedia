import React, { useState, useEffect } from "react";
import styles from "./livetv.module.css";
import ReactPlayer from 'react-player'
import axios from "../../axios";
function LiveTv() {
  const [language, setLanguage] = useState("english");
  const [channelData, setChannelData] = useState(null);
  const [activechannel,setActiveChannel]=useState(null);
 

  const handleLanguage = (lang) => {
    setLanguage(lang);
  };
  const handleClick=(channel)=>{
    setActiveChannel(channel.link)
  }
  const fetchData = async () => {
      try{
   const {data} =await  axios.get("channels")
    setChannelData(data.payload)
    setActiveChannel(data.payload[0].link)
  }
  catch(err){
      console.log(err);
  }

  };
 
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.livetv}>
      <div className={styles.header}>
        <p className={styles.pHeading}>LIVE TV</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      <div className={styles.options}>
        <div onClick={() => handleLanguage("hindi")} className={styles.lang}>
          Hindi
          <hr className={ (language === "hindi" ? styles.lineshow : styles.line)} />
        </div>

        <div onClick={() => handleLanguage("english")} className={styles.lang}>
          English
          <hr className={ (language === "english" ? styles.lineshow : styles.line)} />
        </div>
      </div>
      <div className={styles.channels}>
        {channelData
          ? channelData.map((channel, index) => {
              if (channel.language == language) {
                return <div key={index} className={styles.channel} onClick={()=>handleClick(channel)}style={{backgroundImage:`url(${channel.image})`}}></div>;
              }
            })
          : ""}
      </div>
      <div className={styles.player}>
          <ReactPlayer  playing={true} width="100%" controls={true} url={activechannel} />
      </div>
    </div>
  );
}

export default LiveTv;
