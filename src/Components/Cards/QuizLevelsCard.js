import React from 'react';
import {PlayCircleOutlined,LockOutlined} from '@ant-design/icons'

const QuizLevelsCard = ({ level }) => {
  return (
    <div className="level-card" >
      <div className="left">
        <img style={{ width: '70px' }} src={level.icon} alt='' />
        <div className="meta">
          <span>Level {level.level}</span>
          <span>{level.level===1 &&level.metadata.maxQuestions+"Questions"}</span>
        </div>
      </div>
      <div style={{alignSelf:'center',justifySelf:'center'}}>
     {level.level===1?<span style={{fontSize:'4rem'}}><PlayCircleOutlined /></span> :<span style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}><LockOutlined /> <span style={{fontSize:'1rem',display:'block',textAlign:'center',width:'105px'}}>Login or register to enjoy full experience</span></span>}
      </div>
    </div>
  );
};

export default QuizLevelsCard;