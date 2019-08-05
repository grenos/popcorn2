import React, { useEffect } from 'react'
import TopItems from '../../components/TopItems/TopItems'
import { connect } from 'react-redux'
import { getToggleMoviesRequest, getToggleSeriesRequest } from '../../redux/actions/apiActions'
import { TopItemsActive } from '../../redux/actions/uiActions'
import VisoreSlider from '../../components/VisoreSlider/VisoreSlider'
import * as INT from '../../helpers/interfaces'

const TopItemsPage: React.FC<INT.ITopResultsPage> = ({
  isMovieCatSelected,
  topMovies,
  topSeries,
  getToggleMoviesRequest,
  getToggleSeriesRequest,
  TopItemsActive
}) => {

  useEffect(() => {
    TopItemsActive(true)
    return () => {
      TopItemsActive(false)
    }
  })

  return (
    <div>
      <VisoreSlider />
      <TopItems
        isMovieCatSelected={isMovieCatSelected}
        movies={topMovies.slice(7)}
        series={topSeries.slice(7)}
        getMovies={getToggleMoviesRequest}
        getSeries={getToggleSeriesRequest}
      />

    </div >
  )
}


const mapStateToProps = (state: any) => {
  return {
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    topMovies: state.moviesReducer.topMovies,
    topSeries: state.seriesReducer.topSeries,
  }
}

export default connect(mapStateToProps, {
  getToggleMoviesRequest,
  getToggleSeriesRequest,
  TopItemsActive
})(TopItemsPage)

