import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { store } from './redux/store/store'
import Router from './router/Router'
import "scroll-behavior-polyfill";


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
    <Router />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();








