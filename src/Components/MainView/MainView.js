import React from 'react'
import Footer from '../Footer/Footer'
import {Route,Switch} from 'react-router-dom'
import Home from '../../Views/HomePage/Home'
import News from '../../Views/News/News'
import Polls from '../../Views/Polls/Polls'
import Awards from '../../Views/Awards/Awards'
import Livetv from '../../Views/LiveTv/Livetv'
import Graph from '../../Components/Result/Graph'
import AwardCategories from '../../Views/Awards/AwardCategories'
import AwardSubCategories from '../../Views/Awards/AwardSubCategories'
import Award from '../../Views/Awards/Award'
import AwardT2 from '../../Views/Awards/AwardT2'
import AwardSubCat from '../../Views/Awards/AwardSubCat'
import Quiz from '../../Views/Quiz/Quiz'
import Add from '../../Views/app-ads.txt'
import QuizLevels from '../../Views/Quiz/QuizLevels'
import QuizPlay from '../../Views/Quiz/QuizPlay'
import Youtube from '../../Views/Awards/Youtube'
import {useLocation} from 'react-router-dom'


const MainView = () => {
  const location=useLocation();
  console.log(location,"loc")
  return (
    <>
    <div>
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/app-ads.txt" component={Add}/>
    <Route path="/news" component={News}/>
    <Route exact path="/polls" component={Polls}/>
    <Route exact path="/awards" component={Awards}/>
    <Route exact path="/livetv" component={Livetv}/>
    <Route exact path="/result/:id" component={Graph}/>
    <Route exact path="/award/categories/:id" component={AwardCategories}/>
    <Route exact path="/award/subcat/:showId" component={AwardSubCat}/>
    <Route exact path="/categories/subcat/:showId/:catId" component={AwardSubCategories}/>
    <Route exact path="/categories/subcat/award/:showId/:catId/:awardId" component={Award}/>
    <Route exact path="/categories/subcat/award/:showId/:awardId" component={AwardT2}/>
    <Route exact path="/quiz" component={Quiz}/>
            <Route exact path="/yt/:ytlink" component={Youtube}/>

    <Route exact path="/quiz/levels/:catId" component={QuizLevels}/>
    <Route exact path="/quiz/level/:catId/:quizId" component={QuizPlay}/>
    </Switch>
    </div>
  {location.pathname!=="/yt/undefined"&& <Footer/>}

   
    </>
  )
}

export default MainView
