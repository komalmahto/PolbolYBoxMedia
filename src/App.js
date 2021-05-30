import './App.css';
import Layout from './Components/Layout/Layout'
import {store,persistor} from './Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'


function App() {
  return (
    <>
 <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>   
   <Layout/>
  </PersistGate>

</Provider>
</>
  );
}

export default App;
