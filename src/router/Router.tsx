import React, { lazy, Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router'
import { history } from '../redux/store/store'
import Loader from '../components/Loader/Loader'


import App from '../components/App/App'
import TopItemsPage from './pages/TopItemsPage'
// import GenreItemsPage from './pages/GenreItemsPage'
// import SearchResultsPage from './pages/SearchResultsPage'
// import GenreItemsPageSeries from './pages/GenreItemsPageSeries'
// import TitlePage from './pages/TitlePage'
// import FavoritesPage from './pages/FavoritesPage'
// import ApiCallError from '../components/Error/ApiCallError'
// import ErrorFof from '../components/Error/ErrorFof'

const GenreItemsPage = lazy(() => import('./pages/GenreItemsPage'))
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage'))
const GenreItemsPageSeries = lazy(() => import('./pages/GenreItemsPageSeries'))
const TitlePage = lazy(() => import('./pages/TitlePage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))
const ApiCallError = lazy(() => import('../components/Error/ApiCallError'))
const ErrorFof = lazy(() => import('../components/Error/ErrorFof'))



const Router = () => {

  return (
    <ConnectedRouter history={history}>
      <>
        <App />
        <Switch>
          <Route exact path="/" component={TopItemsPage} />
          <Route path="/genres/films/:id" component={lazyComponent(GenreItemsPage)} />
          <Route path="/genres/series/:id" component={lazyComponent(GenreItemsPageSeries)} />
          <Route path="/results" component={lazyComponent(SearchResultsPage)} />
          <Route path="/title/:title" component={lazyComponent(TitlePage)} />
          <Route path="/favorites" component={lazyComponent(FavoritesPage)} />
          <Route path="/error" component={lazyComponent(ApiCallError)} />
          <Route component={lazyComponent(ErrorFof)} />
        </Switch>
      </>
    </ConnectedRouter >
  )
}

// Lazy HOC
function lazyComponent(Component: any) {
  return (props: any) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
}

export default Router
