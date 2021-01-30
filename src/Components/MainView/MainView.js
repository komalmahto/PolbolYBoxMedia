import React from 'react'
import Footer from '../Footer/Footer'
import {Route,Switch} from 'react-router-dom'
import Home from '../../Views/HomePage/Home'
import News from '../../Views/News/News'


const MainView = () => {
  return (
    <>
    <div>
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/news" component={News}/>
    </Switch>
    </div>
    <Footer/>
   
    </>
  )
}

export default MainView
