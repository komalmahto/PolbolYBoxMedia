import React from 'react';
import { Link } from 'react-router-dom';

const JuryCard = ({ p }) => {
  return (
    <div className='jury-card'>
      <div
        className='img'
        style={{
          clipPath: 'circle(50% at 50% 50%)',
          height: '130px',
          width: '130px',
          backgroundImage: `url(${p.image})`,
        }}
      ></div>
      <div className="data">
        <div style={{alignSelf:'flex-start',padding:'1rem'}}><q>{p.comments}</q></div>
        <div style={{alignSelf:'flex-end'}}>
          <p>{p.name}</p>
          <p>{p.designation}</p>
          <p>{p.organization}</p>
          <Link>{p.medialink}</Link>
        </div>
      </div>
    </div>
  );
};

export default JuryCard;
