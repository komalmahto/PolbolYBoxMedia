import React, { useState, useEffect } from "react";
import "./livetv.css";
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
    <div className="livetv">
      <div className="header">
        <p className="pHeading">LIVE TV</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      <div className="options">
        <div onClick={() => handleLanguage("hindi")} className="lang">
          Hindi
          <hr className={"line" + (language === "hindi" ? "show" : "")} />
        </div>

        <div onClick={() => handleLanguage("english")} className="lang">
          English
          <hr className={"line" + (language === "english" ? "show" : "")} />
        </div>
      </div>
      <div className="channels">
        {channelData
          ? channelData.map((channel, index) => {
              if (channel.language == language) {
                return <div key={index} className="channel" onClick={()=>handleClick(channel)}style={{backgroundImage:`url(${channel.image})`}}></div>;
              }
            })
          : ""}
      </div>
      <div className="player">
          <ReactPlayer  playing={true} width="100%" controls={true} url={activechannel} />
      </div>
    </div>
  );
}

export default LiveTv;
