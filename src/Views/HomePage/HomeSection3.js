import React from 'react'
import im from '../../assets/download (1).jpeg'
import il from '../../assets/download.jpeg'
import { Button, Radio } from 'antd';


const HomeSection3 = () => {
  return (
    <div className="base">
    <div className="disp" style={{backgroundColor:'white'}}>
    <div>
    <img style={{width:'50px',width:'100px',borderRadius:'50px'}} src={im} alt=""/>
    </div>
    <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ipsam ea earum delectus, fugit vero quo dignissimos assumenda? Provident in assumenda suscipit enim officia, quia nobis officiis blanditiis delectus doloribus.
    </p>
    <Button type="primary" shape='round' ghost>
   Play quiz
    </Button>
    </div>
    <div className="disp" style={{backgroundColor:'white'}}>
    <div>
    <img style={{width:'50px',width:'100px',borderRadius:'50px'}} src={il} alt=""/>
    </div>
    <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ipsam ea earum delectus, fugit vero quo dignissimos assumenda? Provident in assumenda suscipit enim officia, quia nobis officiis blanditiis delectus doloribus.
    </p>
    <Button shape='round' type="primary" ghost>
  Watch live
  </Button>
    </div>
    
      
    </div>
  )
}

export default HomeSection3
