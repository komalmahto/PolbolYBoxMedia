import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";

// Components
import Navbar from "./components/Navbar/Navbar";
import MainView from "./components/MainView/MainView";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <MainView />
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
