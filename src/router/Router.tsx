import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from '../components/App/App'
import TopItemsPage from './pages/TopItemsPage'
import GenreItemsPage from './pages/GenreItemsPage'
import SearchResultsPage from './pages/SearchResultsPage'
import TitlePage from './pages/TitlePage'


const Router = () => {

  return (
    <BrowserRouter>
      <>
        <App />
        <Route exact path="/" component={TopItemsPage} />
        <Route path="/genres/:id" component={GenreItemsPage} />
        <Route path="/results" component={SearchResultsPage} />
        <Route path="/title" component={TitlePage} />
      </>
    </BrowserRouter>
  )
}

export default Router
