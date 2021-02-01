import React from 'react'
import Footer from '../Footer/Footer'
import {Route,Switch} from 'react-router-dom'
import Home from '../../Views/HomePage/Home'
import News from '../../Views/News/News'
import Polls from '../../Views/Polls/Polls'
import Awards from '../../Views/Awards/Awards'
import Livetv from '../../Views/LiveTv/Livetv'
import Graph from '../../Components/Result/Graph'


const MainView = () => {
  return (
    <>
    <div>
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/news" component={News}/>
    <Route exact path="/polls" component={Polls}/>
    <Route exact path="/awards" component={Awards}/>
    <Route exact path="/livetv" component={Livetv}/>
    <Route exact path="/result/:id" component={Graph}/>
    </Switch>
    </div>
    <Footer/>
   
    </>
  )
}

export default MainView
