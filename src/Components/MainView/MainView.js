import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Poll1 from "../../Views/Poll/Poll/Poll1";
import Petition from "../../Views/Petitions/Petition";
import Petition1 from "../../Views/Petitions/Petition1";
import Petition2 from "../../Views/Petitions/Petition2";
import Petition3 from "../../Views/Petitions/Petition3";
import Layout from "../Layout/Layout";

// Views
const Home = React.lazy(() => import("../../Views/Home/Home"));
const Polls = React.lazy(() => import("../../Views/Polls/Polls"));

const MainView = () => {
  return (
    <Layout>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/polls" component={Polls} />
          <Route exact path="/petitions" component={Petition} />
          <Route exact path="/petition1" component={Petition1} />
          <Route exact path="/petition2" component={Petition2} />
          <Route exact path="/petition3" component={Petition3} />
          <Route exact path="/poll/:slug/:pollId" component={Poll1} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default MainView;
