import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


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
