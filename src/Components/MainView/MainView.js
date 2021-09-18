import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Poll from "../../Views/Poll/Poll/Poll";
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
          <Route exact path="/poll/:slug/:pollId" component={Poll} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default MainView;
