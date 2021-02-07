import React from 'react';
import im from '../../assets/download (1).jpeg';
import il from '../../assets/download.jpeg';
import { Button, Radio } from 'antd';
import {useHistory} from 'react-router-dom'

const HomeSection3 = () => {
  const history=useHistory();
  return (
    <div className='base'>
      <div className='disp' style={{ backgroundColor: 'white' }}>
        <div>
          <img
            style={{ width: '50px', width: '100px', borderRadius: '50px' }}
            src={im}
            alt=''
          />
        </div>
        <p>
        Polbol provides exercises for your mind in form of quizzes to test your intelligence and for your entertainment.
        </p>
        <Button onClick={()=>history.push('/quiz')} type='primary' shape='round' ghost>
          Play quiz
        </Button>
      </div>
      <div className='disp' style={{ backgroundColor: 'white' }}>
        <div>
          <img
            style={{ width: '50px', width: '100px', borderRadius: '50px' }}
            src={il}
            alt=''
          />
        </div>
        <p>
        Never miss any important update with Polbol, catch all the news from top-rated news channel at once place.
        </p>
        <Button onClick={()=>history.push('/livetv')}  shape='round' type='primary' ghost>
          Watch live
        </Button>
      </div>
    </div>
  );
};

export default HomeSection3;
