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
            style={{ width: '150px', borderRadius: '50px' }}
            src={im}
            alt=''
          />
        </div>
        <p>
        Now it's Time to Test your Intelligence.
        </p>
        <p>PolBol brings you an exercise for your brain in form of exciting quizzes in 8 different Categories.</p>
        <Button onClick={()=>history.push('/quiz')}  type='primary' danger shape='round' >
          <span style={{color:'white'}}>Play quiz</span>
        </Button>
      </div>
      <div className='disp' style={{ backgroundColor: 'white' }}>
        <div>
          <img
            style={{ width: '150px', borderRadius: '50px' }}
            src={il}
            alt=''
          />
        </div>
        <p>
        Never miss any important update with PolBol.
        </p>
        <p>Catch the Live News from top-rated news channel at once place.</p>
        <Button onClick={()=>history.push('/livetv')}  shape='round' type='primary' danger >
          <span style={{color:'white'}}>Watch Live Tv</span>
        </Button>
      </div>
    </div>
  );
};

export default HomeSection3;
