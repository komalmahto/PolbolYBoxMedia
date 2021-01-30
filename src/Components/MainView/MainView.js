import React from 'react'
import Footer from '../Footer/Footer'
import {Route,Switch} from 'react-router-dom'
import Home from '../../Views/Home'


const MainView = () => {
  return (
    <>
    <div>
    <Switch>
    <Route exact path="/" component={Home}/>
    </Switch>
    </div>
    <Footer/>
   
    </>
  )
}

export default MainView
