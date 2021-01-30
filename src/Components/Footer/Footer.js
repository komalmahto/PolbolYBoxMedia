import React from 'react';
import {Col, Row} from 'antd';
import {Link} from 'react-router-dom';

import Logo from '../../assets/logo.png';

const footer = () => {
    return (
        <div style={{
            marginTop: "100px",
            background: `linear-gradient(179.62305952040288deg,#27383f .8071748878923769%,#10161b 68.96860986547085%)`,
        }}>
            <br></br>
            <br/>
            <Row style={{color: "white"}}>
                <Col xs={0} sm={0} md={2} lg={3}/>
                <Col xs={24} sm={24} md={14} style={{padding: "10px"}}>
                    <img alt={'Logo'} src={Logo} style={{height: "70px"}}/>
                    <p style={{marginTop: "10px", fontSize: "15px"}}>All rghts Reserved</p>
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
                        <Link to="" style={{color: "white"}}>
                            <h3 style={{color: "white"}}>Home</h3>
                        </Link>
                        <Link to="" style={{color: "white"}}>
                            <h3 style={{color: "white"}}>Download App</h3>
                        </Link>
                        <Link to="" style={{color: "white"}}>
                            <h3 style={{color: "white"}}>Privacy Policy</h3>
                        </Link>
                        <Link to="" style={{color: "white"}}>
                            <h3 style={{color: "white"}}>Terms and Conditions</h3>
                        </Link>
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

export default footer;
