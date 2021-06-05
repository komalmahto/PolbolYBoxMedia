import React from 'react';
import { PlayCircleOutlined, LockOutlined } from '@ant-design/icons'

const QuizLevelsCard = ({ level, english }) => {
  return (
    <div className="level-card" style={{cursor:'pointer'}} >
      <div className="left">
        <img style={{ width: '70px' }} src={level.icon} alt='' />
        <div className="meta">
          <span style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>{english ? 'Level' : "स्तर"} {level.level}</span>
          <div>
            {level.level === 1 ? <span style={{ fontSize: '4rem', cursor: 'pointer' }}><PlayCircleOutlined /></span> : <span style={{ fontSize: '4rem' }}><LockOutlined /></span>}
          </div>
        </div>
      </div>

    </div>
  );
};

export default QuizLevelsCard;
