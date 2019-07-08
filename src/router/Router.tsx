import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router'
import { history } from '../redux/store/store'
import App from '../components/App/App'
import TopItemsPage from './pages/TopItemsPage'
import GenreItemsPage from './pages/GenreItemsPage'
import SearchResultsPage from './pages/SearchResultsPage'
import GenreItemsPageSeries from './pages/GenreItemsPageSeries'
import TitlePage from './pages/TitlePage'


const Router = () => {
  return (
    <ConnectedRouter history={history}>
      <>
        <App />
        <Route exact path="/" component={TopItemsPage} />
        <Route exact path="/genres/films/:id" component={GenreItemsPage} />
        <Route exact path="/genres/series/:id" component={GenreItemsPageSeries} />
        <Route exact path="/results" component={SearchResultsPage} />
        <Route exact path="/title/:title" component={TitlePage} />
      </>
    </ConnectedRouter>
  )
}

export default Router
