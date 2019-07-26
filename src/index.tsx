import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store/store'
import Router from './router/Router'
import "scroll-behavior-polyfill";
import { PersistGate } from 'redux-persist/lib/integration/react'

// import Amplify, { Storage } from 'aws-amplify';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
// import awsconfig from './aws-exports';
// Amplify.configure(awsconfig);
Amplify.configure(aws_exports);


//! FOR USER AVATAR
//! NOT IN USE YET
// Storage.put('test.txt', 'Hello')
//   .then(result => console.log(result))
//   .catch(err => console.log(err));

// setTimeout(() => {
//   Storage.get('test.txt')
//     .then(result => console.log(result))
//     .catch(err => console.log(err));
// }, 3000);


// clear SessionStorage on refresh for pagination
if (performance.navigation.type === 1) {
  sessionStorage.clear()
}
const refreshPage = performance.getEntriesByType("navigation")
refreshPage.forEach(item => {
  // @ts-ignore
  if (item.type === 'reload') {
    sessionStorage.clear()
  }
})



ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={'loading'} persistor={persistor}>
      <Router />
    </PersistGate>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();








