import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Graphs from "../../Views/Polls/Graphs";
import Poll1 from "../../Views/Poll/Poll/Poll1";
import Petition from "../../Views/Petitions/Petition";  
import Petition1 from "../../Views/Petitions/Petition1";
import Petition2 from "../../Views/Petitions/Petition2";
import Petition3 from "../../Views/Petitions/Petition3";
import PetitionPreview from "../../Views/Petitions/PetitionPreview";
import LiveTv from "../../Views/TV/LiveTv";
import News from "../../Views/News/News";
import SingleNews from "../../Views/News/SingleNews";

import PrivateRoute from "../../PrivateRoute";

import Layout from "../Layout/Layout";
import IndividualPetition from "../../Views/Petitions/IndividualPetition";
import Awards from "../../Views/Awards/Awards";
import AwardCategories from "../../Views/Awards/AwardCategories";
import SubCategories from "../../Views/Awards/SubCategories";
import FinalAwards from "../../Views/Awards/FinalAwards";



// Views
const Home = React.lazy(() => import("../../Views/Home/Home"));
const Polls = React.lazy(() => import("../../Views/Polls/Polls"));
const Petitions = React.lazy(() => import("../../Views/Petitions/Petitions"));
const MainView = () => {
  return (
    <Layout>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/polls" component={Polls} />
          <Route exact path="/petitions" component={Petitions} />
          <PrivateRoute exact path="/petition" component={Petition} />
          <PrivateRoute exact path="/petition1" component={Petition1} />
          <PrivateRoute exact path="/petition2" component={Petition2} />
          <PrivateRoute exact path="/petition3" component={Petition3} />
          <PrivateRoute exact path="/petition-preview" component={PetitionPreview} />
          <Route exact path="/poll/:slug/:pollId" component={Poll1} />
          <Route exact path="/poll/results/:slug/:pollId" component={Graphs} />
          <Route exact path="/awards" component={Awards} />
          <Route exact path="/awards/categories/:slug/:showId" component={AwardCategories} />
          <Route exact path="/awards/categories/subcat/:showId/:categoryId" component={SubCategories} />
          <Route exact path="/awards/categories/subcat/:showId/:categoryId" component={SubCategories}/>
          <Route exact path="/awards/categories/subcat/award/:showId/:categoryId/:id" component={FinalAwards} />
          <Route exact path="/livetv" component={LiveTv} />
          <Route exact path="/news" component={News} />
          <Route exact path="/news/:slug/:newsId" component={SingleNews} />
          
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default MainView;
