import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from '../components/App/App'
import TopItemsPage from './pages/TopItemsPage'
import GenreItemsPage from './pages/GenreItemsPage'
import SearchResultsPage from './pages/SearchResultsPage'


const Router = () => {
  return (
    <BrowserRouter>
      <>
        <App />
        <Route exact path="/" component={TopItemsPage} />
        <Route path="/genres" component={GenreItemsPage} />
        <Route path="/results" component={SearchResultsPage} />
      </>
    </BrowserRouter>
  )
}

export default Router
