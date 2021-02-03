import React from 'react';

const AwardCategoriesCard = ({c,type}) => {
  return (
    
    <div className='award-categories-card'>
      <div className="img" style={{backgroundImage:`url(${c.image})`}}></div>
      <div  className="data">
      <span>{type==="cat"?c.name:c.heading}</span>
      </div>
    </div>
  );
};

export default AwardCategoriesCard;
