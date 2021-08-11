import React from "react";
import "./App.css";
import LandingPage from "./views/LandingPage";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rowReducer from './reducers/rowStore';

const store = createStore(
  // instance of store
  rowReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
);

const App = () => {
  return (

    <Provider store={store}>
      <LandingPage />
    </Provider>
  );
};

export default App;
