import React from 'react';

const NomineeCard = ({ p }) => {
  return (
    <div className='nominee-card'>
      <div
        className='img'
        style={{
          clipPath: 'circle(50% at 50% 50%)',
          height: '200px',
          width: '200px',
          backgroundImage: `url(${p.image})`,
        }}
      ></div>
      <div style={{textAlign:'center',fontWeight:'bold',marginTop:'1rem'}}>{p.name}</div>
    </div>
  );
};

export default NomineeCard;
