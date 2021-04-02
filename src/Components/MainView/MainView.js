import React, { Suspense } from 'react'
import Footer from '../Footer/Footer'
import { Route, Switch } from 'react-router-dom'
import Home from '../../Views/HomePage/Home'

import Add from '../../Views/app-ads.txt'

import { useLocation } from 'react-router-dom'
const News = React.lazy(() => import('../../Views/News/News'));
const Polls = React.lazy(() => import('../../Views/Polls/Polls'));
const Awards = React.lazy(() => import('../../Views/Awards/Awards'));
const Livetv = React.lazy(() => import('../../Views/LiveTv/Livetv'));
const Graph = React.lazy(() => import('../../Components/Result/Graph'));
const AwardCategories = React.lazy(() => import('../../Views/Awards/AwardCategories'));
const AwardSubCategories = React.lazy(() => import('../../Views/Awards/AwardSubCategories'));
const Award = React.lazy(() => import('../../Views/Awards/Award'));
const AwardT2 = React.lazy(() => import('../../Views/Awards/AwardT2'));
const AwardSubCat = React.lazy(() => import('../../Views/Awards/AwardSubCat'));
const Quiz = React.lazy(() => import('../../Views/Quiz/Quiz'));
const QuizLevels = React.lazy(() => import('../../Views/Quiz/QuizLevels'));
const QuizPlay = React.lazy(() => import('../../Views/Quiz/QuizPlay'));
const Youtube = React.lazy(() => import('../../Views/Awards/Youtube'));

const MainView = () => {
  const location = useLocation();
  console.log(location, "loc")
  const pat = location.pathname.split('/')

  return (
    <>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/app-ads.txt" component={Add} />
          <Route path="/news" render={(props) => <Suspense fallback={<div>Loading...</div>}>
            <News {...props} />
          </Suspense>
          } />
          <Route exact path="/polls" render={(props) => <Suspense fallback={<div>Loading...</div>}>
            <Polls {...props} />
          </Suspense>
          } />
          <Route exact path="/awards" render={(props) => <Suspense fallback={<div>Loading...</div>}>
            <Awards {...props} />
          </Suspense>
          } />
          <Route exact path="/livetv" render={(props) => <Suspense fallback={<div>Loading...</div>}>
            <Livetv {...props} />
          </Suspense>
          } />
          <Route exact path="/result/:id" render={(props) => <Suspense fallback={<div>Loading...</div>}>
            <Graph {...props} />
          </Suspense>
          } />
          <Route exact path="/award/categories/:id" render={(props) => <Suspense fallback={<div>Loading...</div>}>
            <AwardCategories {...props} />
          </Suspense>
          } />
          <Route exact path="/award/subcat/:showId" render={(props) => <Suspense fallback={<div>Loading...</div>}>
            <AwardSubCat {...props} />
          </Suspense>
          } />
          <Route exact path="/categories/subcat/:showId/:catId" render={(props) => <Suspense fallback={<div>Loading...</div>}>
            <AwardSubCategories {...props} />
          </Suspense>
          } />
          <Route exact path="/categories/subcat/award/:showId/:catId/:awardId" render={(props) => <Suspense fallback={<div>Loading...</div>}>
            <Award {...props} />
          </Suspense>
          } />
          <Route exact path="/categories/subcat/award/:showId/:awardId" render={(props) => <Suspense fallback={<div>Loading...</div>}>
            <AwardT2 {...props} />
          </Suspense>
          } />
          <Route exact path="/quiz" render={(props) => <Suspense fallback={<div>Loading...</div>}>
            <Quiz {...props} />
          </Suspense>
          } />
          <Route exact path="/yt/:ytlink" render={(props) => <Suspense fallback={<div>Loading...</div>}>
            <Youtube {...props} />
          </Suspense>
          } />

          <Route exact path="/quiz/levels/:catId" render={(props) => <Suspense fallback={<div>Loading...</div>}>
            <QuizLevels {...props} />
          </Suspense>
          } />
          <Route exact path="/quiz/level/:catId/:quizId" render={(props) => <Suspense fallback={<div>Loading...</div>}>
            <QuizPlay {...props} />
          </Suspense>
          } />
        </Switch>
      </div>
      {pat[1] !== "yt" && <Footer />}


    </>
  )
}

export default MainView
