import React, { useEffect } from 'react'
import TopItems from '../../components/TopItems/TopItems'
import { connect } from 'react-redux'
import { getUserInputMoviesRequest, getUserInputSeriesRequest } from '../../redux/actions/apiActions'
import { SearchItemsActive } from '../../redux/actions/uiActions'
import * as INT from '../../helpers/interfaces'
import ItemHighlight from '../../components/ItemHighLight/ItemHighlight'

const SearchResultsPage: React.FC<INT.ITopSearchResultsPage> = ({
  isMovieCatSelected,
  searchMovies,
  searchSeries,
  getUserInputMoviesRequest,
  getUserInputSeriesRequest,
  SearchItemsActive
}) => {

  useEffect(() => {
    SearchItemsActive(true)
    return () => {
      SearchItemsActive(false)
    }
  })

  return (
    <div>
      <ItemHighlight />
      <TopItems
        isMovieCatSelected={isMovieCatSelected}
        movies={searchMovies.slice(1)}
        series={searchSeries.slice(1)}
        getMovies={getUserInputMoviesRequest}
        getSeries={getUserInputSeriesRequest}
      />
    </div >
  )
}

const mapStateToProps = (state: any) => {
  return {
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    searchMovies: state.moviesReducer.searchMovies,
    searchSeries: state.seriesReducer.searchSeries,
  }
}

export default connect(mapStateToProps, {
  getUserInputMoviesRequest,
  getUserInputSeriesRequest,
  SearchItemsActive
})(SearchResultsPage)

