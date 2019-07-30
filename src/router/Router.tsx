import React from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router'
import { history } from '../redux/store/store'
import App from '../components/App/App'
import TopItemsPage from './pages/TopItemsPage'
import GenreItemsPage from './pages/GenreItemsPage'
import SearchResultsPage from './pages/SearchResultsPage'
import GenreItemsPageSeries from './pages/GenreItemsPageSeries'
import TitlePage from './pages/TitlePage'
import FavoritesPage from './pages/FavoritesPage'
import ApiCallError from '../components/Error/ApiCallError'
import ErrorFof from '../components/Error/ErrorFof'


const Router = () => {

  return (
    <ConnectedRouter history={history}>
      <>
        <App />
        <Switch>
          <Route exact path="/" component={TopItemsPage} />
          <Route path="/genres/films/:id" component={GenreItemsPage} />
          <Route path="/genres/series/:id" component={GenreItemsPageSeries} />
          <Route path="/results" component={SearchResultsPage} />
          <Route path="/title/:title" component={TitlePage} />
          <Route path="/favorites" component={FavoritesPage} />
          <Route path="/error" component={ApiCallError} />
          <Route component={ErrorFof} />
        </Switch>
      </>
    </ConnectedRouter >
  )
}

export default Router
