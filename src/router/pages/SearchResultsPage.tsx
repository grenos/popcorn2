import React from 'react'
import TopItems from '../../components/TopItems/TopItems'
import { connect } from 'react-redux'
import { getUserInputMoviesRequest, getUserInputSeriesRequest } from '../../redux/actions/apiActions'
import * as INT from '../../helpers/interfaces'

const SearchResultsPage: React.FC<INT.ITopSearchResultsPage> = ({
  isMovieCatSelected,
  searchMovies,
  searchSeries,
  getUserInputMoviesRequest,
  getUserInputSeriesRequest,
  userHasTyped }) => {

  return (
    <div>
      <TopItems
        isMovieCatSelected={isMovieCatSelected}
        movies={searchMovies}
        series={searchSeries}
        getMovies={getUserInputMoviesRequest}
        getSeries={getUserInputSeriesRequest}
        userHasTyped={userHasTyped}
      />
    </div >
  )
}

const mapStateToProps = (state: any) => {
  return {
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    searchMovies: state.moviesReducer.searchMovies,
    searchSeries: state.seriesReducer.searchSeries,
    userHasTyped: state.uiReducer.userHasTyped
  }
}

export default connect(mapStateToProps, {
  getUserInputMoviesRequest,
  getUserInputSeriesRequest
})(SearchResultsPage)

