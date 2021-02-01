import React from 'react';

const PollCard = ({type2,p,icons,getExpiryString1}) => {
  return (
    <div
      className={
        type2 === 'polls'
          ? 'long-card long-card-hor'
          : 'long-card long-card-ver'
      }
    >
      <div
        className='long-card-img'
        style={{
          backgroundImage: `url(${type2 === 'polls' ? p.image : p.icon?p.icon:p.image})`,
        }}
      ></div>
      <div className='long-card-desc'>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <span className='heading'>
            {type2 === 'polls' && (
              <img
                style={{ height: '25px', width: '25px', marginRight: '1rem' }}
                src={
                  type2 === 'polls' ? icons[p.categories[0]] : icons[p.type[0]]
                }
              />
            )}
            {type2 === 'polls'
              ? `Poll on ${p.categories[0]}`
              : `${getExpiryString1 && getExpiryString1(p.lifeSpan)}`}
          </span>
          <p>{p.question}</p>
        </div>
        {type2 === 'polls' && <span className='give-rating'>Give Rating</span>}
      </div>
    </div>
  );
};

export default PollCard;
