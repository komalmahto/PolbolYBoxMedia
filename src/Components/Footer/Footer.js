import React,{useState} from 'react';
import {Col, Row} from 'antd';
import {Link} from 'react-router-dom';

import Logo from '../../assets/logo.png';
import Modal from '../Modal/Modal'
const Footer = () => {
    const [isModalVisible,setIsModalVisible]=useState(false)

    return (
        <div style={{
            marginTop: "100px",
            background: `linear-gradient(179.62305952040288deg,#27383f .8071748878923769%,#10161b 68.96860986547085%)`,
        }}>

<Modal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />


            <br></br>
            <br/>
            <Row style={{color: "white"}}>
                <Col xs={0} sm={0} md={2} lg={3}/>
                <Col xs={24} sm={24} md={14} style={{padding: "10px"}}>
                    <img alt={'Logo'} src={Logo} style={{height: "70px"}}/>
                    
                    <p style={{marginTop: "20px", fontSize: "12px",color:'white',width:'230px'}}>Copyright © 2021 All rights reserved | This template is made by <a style={{color:'white'}} href='http://www.yboxmedia.com/' target="_blank">YBox Media Technologies</a></p>
                    <div>
                        <br/>
                        <a target='_blank' rel='noreferrer noopener' href={'https://www.facebook.com/polbol.media/'}
                           style={{color: "white"}}>
                            <i className="fa fa-facebook fa-2x"/>
                        </a>
                        <a target='_blank' rel='noreferrer noopener' href={'https://twitter.com/mediapolbol'}
                           style={{marginLeft: '30px', color: "white"}}>
                            <i className="fa fa-twitter fa-2x"/>
                        </a>
                        <a target='_blank' rel='noreferrer noopener' href={'mailto:infopolbol@gmail.com'}
                           style={{marginLeft: '30px', color: "white"}}>
                            <i className="fa fa-envelope fa-2x"/>
                        </a>
                        <a target='_blank' rel='noreferrer noopener'
                           href={'https://instagram.com/polbol.media?igshid=1g22qbpf4mig3'}
                           style={{marginLeft: '30px', color: "white"}}>
                            <i className="fa fa-instagram fa-2x"/>
                        </a>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={4} style={{padding: "10px"}}>
                    <div>
                        <br/>
                        <Link to="/" style={{color: "white"}}>
                            <h3 style={{color: "white"}}>Home</h3>
                        </Link>                       
                        <a href="https://apps.apple.com/pa/app/polbol/id1476395002?l=en" style={{color: "white"}} target="_blank">
                            <h3 style={{color: "white"}}>Download App</h3>
                        </a>
                        <a href="https://polbol-media.s3.ap-south-1.amazonaws.com/ToS.pdf" style={{color: "white"}} target="_blank">
                            <h3 style={{color: "white"}}>Terms and Conditions</h3>
                        </a>
                        <Link to="" style={{color: "white"}}>
                            <h3 style={{color: "white"}}>About Developer</h3>
                        </Link>
                    </div>
                </Col>
                <Col xs={0} sm={0} md={2} lg={3}/>
            </Row>
            <br/>
            <br/>
        </div>
    );

};

export default Footer;
