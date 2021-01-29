import './App.css';
import Layout from './Components/Layout/Layout'
import store from './Store';
import { Provider } from 'react-redux';


function App() {
  return (
    <>
    <Provider store={store}>
    <Layout/>
    </Provider>
</>
  );
}

export default App;
