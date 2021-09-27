import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";

// Components
import Navbar from "./Components/Navbar/Navbar";
import MainView from "./Components/MainView/MainView";
import Footer from "./Components/Footer/Footer";

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
